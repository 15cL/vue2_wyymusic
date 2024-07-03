<template>
  <div class="nav_box" :class="colorY ? 'active' : ''">
    <van-tabs @click="onClickTab" title-active-color="red" :line-width="wd" :scrollspy= 'isScrollspy'>
      <van-tab :title="nav" v-for="(nav, index) in navs" :key="index"
        ><slot :index="index" :isDestory="selectIndex == index" :name="isScrollspy?`slot-${index}`:'home'"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'NavBox',
  props: {
    navs: {
      type: Array,
      default: () => ['推荐音乐', '热歌榜', '搜索']
    },
    colorY: {
      type: Boolean,
      default: false
    },
    isScrollspy: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      wd: 77,
      selectIndex: ''
    }
  },

  methods: {
    onClickTab (el) {
      this.selectIndex = el
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_box {
  ::v-deep .van-tab__text {
    font-size: 15px;
  }
}
.active {
  ::v-deep .van-tab__text {
    color: hsla(0, 0%, 100%, 0.5);
    font-size: 17px;
  }
  ::v-deep .van-tabs__nav {
    background-color: opacify(rgba(0, 0, 0, 0), $amount: 0);
  }
}
</style>
