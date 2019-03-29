module.exports = {
  pluginOptions: {
    dll: {
      entry: [
        'vue',
        'vue-router',
        'vuex',
        'vuetify',
        'vuetify/lib',
        'vuetify/src/stylus/app.styl',
        'three'
      ],
      open: process.env.NODE_ENV !== 'test',
    },
    electronBuilder: {
      externals: ['socket.io', 'abletonlink'],
      chainWebpackRendererProcess: config => {
        // Chain webpack config for electron renderer process only
        // The following example will set IS_ELECTRON to true in your app
        config.plugin('define').tap(args => {
          args[0]['IS_ELECTRON'] = true
          return args
        })
      },
      mainProcessFile:  './src/electron/main.js',
    }
  },
  chainWebpack: config => {

    config.module
      .rule('glsl')
      .test(/\.glsl/)
      .use('webpack-glsl-loader')
      .loader('webpack-glsl-loader')
      .end()
  },
};
