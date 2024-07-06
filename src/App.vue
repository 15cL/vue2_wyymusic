<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(process.env.VUE_APP_BASE_API)
  }
}
</script>
<style lang="scss" scoped></style>
