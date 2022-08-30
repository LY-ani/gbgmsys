// let proxyObj = {};

// proxyObj['/'] = {
//   // websocket
//   ws: false,
//   // 目标地址
//   target: 'http://localhost:3000',
//   // 发送请求头host会被设置target
//   changeOrigin: true,
//   // 不重写请求地址
//   pathReWrite: {
//     '^/': '/',
//   },
// };

// // 设置代理
// module.exports = {
//   devServer: {
//     host: 'localhost',
//     port: 8080,
//     proxy: proxyObj,
//   },
// };
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 配置别名
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        views: '@/views',
      },
    },
  },
};
