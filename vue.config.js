const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  devServer: {
    headers: {
      // to enable shared array buffer in chrome
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      // somehow breaks firefox
    },
    // proxy: 'http://localhost:8000/',
    proxy: 'http://192.168.0.105:8000/',
  },
  chainWebpack: config => {
    // remove the prefetch plugin
    config.plugins.delete('prefetch')
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
    } else {
      // for dev only
      plugins: [new BundleAnalyzerPlugin()]
    }
  },
};
