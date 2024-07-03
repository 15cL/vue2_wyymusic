<template>
  <div class="hotRank">
    <header>
      <div class="box">
        <div class="icon"></div>
        <div class="date" v-if="updateTime">更新日期: {{ updateTime }}</div>
      </div>
    </header>
    <main>
      <SongList :songS="songs" :color="true" ></SongList>
    </main>
    <footer @click="toDwld">
      查看完整榜单 >
    </footer>
  </div>
</template>

<script>
import SongList from '../../components/SongList/SongList.vue'
import { mapActions } from 'vuex'
import { getDate, artistsFilter } from '../../utills/comm'
export default {
  components: {
    SongList
  },
  async created () {
    // 获取歌曲热榜
    const res = await this.getHotRank()
    const { tracks, updateTime } = res.data.playlist
    this.songs = tracks.splice(0, 20)
    // 更新日期转换
    this.updateTime = getDate(updateTime)
  },
  data () {
    return {
      songs: [],
      updateTime: ''
    }
  },
  methods: {
    ...mapActions('hot', ['getHotRank']),
    artistsFilter (rt) {
      return artistsFilter(rt)
    },
    toDwld () {
      location.assign('https://m.music.163.com/m/applink/?scheme=orpheus%3A%2F%2Fopenurl')
    }
  }
}
</script>

<style lang="scss" scoped>
.hotRank {
  header {
    position: relative;
    height: 167.43px;

    .box {
      position: absolute;
      width: 100vw;
      height: 100%;
      padding: 30px;
      background-color: rgba($color: #000000, $alpha: 0.2);
      z-index: 99999;
      .icon {
        width: 60vw;
        height: 67px;
        background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
        background-size: 166px 97px;
        background-repeat: no-repeat;
        background-position: -22px -29.5px;
      }
      .date {
        margin-top: 10px;
        font-size: 12px;
        color: white;
      }
    }
    &::before {
      position: absolute;
      content: "";
      display: block;
      width: 100vw;
      height: 100%;
      background-image: url("https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=");
      background-size: cover;
      z-index: -1;
    }
  }
  main {
  }
  footer{
    padding: 20px 0;
    text-align: center;
    color: rgb(142, 139, 139);
  }
}
</style>
