<template>
  <div class="ScrollView">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.ScrollView {
  @media only screen  and (max-width: 361px) {
    height: 978.81px;
  }
  @media only screen and (min-width: 359px) and (max-width: 361px) {
    height: 758.81px;
  }

  @media only screen and (min-width: 361px) and (max-width: 376px) {
    height: 638.81px;
  }

  @media only screen and (min-width: 376px) and (max-width: 431px) {
    height: 806.4px;
  }
  @media only screen and (min-width: 410px) and (max-width: 413px) {
    height: 828.4px;
  }
  @media only screen and  (min-width: 431px) and (max-width: 1280px) {
    height: 548px;
  }
  @media only screen and  (min-width: 431px) and (max-width: 769px) {
    height: 448px;
  }

  @media only screen and  (min-width: 1000px) and (max-width: 1025px) and (max-height:601px) {
    height: 188px;
  }
  overflow: scroll;
  & ::-webkit-scrollbar {
    width: 0px;
    height: 0;
    background-color: transparent;
  }
  scrollbar-width: none;
}
</style>
