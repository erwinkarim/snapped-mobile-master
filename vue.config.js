module.exports = {
  devServer: {
    headers: {
      // to enable shared array buffer in chrome
      // 'Cross-Origin-Embedder-Policy': 'require-corp',
      // 'Cross-Origin-Opener-Policy': 'same-origin',
      // somehow breaks firefox
    },
    proxy: 'http://localhost:8000/',
  }
}
