<template>
  <div id="app">
    <header>
      <div class="title">
        <div class="yuan">
          <span class="iconfont icon-wangyiyunyinleclick logoClr"></span>
        </div>
        <div class="font">{{ title }}</div>
      </div>
      <div class="btn">
        <span class="dwd_btn">下载APP</span>
      </div>
    </header>
    <NavBox >
      <template v-slot:home="slotprops">
        <ScrollView>
          <component :is="cps[slotprops.index]" v-if="slotprops.isDestory"   ></component>
      </ScrollView>
      </template>
    </NavBox>
  </div>
</template>

<script>
import NavBox from '../components/NavBox/NavBox.vue'
import ScrollView from '../components/ScrollView/ScrollView.vue'
import Search from '../views/home/Search.vue'
import HotRank from '../views/home/HotRank.vue'
import Recomend from '../views/home/Recomend.vue'
export default {
  components: { NavBox, ScrollView, Search, HotRank, Recomend },
  data () {
    return {
      title: '网易云音乐',
      cps: ['Recomend', 'HotRank', 'Search']
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  height: 100vh;
  overflow: hidden;
  header {
    display: flex;
    justify-content: space-between;
    color: red;
    font-size: 24px;
    background-color: red;
    padding: 20px 10px;
    .title {
      display: flex;
      align-items: center;
      .yuan {
        position: relative;
        height: 24px;
        width: 24px;
        margin-right: 5px;
        text-align: center;
        border-radius: 100%;
        background-color: white;
        .logoClr {
          position: absolute;
          left: 4px;
          top: 4px;
        }
      }
      .font {
        letter-spacing: 2px;
        color: white;
      }
    }
    .btn {
      padding: 8px 15px;
      border-radius: 50px;
      font-size: 20px;
      background-color: white;
    }
  }
}
</style>
