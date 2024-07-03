<template>
  <div class="player">
    <header>
      <div class="pic">
        <div class="bigC">
          <span class="iconfont icon-wangyiyunyinleclick"></span>
        </div>
      </div>
      <div class="text">
        <div class="to">网易云音乐</div>
        <div class="tw">去云音乐，看更多走心评论</div>
      </div>
      <div class="btn"><span>立即体验</span></div>
    </header>
    <div class="scroll" :style="bgColor">
      <div class="play_box">
        <div class="outer_box">
          <div class="border_box" :class="play ? 'animation1' : 'animation2'">
            <div class="pic_box">
              <img :src="currentPlayMsg.url" />
            </div>
          </div>
          <div class="lyric_control">
            <div class="lyric">
              <ul ref="lyc_srol">
                <li
                  v-for="lyric in lyrics"
                  :key="lyric.uid"
                  :style="{ color: selectIndex == lyric.uid ? 'white' : '' }"
                >
                  {{ lyric.lyc }}
                </li>
              </ul>
            </div>
            <div class="control">
              <div class="like">
                <span class="iconfont icon-aixin" @click="downloadApp"></span>
              </div>
              <div class="changeOp">
                <span
                  v-if="!play"
                  class="iconfont icon-bofang1"
                  @click="play = !play"
                ></span>
                <span
                  v-else
                  class="iconfont icon-zanting"
                  @click="play = !play"
                ></span>
              </div>
              <div class="commit">
                <span class="iconfont icon-pinglun" @click="downloadApp"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="openWithDold">
        <div class="dold" @click="downloadApp">下载</div>
        <div class="open" @click="downloadApp">打开</div>
      </div>
      <NavBox
        :navs="['评论', '相似歌曲', '相似歌单']"
        :colorY="true"
        :isScrollspy="true"
      >
        <template #slot-0="slotprops">
          <div class="comment" v-if="comments.length">
            <div class="title">精彩评论</div>
            <component
              :is="taps[slotprops.index]"
              :comments="comments"
              :colorY="true"
            ></component>
            <div class="moreComment" style="padding: 0 35vw">
              <span
                style="
                  display: block;
                  padding: 5px 8px;
                  color: #ffffffcc;
                  font-size: 12px;
                  text-align: center;
                  background-color: hsla(0, 0%, 100%, 0.06);
                  border: 1px solid hsla(0, 0%, 100%, 0.06);
                  border-radius: 20px;
                "
                >更多精彩评论</span
              >
            </div>
          </div>
        </template>
        <template #slot-1>
          <div class="title">和这首歌相似的歌曲</div>
          <div class="scroll_view">
            <ul>
              <li
                v-for="(song, index) in simiSongs"
                :key="index"
                @click="
                  toPlay(
                    song.id,
                    song.album?.picUrl,
                    song.name,
                    artistsFilter(song.artists)
                  )
                "
              >
                <div class="pic">
                  <img :src="song.album.picUrl" />
                </div>
                <div class="left">
                  <div class="name">
                    {{ song.name }}
                  </div>
                  <div class="art">
                    <span class="iconfont icon-sq" style="color: orange"></span>
                    {{ artistsFilter(song.artists) }} - {{ song.album.name }}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <template #slot-2>
          <div class="title">相似歌单</div>
          <ul class="content" :style="simiList.length>1?'justify-content: space-around;':''">
            <li
              v-for="list in simiList"
              :key="list.id"
              @click="toList(list.id)"
            >
              <img :src="list.coverImgUrl" />
              <div class="listTltle">{{ list.name }}</div>
            </li>
          </ul>
        </template>
      </NavBox>
    </div>
    <audio
      v-if="songUrl"
      :src="songUrl"
      ref="player"
      @timeupdate="getTime"
      @ended="ended"
    ></audio>
  </div>
</template>

<script>
import NavBox from '../../components/NavBox/NavBox.vue'
import CommentList from '../../components/CommentList/CommentList.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import { resolveLyric, artistsFilter } from '../../utills/comm.js'

