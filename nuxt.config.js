module.exports = {
  mode: 'spa',
  head: {
    title: 'Path of Rubystar Ashe',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Path of Exile user addon' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }
    ]
  },
  plugins: [
    { src: "~plugins/torrent.js", ssr: false}
  ],
  build: {
    extend(config, ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  router: {
    base: '/pora/'
  }
}
