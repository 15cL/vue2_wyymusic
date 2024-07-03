<template>
  <div class="list">
    <ul class="content" v-if="must">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad(Idkey)"
      >
        <li
          v-for="(song, index) in songs"
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
          <div class="left">
            <div class="name" :style="active ? 'color:#507daf' : ''">
              {{ song.name }}
            </div>
            <div class="art">
              <span class="iconfont icon-sq" style="color: orange"></span>
              {{ artistsFilter(song.artists) }} - {{ song.album.name }}
            </div>
          </div>
          <div class="right">
            <span class="iconfont icon-bofang"></span>
          </div>
        </li>
      </van-list>
    </ul>
    <ul class="contentTwo" v-else>
      <li
        v-for="(song, index) in songS"
        :key="song.id"
        :class="color?'active-color':''"
        @click="
          toPlay(song.id, song.al.picUrl, song.name, artistsFilter(song.ar))
        "
      >
        <div class="sort">{{ index + 1 }}</div>
        <div class="left">
          <h3 class="name">{{ song.name }}</h3>
          <div class="art">
            <span class="iconfont icon-sq" style="color: orange"></span>
            {{ artistsFilter(song.ar) }} - {{ song.al.name }}
          </div>
        </div>
        <div class="right">
          <span class="iconfont icon-bofang"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { artistsFilter } from '../../utills/comm'
export default {
  props: {
    Idkey: {
      type: String,
      require: true
    },
    active: {
      type: Boolean,
      default: false
    },
    must: {
      type: Boolean,
      default: false
    },
    songS: {
      type: Array
    },
    color: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      num: 0,
      songs: []
    }
  },
  methods: {
    ...mapMutations(['setCurrentPlayPic']),

    ...mapActions('search', ['getSearchList']),
    artistsFilter (v) {
      return artistsFilter(v)
    },
    // 下拉刷新
    async onLoad (key) {
      const res = await this.getSearchList({ key, offset: this.num })
      this.num += 1
      this.songs.push(...res.data.result.songs)
      this.loading = false
    },
    toPlay (id, url, name, ar) {
      this.$router.push({ path: '/player', query: { id } })
      this.setCurrentPlayPic({ url, name, ar })
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  .content {
    padding: 0 15px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);

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
  .contentTwo {
    padding: 0 15px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.03);

      .sort {
        width: 18px;
        font-size: 18px;
        text-align: center;
        color: rgb(142, 139, 139);
      }
      .left {
        width: 70%;
        .name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
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
        flex: 0.5;
        text-align: center;
        span {
          display: block;
          transform: scale(1.5);
          color: rgb(142, 139, 139);
        }
      }
    }
  }

  .active-color {
    &:first-child .sort {
      color: red;
      font-weight: 600;
    }
    &:nth-child(2) .sort {
      color: rgba(255, 77, 0, 0.768);
      font-weight: 600;
    }
    &:nth-child(3) .sort {
      color: rgba(255, 157, 0, 0.566);
      font-weight: 600;
    }
  }
}
</style>