export default {
  components: {
    NavBox,
    CommentList
  },
  data () {
    return {
      colorNum: '',
      songUrl: '',
      lyrics: '',
      play: false,
      selectIndex: 2,
      top: 0,
      comments: [],
      taps: ['CommentList', 'SimiSong', 'SimiList'],
      simiSongs: [],
      simiList: []
    }
  },

  watch: {
    play (n, o) {
      if (n) {
        this.$refs.player.play()
      } else {
        this.$refs.player.pause()
      }
    }
  },
  async created () {
    // 获取url信息
    const res = await this.geturlMsg(this.$route.query.id)
    this.colorNum = String(res.size).slice(0, 6)
    this.songUrl = res.url

    // 获取歌词
    this.lyrics = await this.getLyrics(this.$route.query.id)

    // 获取精彩评论
    const data = await this.getSongComments(this.$route.query.id)
    this.comments = data.data.hotComments

    // 获取相似歌曲
    const resl = await this.getSongSimi(this.$route.query.id)
    this.simiSongs = resl.data.songs

    // 获取相似歌单
    const simiList = await this.getListSimi(this.$route.query.id)
    this.simiList = simiList.data.playlists
    console.log(this.simiList)
  },
  computed: {
    ...mapState(['currentPlayMsg']),
    bgColor () {
      return ` background: linear-gradient(#${this.colorNum}, rgb(46, 6, 5))`
    }
  },
  methods: {
    ...mapMutations(['setCurrentPlayPic']),
    ...mapActions('player', [
      'getSongUrl',
      'getSongLyric',
      'getSongComments',
      'getSongSimi',
      'getListSimi'
    ]),

    artistsFilter (v) {
      return artistsFilter(v)
    },
    // 获取歌词
    async getLyrics (id) {
      const res = await this.getSongLyric(id)
      const lyc = res.data.lrc.lyric
      let lyrics = resolveLyric(lyc)
      if (lyrics instanceof Array === false) {
        lyrics = [{ lyc: '当前音乐无歌词显示', uid: 2, time: '' }]
      }
      lyrics.unshift({ lyc: this.currentPlayMsg.ar, uid: 1, time: '' })
      lyrics.unshift({ lyc: this.currentPlayMsg.name, uid: 0, time: '' })
      return lyrics
    },

    // 获取url信息
    async geturlMsg (id) {
      const urlMsg = await this.getSongUrl(id)
      return urlMsg.data.data[0]
    },

    // 凸显歌词
    getTime (e) {
      const currentTime = e.srcElement.currentTime
      const feet =
        this.$refs.lyc_srol.getElementsByTagName('li')[this.selectIndex - 1]
          .clientHeight
      if (currentTime > this.lyrics[this.selectIndex + 1].time) {
        this.$nextTick(() => {
          this.selectIndex += 1
          this.top -= feet
          this.$refs.lyc_srol.style.transform = `translateY(${this.top}px)`
        })
      }
    },

    // 播放结束
    ended (e) {
      if (e.srcElement.ended) {
        this.selectIndex = 2
        this.top = 0
        this.$refs.lyc_srol.style.transform = 'translateY(0px)'
        this.play = false
      }
    },

    // 播放
    toPlay (id, url, name, ar) {
      this.$router.push({ path: '/player', query: { id } })
      this.setCurrentPlayPic({ url, name, ar })
    },
    // 去歌单
    toList (id) {
      this.$router.push({ path: '/playlist', query: { id } })
    },
    // 下载APP
    downloadApp () {
      location.assign('https://m.music.163.com/m/applink/?scheme=orpheus%3A%2F%2Fopenurl')
    }
  }
}
</script>
<style lang="scss" scoped>
.player {
  height: 100vh;
  header {
    display: flex;
    padding: 10px;
    .pic {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .bigC {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 32px;
        background-color: red;
        span {
          display: inline-block;
          color: white;
          transform: scale(1.3);
        }
      }
    }
    .text {
      flex: 5;
      .to {
        font-size: 13px;
      }
      .tw {
        font-size: 11px;
      }
    }
    .btn {
      flex: 2;
      span {
        margin-left: 10px;
        display: inline-block;
        padding: 5px 10px;
        border-radius: 20px;
        color: white;
        background-color: red;
      }
    }
  }
  .scroll {
    height: calc(100vh - 52.8px);
    filter: grayscale(51%);
    overflow: scroll;
    .play_box {
      padding-top: 8vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .border_box {
        border-radius: 300px;
        border: 15px solid rgba($color: #f6f6f6, $alpha: 0.1);
        .pic_box {
          position: relative;
          width: 65vw;
          height: 65vw;
          border-radius: 65vw;
          background: url(../../assets/img/黑胶内环.png) no-repeat;
          background-position: 50% 50%;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 45vw;
            border-radius: 45vw;
          }
        }
      }
      .lyric_control {
        margin-top: 20px;

        .lyric {
          height: 14vh;
          overflow: hidden;
          width: 72vw;
          overflow: hidden;
          font-size: 15px;
          ul {
            position: relative;
            top: 0;
            color: hsla(0, 0%, 100%, 0.4);
            li {
              padding-bottom: 5px;
              text-align: center;
              &:first-child {
                font-size: 18px;
                color: white;
              }
              &:nth-child(2) {
                font-size: 14px;
                margin: 6px 0 12px;
              }
            }
          }
        }
        .control {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          padding: 1.25rem;
          color: rgb(203, 203, 203);
          span {
            display: block;
            transform: scale(1.7);
          }
          .changeOp {
            span {
              transform: scale(4);
            }
          }
        }
      }
    }
    .openWithDold {
      display: flex;
      justify-content: space-between;
      padding: 5px 20px;
      div {
        padding: 12px 75px;
        font-size: 16px;
        color: white;
        border-radius: 30px;
        &:first-child {
          border: 1px solid gainsboro;
        }
        &:last-child {
          background-color: red;
        }
      }
    }
  }
}

@keyframes rotateFrame {
  from {
    transform: rotateZ(0);
  }
  50% {
    transform: rotateZ(180deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}

.animation1 {
  animation: rotateFrame 6s linear infinite;
}
.animation2 {
  animation: rotateFrame 6s linear infinite paused;
}
.title {
  color: white;
  font-size: 15px;
  padding: 10px;
}

.scroll_view {
  width: 100vw;
  overflow: scroll;
  scrollbar-width: none;
  color: white;
  ul {
    width: 792px;
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 396px;
      padding: 6px 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .pic {
        margin-right: 10px;
        img {
          width: 58px;
          border-radius: 5px;
        }
      }
      .left {
        width: 70%;

        .art {
          margin-top: 2px;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: rgb(142, 139, 139);
        }
      }
      .right {
        span {
          display: block;
          transform: scale(1.5);
          color: rgb(142, 139, 139);
        }
      }
    }
  }
}

.content {
  display: flex;
  padding: 5px;
  color: white;
  li {
    width: 126px;
    margin-bottom: 21px;
    text-align: center;
    img {
      width: 126px;
      border-radius: 10px;
    }
    .listTltle {
      padding: 0 5px;
      text-align: left;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
