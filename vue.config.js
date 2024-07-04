const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        pathRewrite: {
          // 重写路径 替换请求地址中的指定路径
          '^/api': '/' // 将请求地址中的api替换为空
        }
      }
    }
  }
})
