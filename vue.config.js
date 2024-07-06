const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.trtst.com/', // 代理的接口地址
        changeOrigin: true, // 允许跨域
        secure: true,
        /** secure说明
         * 若接口地址为http协议，配置secure: false,
         * 若接口地址为https协议，配置secure: true,
         *   一般情况下，配置secure: false,
         *   eg:
         *        上面 target: '【http】://192.168.2.127:80'就是http协议
         */
        pathRewrite: {
          // 重写路径 替换请求地址中的指定路径
          '^/api': '/' // 将请求地址中的api替换为空
        }
      }
    }
  }
})
