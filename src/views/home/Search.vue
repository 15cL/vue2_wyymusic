<template>
  <div class="SearchPage">
    <van-search
      v-model.trim="key"
      shape="round"
      placeholder="搜索歌曲、歌手、专辑"
      @search="search(key)"
      @cancel="cancel"
      @input="change(key)"
      @focus="finish = false"
      v-focus
    />
    <div class="default" v-if="!key">
      <div class="hots">
        <div class="title">热门搜索</div>
        <ul>
          <li
            v-for="(hot, index) in hots"
            :key="index"
            @click="search(hot.first)"
          >
            {{ hot.first }}
          </li>
        </ul>
      </div>
      <div class="history_search">
        <ul>
          <li v-for="(key, index) in searchHistory" :key="index">
            <div class="left" @click="search(key)">
              <span class="iconfont icon-shijian"></span> {{ key }}
            </div>
            <span @click="removeHistory(index)">X</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="recom" v-else-if="key && !finish">
      <div class="title">搜索"{{ key }}"</div>
      <ul>
        <li
          v-for="(suggest, index) in suggests"
          :key="index"
          @click="search(suggest.keyword)"
        >
          <span class="iconfont icon-sousuo"></span>
          {{ suggest.keyword }}
        </li>
      </ul>
    </div>
    <div class="finish" v-else>
      <div class="title">最佳匹配</div>
      <div class="multi">
        <div class="at" v-if="multimatch.artist">
          <img :src="multimatch.artist[0].picUrl" alt="" />
          <span class="msg"
            >{{ multimatch.artist[0].occupation }}:
            {{ multimatch.artist[0].name }}</span
          >
          <span>></span>
        </div>
        <div class="at" v-if="multimatch.playlist">
          <img :src="multimatch.playlist[0].coverImgUrl" alt="" />
          <div class="msg list">
            <div
              style="
                text-wrap: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              歌单: {{ multimatch.playlist[0].name }}
            </div>
            <div style="font-size: 11px; color: #aaabb0">
              by: {{ multimatch.playlist[0].creator.nickname }}
            </div>
          </div>
          <span>></span>
        </div>
      </div>
      <div class="list">
        <SongList :Idkey="key" :must="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import SongList from '../../components/SongList/SongList.vue'
export default {
  props: ['ok'],
  components: {
    SongList
  },
  data () {
    return {
      key: '',
      hots: [],
      finish: false,
      suggests: [],
      multimatch: {},
      songlist: []
    }
  },

  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector('input').focus()
      }
    }
  },
  async created () {
    const res = await this.getHotSearch()
    this.hots = res.data.result.hots
  },
  computed: {
    ...mapState(['searchHistory'])
  },
  methods: {
    ...mapActions('search', [
      'getHotSearch',
      'getSearchSuggest',
      'getSearchMultimatch',
      'getSearchList'
    ]),
    ...mapMutations(['addHistory', 'removeHistory']),

    // 搜索关键词
    async search (key) {
      this.multimatch = ''
      this.key = key
      this.finish = true
      const res = await this.getSearchMultimatch(key)
      // this.songlist = await this.getList(key, 0)
      this.multimatch = res.data.result
      // 添加到历史记录
      this.addHistory(key)
    },
    async getList (key, offset) {
      const list = await this.getSearchList({ key, offset })
      return list.data.result.songs
    },

    async change (key) {
      this.finish = false
      if (!key) {
        return
      }
      const res = await this.getSearchSuggest(key)
      this.suggests = res.data.result?.allMatch
    },

    // 取消搜索
    cancel () {
      this.key = ''
      this.finish = false
    }
  }
}
</script>

<style lang="scss" scoped>
.SearchPage {
  .default {
    .hots {
      font-size: 13px;
      padding: 10px;
      .title {
        color: #6c6c6f;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          padding: 7px 15px;
          margin: 8px 8px 0 0;
          border-radius: 15px;
          border: 1px solid #d3d4da;
        }
      }
    }
    .history_search {
      margin-top: 10px;
      font-size: 13px;
      ul {
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 15px 10px 10px;
          border-bottom: 1px solid #f5f5f5;
          .left {
            display: flex;
            width: 95%;
            span {
              display: block;
              transform: scale(0.9);
              margin-right: 8px;
              color: #d3d4da;
            }
          }
          span {
            transform: scale(1.4, 1.3);
            color: #68686a;
          }
        }
      }
    }
  }
  .recom {
    padding: 17px 10px 10px;
    font-size: 14px;
    .title {
      color: rgba(0, 68, 255, 0.666);
    }
    ul {
      margin-top: 15px;
      li {
        padding: 12px 0;
        span {
          color: #d3d4da;
        }
      }
    }
  }
  .finish {
    padding: 10px;
    .title {
      font-size: 12px;
      color: #68686a;
    }
    .multi {
      .at {
        display: flex;
        padding: 10px 0;
        img {
          width: 50px;
          height: 50px;
        }
        .msg {
          width: 80%;
        }
        .list {
          padding: 0 13px;
          font-size: 18px;
        }
        span {
          padding: 13px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
