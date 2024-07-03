<template>
  <div class="loading">
    <div class="box">
      <van-loading color="#0094ff" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.loading{
  width: 100vw;
  height: 100vh;
 .box{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
