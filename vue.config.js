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

    config.resolve.alias.set('vue', '@vue/compat')

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2
            }
          }
        }
      })
    
    // to remove warnings about these not defined
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })

  },
  configureWebpack: {
    resolve: {
      fallback: {
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve("buffer"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "querystring": require.resolve("querystring-es3"),
        "url": require.resolve("url/"),
        "crypto": require.resolve("crypto-browserify"),
        "vm": require.resolve("vm-browserify"),
        "fs": false,
      }
    },
  },
};
