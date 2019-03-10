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
    }
  }
};
