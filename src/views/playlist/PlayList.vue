<template>
  <div class="playList">
    <header class="clearfix">
      <div
        class="bg"
        :style="{ backgroundImage: `url(${playlist.coverImgUrl})` }"
      ></div>
      <div class="content">
        <div class="imgL">
          <img :src="playlist.coverImgUrl" alt="" />
          <span>歌单</span>
          <i
            ><b class="iconfont icon-erji2-xianxing"></b
            >{{ fomateCount(playlist.playCount) }}</i
          >
        </div>
        <div class="text">
          <div class="title">{{ playlist.name }}</div>
          <div class="creator">
            <img :src="playlist.creator?.avatarUrl" alt="" />
            {{ playlist.creator?.nickname }}
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="title">歌曲列表</div>
      <SongList :songS="playlist.tracks" :color="false"></SongList>
      <div class="pd" @click="toDl">查看更多歌曲,请下载客户端</div>
    </main>
    <footer>
      <div class="title" v-if="comments.length">精彩评论</div>
      <CommentList :comments="comments"></CommentList>
      <div class="title" v-if="newComments.length">最新评论</div>
      <CommentList :comments="newComments"></CommentList>
      <div class="moreCt">查看全部{{playlist.commentCount}}条评论</div>
    </footer>
    <div class="collect"><span @click="toDl">收藏歌单</span></div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SongList from '../../components/SongList/SongList.vue'
import CommentList from '../../components/CommentList/CommentList.vue'
import { getDate } from '../../utills/comm'
export default {
  components: {
    SongList,
    CommentList
  },
  data () {
    return {
      playlist: {},
      comments: [],
      newComments: []
    }
  },

  created () {
    this.getPlayList(this.$route.query.id)
    this.getPlaylistComments(this.$route.query.id)
  },
  methods: {
    ...mapActions('playlist', ['getPlaylistDetail', 'getPlaylistComment']),
    // 获取歌单详情
    async getPlayList (id) {
      const res = await this.getPlaylistDetail(id)
      this.playlist = res.data.playlist
      this.playlist.tracks.splice(0, 10)
    },

    // 获取歌单评论
    async getPlaylistComments (id) {
      const res = await this.getPlaylistComment(id)
      this.comments = res.data.hotComments
      if (res.data.hotComments.length < 15) {
        this.newComments = res.data.comments.slice(
          0,
          15 - res.data.hotComments.length
        )
      }
    },

    fomateDate (t, n) {
      return getDate(t, n)
    },
    fomateCount (v) {
      if (v < 10000) {
        return v
      }
      return parseInt(v / 10000) + '万'
    },
    toDl () {
      window.location.assign(
        'https://m.music.163.com/m/applink/?scheme=orpheus%3A%2F%2Fplaylist%2F2037020941%3FevokeChain%3Dos_ios.client_unknow.sessionId_7dabcc1e-a7a9-4e0d-8b2d-9c823a3bad83.id_2037020941.page_mMobilePlaylist.start.ac_playlistMoreSong.type_uvl.actionId_playlistMoreSong-0'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.playList {

  header {
    .bg {
      float: left;
      width: 100vw;
      height: 195px;
      background-size: cover;
      background-repeat: no-repeat;
      filter: blur(30px);
      background-position: 50%;
      background-color: black;
    }
    .content {
      position: absolute;
      top: 25px;
      left: 15px;
      display: flex;
      height: 145px;
      margin-right: 15px;
      color: white;
      .imgL {
        position: relative;
        img {
          width: 145px;
        }
        span {
          position: absolute;
          top: 10px;
          display: block;
          padding: 2px 8px;
          font-size: 10px;
          background-color: red;
          border-radius: 0 8px 8px 0;
        }
        i {
          position: absolute;
          top: 1px;
          right: 5px;
          font-size: 12px;
        }
      }
      .text {
        margin-left: 15px;
        .title {
          font-size: 17px;
        }
        .creator {
          margin-top: 23px;
          font-size: 14px;
          img {
            width: 14%;
            border-radius: 100px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  main {
    .title {
      font-size: 12px;
      padding: 3px 10px;
      color: #3d3c3c;
      background-color: #c3cad1;
      background: rgba(0, 0, 0, 0.05);
    }
    .pd {
      margin-top: 10px;
      color: #999;
      text-align: center;
      font-size: 14px;
    }
  }
  footer {
    .title {
      font-size: 12px;
      padding: 3px 10px;
      color: #666;
      background-color: #c3cad1;
      background: rgba(0, 0, 0, 0.05);
    }
    .moreCt{
      padding: 18px;
      border: 1px solid rgba(0, 0, 0, 0.05);
      color: #999;
      font-size: 14px;
      text-align: center;
    }
  }
  .collect {
    position:sticky;
    bottom: 0;
    padding: 10px;
    width: 100%;
    background-color: white;
    text-align: center;
    span {
      display: block;
      padding: 10px 30px;
      margin: 0 35px;
      border-radius: 20px;
      background-color: red;
      color: white;
    }
  }
}
</style>
