module.exports = {
  proxyList: {
    '/Uip': {
      target: 'http://47.100.32.11:7080',
      // target: process.env.NODE_PATH+':'+process.env.NODE_PORT,
      changeOrigin: true,
      pathRewrite: {
        '^/Uip': '/Uip'
      }
    },
  }
}