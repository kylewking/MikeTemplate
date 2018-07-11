module.exports = {
  proxyList: {
    '/Uip': {
         target: 'http://localhost:8084',
        // target: process.env.NODE_PATH+':'+process.env.NODE_PORT,
        changeOrigin: true,
        pathRewrite: {
          '^/Uip': '/Uip'
        }
      },
  }
}