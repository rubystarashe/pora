import Vue from 'vue'

const WebTorrent = require('webtorrent')
const torrent = new WebTorrent()
window.torrent = torrent

Vue.prototype.$torrent = torrent
