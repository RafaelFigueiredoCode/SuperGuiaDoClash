export default {
  server: {
    proxy: {
      '/api': 'http://172.31.96.1:3001'
    }
  }
}