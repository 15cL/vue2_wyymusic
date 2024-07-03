<template>
  <div class="recommend">
    <div class="editorRec">
      <img src="../../assets/img/开通黑胶.png" style="width: 100vw" @click="toVip" />
      <div class="title">编辑推荐</div>
      <ul class="content">
        <li v-for="list in playlists" :key="list.id" @click="toList(list.id)">
          <img :src="list.coverImgUrl" />
          <div class="listTltle">{{ list.name }}</div>
        </li>
      </ul>
    </div>
    <div class="newSong">
      <div class="title">最新音乐</div>
      <ul class="content">
        <li v-for="song in songs" :key="song.id" @click="toPlay(song.id,song.album.picUrl,song.name,artistsFilter(song.artists))">
          <div class="left">
            <h3 class="name">{{ song.name }}</h3>
            <div class="art">
              <span class="iconfont icon-sq" style="color: orange"></span>
              {{ artistsFilter(song.artists) }} - {{ song.album.name }}
            </div>
          </div>
          <div class="right">
            <span class="iconfont icon-bofang"></span>
          </div>
        </li>
      </ul>
    </div>
    <footer @click="downloadApp">
      <div class="logo">
        <h1>
          <span class="iconfont icon-wangyiyunyinle"></span>
          网易云音乐
        </h1>
      </div>
      <div class="btn">
        <span>打开APP, 发现更多好音乐 > </span>
      </div>
      <div class="copyright">
        15出品, 必出精品©2024-06-22深圳龙岗坂田某地打工仔运营
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { artistsFilter } from '../../utills/comm'
export default {
  data () {
    return {
      playlists: [],
      songs: []
    }
  },
  async created () {
    const { data } = await this.getSongList()
    this.playlists = data.playlists
    const songs = await this.getNewSong()
    this.songs = songs.data.data.splice(0, 10)
  },
  methods: {
    ...mapMutations(['setCurrentPlayPic']),
    ...mapActions('recommed', ['getSongList', 'getNewSong']),
    artistsFilter (singers) {
      return artistsFilter(singers)
    },
    downloadApp () {
      location.assign('https://m.music.163.com/m/applink/?scheme=orpheus%3A%2F%2Fopenurl')
    },
    toVip () {
      window.open('https://music.163.com/#/member')
    },
    toList (id) {
      this.$router.push({ path: '/playlist', query: { id } })
    },
    toPlay (id, url, name, ar) {
      this.$router.push({ path: '/player', query: { id } })
      this.setCurrentPlayPic({ url, name, ar })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  .title {
    margin: 20px 0;
    padding: 0 10px;
    border-left: 5px solid red;
    font-size: 20px;
    font-weight: 550;
  }
  .editorRec {
    .content {
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 1;
        margin-bottom: 21px;
        text-align: center;
        img {
          width: 140px;
        }
        .listTltle {
          padding: 0 5px;
          text-align: left;
          font-size: 14px;
        }
      }
    }
  }
  .newSong {
    .content {
      padding: 0 15px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 0;
        border-bottom: 1px solid rgb(212, 212, 212);

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
  footer {
    width: 100vw;
    height: 208.08px;
    padding-top: 50px;
    background-image: url("https://s3.music.126.net/mobile-new/img/recommand_bg_3x.png?f3a9aaa781c3bf3b543d129327d35fce=");
    background-size: cover;
    .logo {
      h1 {
        text-align: center;
        letter-spacing: 6px;
        span {
          display: inline-block;
          position: relative;
          top: -4px;
          transform: scale(2.8);
          color: red;
        }
      }
    }
    .btn {
      padding: 20px 40px 6px;
      color: red;
      span {
        display: block;
        padding: 13px;
        border: 1px solid red;
        border-radius: 100px;
        text-align: center;
      }
    }
    .copyright{
      text-align: center;
      font-size: 10px;
      color: rgb(142, 139, 139);
    }
  }
}
</style>
