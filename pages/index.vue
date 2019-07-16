<template>
<div>
  <div class="title_area">
    <img class="title_logo" src="/pora/logo_big.png">
    <div class="title_main">
      <div class="title_main_title">Path of RubystarAshe</div>
      <div class="title_main_description">패스 오브 엑자일 유저 애드온</div>
    </div>
  </div>
  <div class="download_area" @click="download()">
    <div class="download_descriptions">
      <div class="download_description">현재 버전: 1.1.1</div>
      <div class="download_description">- 아이템에 Ctrl+C 키를 눌러 시세를 즉시 확인할 수 있어요</div>
      <div class="download_description">- 거래 메시지가 오면 애드온으로 알려줘요</div>
      <div class="download_description">- 경매장에서 거래 메시지를 복사하면 손쉽게 붙여넣을 수 있어요.</div>
      <div class="download_description">- PoRA를 사용하는 유저 끼리라면 카카오 유저이더라도 거래 애드온에 표시되요</div>
      <div class="download_description">- 창고의 가치를 한눈에 파악할 수 있어요</div>
      <div class="download_description">- 비싼 아이템을 획득할시 자동으로 알려줘요</div>
      <div class="download_description">- Ctrl + 마우스 휠 로 손쉽게 창고를 선택할 수 있어요</div>
      <div class="download_description">- F3 키를 통해 검색 오버레이를 이용할 수 있어요(현재 커런시 검색 기능만 가능)</div>
      <div class="download_description">이 애드온은 가계부 기능을 위해 유저의 총 카오스 오브 개수에 대한 정보를 수집합니다.</div>
      <div class="download_description">이 애드온은 거래 애드온을 위해 유저의 계정명과 캐릭터명, 최근 이용한 캐릭터명을 수집합니다.</div>
      <div class="download_description">이 애드온은 서버 성능과 유지에 대한 문제로, 유저의 업로드 자원을 일부 사용할 수 있습니다.</div>
      <div class="download_description">이 애드온은 순수 독자적 커뮤니케이션 기능을 제외한 정보 이용으로는 수익창출 하지 않습니다.</div>
      <div class="download_description">이 애드온을 다운로드 하여 사용시 위의 모든 사항에 동의하는것으로 간주합니다.</div>
    </div>
    <div class="download_btn_area">
      <div v-if="!onstart">1.1.1 다운로드</div>
      <div v-else-if="done">다운로드 완료!</div>
      <div v-else>
        <div v-if="!progress">다운로드를 준비중이에요</div>
        <div class="progress_bg" :style="{ width: Math.floor(progress * 100) + '%' }"/>
        <div v-if="progress" class="progress">{{Math.floor(progress * 100)}}% {{bytesToSize(downloadSpeed || 0)}}/s</div>
      </div>
    </div>
  </div>
  <div class="help_area" v-if="help && !progress && !done">
    <div class="help_box">
      <div>다운로드가 진행이 안되시면 아래 링크로 다운로드 받아보세요!</div>
      <a href="https://firebasestorage.googleapis.com/v0/b/spinel-2019.appspot.com/o/Path%20of%20RubystarAshe%20Setup%201.1.1.exe?alt=media&token=32ac5319-27e7-4494-b32f-8319da851c68">서버를 통한 다운로드</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      onstart: false,
      progress: null,
      downloadSpeed: null,
      help: false,
      done: false,
      filename: 'PoRA_1.1.1.exe',
      torrentId: 'magnet:?xt=urn:btih:3c2fd69f83097cdc666bd18d0df0d8e7a334d238&dn=Path+of+RubystarAshe+Setup+1.1.1.exe&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com',
    }
  },
  methods: {
    download () {
      if (this.onstart) return null
      this.onstart = true
      this.progress = 0
      setTimeout(() => !this.progress && !this.done ? this.help = true : null, 30000)
      const self = this
      window.torrent.on('download', e => {
        self.progress = window.torrent.progress
        self.downloadSpeed = window.torrent.downloadSpeed
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
    },
    bytesToSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
  }
}
</script>

<style>
body {
  background: url('/pora/bg.png');
  background-position: right top;
  background-repeat:  no-repeat;
  background-attachment: fixed;
  background-size: cover;
  margin: 0;
}
.title_area {
  position: fixed;
  left: calc(2vh + 2vw);
  top: calc(1.5vh + 1.5vw);
  padding: calc(1vh + 1vw);
  border-radius: calc(1vh + 1vw);
  background: rgba(47,50,65,.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.title_logo {
  height: calc(7vh + 7vw);
  margin-right: calc(1.5vh + 1.5vw);
}
.title_main {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.title_main_title {
  font-size: calc(2vh + 2vw);
  color:#ffeaf4;
}
.title_main_description {
  color: #ffbcbc;
  margin-top: calc(1vh + 1vw);
  font-size: calc(.8vh + .8vw);
}

.download_area {
  position: fixed;
  right: calc(2vh + 2vw);
  bottom: calc(1.5vh + 1.5vw);
  padding: calc(1vh + 1vw);
  border-radius: calc(1vh + 1vw);
  background: rgba(47,50,65,.9);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.download_descriptions {
  font-size: calc(.6vh + .6vw);
  color: rgb(104,153,167);
}
.download_description {
  margin: calc(.2vh + .2vw) 0;
  transition: color .3s;
}
.download_description:hover {
  color: rgb(159,234,249);
}
.download_btn_area {
  position: relative;
  margin-top: calc(1vh + 1vw);
  color:#ffeaf4;
  background: rgba(0, 0, 0, .5);
  border-radius: calc(.5vh + .5vw);
  padding: calc(.7vh + .7vw) calc(1vh + 1vw);
  border: calc(.05vh + .05vw) solid #ffeaf4;
  cursor: pointer;
  transition: all .3s;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: calc(5vh + 5vw);
  min-height: calc(1vh + 1vw);
}
.download_btn_area:hover {
  background: rgba(0, 0, 0, .8);
}
.progress_bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background: white;  
}
.progress {
  position: absolute;
  color: #ffbcbc;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.help_area {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.help_box {
  position: fixed;
  background: rgba(30,20,30,.9);
  color: #ffbcbc;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  padding: calc(1vh + 1vw);
  font-size: calc(1vh + 1vw);
  border-radius: calc(1vh + 1vw);
  z-index: 10000;
}
.help_box>div {
  margin: calc(.3vh + .3vw);
}
</style>