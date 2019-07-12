<template>
<div>
  <div @click="download()">
    <div v-if="!onstart">다운로드</div>
    <div v-else-if="done">다됨 ㅇㅇ</div>
    <div v-else>
      <div v-if="!progress">다운로드를 준비중이에요</div>
      <div>{{Math.floor(progress * 100)}}</div>
    </div>
  </div>
  <div v-if="help && !progress">다운로드가 진행이 안되네요... 연락주세요!</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      onstart: false,
      progress: null,
      help: false,
      done: false,
      filename: 'PoRA_1.0.0.exe',
      torrentId: 'magnet:?xt=urn:btih:8e4d20700ba90a1829d9274f1268a28cd62bdf9b&dn=Path+of+RubystarAshe+Setup+1.0.0.exe&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com',
    }
  },
  methods: {
    download () {
      if (this.onstart) return null
      this.onstart = true
      this.progress = 0
      setTimeout(() => !this.progress ? this.help = true : null, 30000)
      const self = this
      window.torrent.on('download', e => {
        self.progress = torrent.progress
      })
      window.torrent.add(this.torrentId, function(torrent) {
        torrent.files[0].getBlobURL(function(err, url) {
          if (err) throw err
          var link = document.createElement("a")
          link.download = self.filename
          link.href = url
          link.click()
          self.done = true
        })
      })
    }
  }
}
</script>
