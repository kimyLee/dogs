<template>
  <div id="app" >
     <!-- 预加载 -->
    <div class="loading" v-show="curProgress < 100">
      <div class="loading-cycle">
        <svg :width="60" :height="60" class="loading-svg">
        <circle :cx="30" :cy="30" :r="20" stroke-width="10" stroke="#fed744" fill="none"></circle>
        <circle :cx="30" :cy="30" :r="20" stroke-width="10" stroke="#d35155" fill="none"  :stroke-dasharray="circleDasharray"></circle>
        </svg>
        <br>
        {{curProgress}}%
      </div>
    </div>
    <router-view v-if="curProgress >= 100"/>
    <!-- 音频加载 -->
    <audio id="bg-music" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/music/bg.mp3" preload loop></audio>
    <audio id="right-music" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/music/right.mp3" preload></audio>
    <audio id="error-music" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/music/error.mp3" preload></audio>
    <audio id="time-music" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/music/time.mp3" preload></audio>
    <!-- 全局弹窗 -->
    <div class="global-dialog" v-show="showDialog">
      <div class="dialog-box">
        <div class="close" @click="closeDialog"><span class="close-btn">×</span></div>
        <div style="text-align: center">
          <img class="not-reward" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/smile.png">
          <p class="reward-name-small" style="font-size: 1.8rem;">{{msg}}</p>
          <div class="operation">
            <span class="operation-btn" @click.prevent="closeDialog">确定</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 全局分享弹窗 -->
    <div class="global-share" v-show="showShare" @click="showShare = false">
      <img src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/share.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      showShare: false,
      hasInitMusic: false,
      showDialog: false,  // 显示弹窗
      msg: '未知错误',            // 显示信息
      progress: 0,
      curProgress: 0,     // 加载进度
      circleDasharray: 0, // 圆环长度
      imgToalCount: 0,
      notLoadImgCount: 0
    }
  },
  mounted () {
    this.preLoad()
    this.$nextTick(() => {
      this.transionTarget()
      // 事件巴士
      this.$bus.$on('pop-alert', text => {
        this.showDialog = true
        this.msg = text
      })
      this.$bus.$on('pop-share', text => {
        this.showShare = true
      })
      // 开始播放背景
      let bgMusic = document.getElementById('bg-music')
      bgMusic && bgMusic.play()
      // 兼容ios 的音乐
      let fn = () => {
        bgMusic && bgMusic.play()
        this.$el.removeEventListener('click', fn)
      }
      this.$el.addEventListener('click', fn)
    })
  },
  watch: {
    'notLoadImgCount' () {
      this.progress = 100 - Math.round(this.notLoadImgCount / this.imgToalCount * 100)
    }
  },
  methods: {
    // 兼容iosios的音乐
    tryMusic () {
      if (this.hasInitMusic || !window.isIOS) {
        return
      }
      this.hasInitMusic = true
      let bgMusic = document.getElementById('bg-music')
      bgMusic && bgMusic.play()
    },
    // 关闭全局弹窗
    closeDialog () {
      this.showDialog = false
    },
    // 顺滑过渡 progress ，会通过计算属性模拟transition到达
    transionTarget () {
      if (this.curProgress >= 100) {
        // this.afterLoad()
        return
      }
      let time = this.curProgress < this.progress ? 5 : 30
      if (this.curProgress < Math.max(30, this.progress)) {
        this.curProgress++
      } else {
        this.curProgress = Math.max(30, this.progress)
      }
      this.circleDasharray = Math.round(this.curProgress / 100 * 2 * Math.PI * 20) + ' 1069'
      setTimeout(() => {
        this.transionTarget()
      }, time)
    },

    // 预加载
    preLoad () {
      let imgs = [
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/caidai.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/cloud1.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/cloud2.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/eyes.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/fu.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/lu.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/shou.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/xi.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/fudog.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/ludog.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/shoudog.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/xidog.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/fudog_error.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/ludog_error.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/shoudog_error.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/xidog_error.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/game_text.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/game-bottom.jpg',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/game-top.jpg',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/home.jpg',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/home_text.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/horse.jpg',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/horse_active.jpg',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/last.jpg',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/logo.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/logo2.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/loterryBtn.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/lotteryBg.jpg',
        // 'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/page1.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/rank1.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/rank2.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/rank3.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/smile.png',
        'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/text.png'
      ]
      this.imgToalCount = imgs.length
      this.notLoadImgCount = imgs.length
      imgs.forEach(e => {
        let img = new Image()
        img.src = e
        img.onload = () => {
          this.notLoadImgCount--
        }
        img.onerror = () => {
          this.notLoadImgCount--
        }
      })
    }
  }
}
</script>

<style lang="scss">
html {
  font-size: 62.5%;
  user-select: none;
}
img { pointer-events: none; }

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  -webkit-text-size-adjust: 100%;
  font-variant-ligatures: none;
  -webkit-font-variant-ligatures: none;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-shadow: rgba(0, 0, 0, .01) 0 0 1px;
}

#app {
  font-family: 'Microsoft Yahei', 'PingFang SC', STHeitiSC-Light, Helvetica-Light, arial, sans-serif;
  position: absolute;
  width: 100%;
  height: 100%;
}
.global-share {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.loading {
  position: fixed;
  background: #fff;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999;
  text-align: center;
  .loading-cycle {
    position: relative;
    top: 50%;
    margin-top: -1.5rem;
  }
  .loading-svg {
    display: inline-block;
    transform-origin: center;
    transform-box: fill-box;
    transform: rotate(-90deg);
    cycle {
      transition: all .4s ease;
    }
  }
}
 .global-dialog {
      z-index: 99;
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      padding: 0 3rem;
      box-sizing: border-box;
      font-size: 1.6rem;
      p {
        margin: 0;
        padding: 0;
      }
      .dialog-box {
        width: 100%;
        border-radius: 2rem;
        background: #fffade;
        padding: 1rem;
        box-sizing: border-box;
      }
      .close{
        overflow: hidden;
        // padding: 1rem;
        box-sizing: border-box;
      }
      .close-btn{
        display: inline-block;
        text-align: center;
        height: 2.4rem;
        line-height: 2.4rem;
        width: 2.4rem;
        float: right;
        font-size: 2.4rem;
      }
      .reward-name {
        text-align: center;
        font-size: 4rem;
        font-weight: bold;
        color: #960c1d;
      }
      .reward-name-small {
        text-align: center;
        font-size: 1.8rem;
        margin: 1rem 0;
      }
      .operation {
        text-align: center;
      }
      .operation-btn {
        margin: 2rem 0;
        display: inline-block;
        font-size: 1.8rem;
        width: 8rem;
        height: 2.6rem;
        line-height: 2.6rem;
        border: 1px solid #444;
        border-radius: 0.5rem;
        -webkit-tap-highlight-color: transparent;
      }
      .not-reward {
        display: inline-block;
        width: 5.7rem;
      }
    }

@media (min-height: 668px) {
  body {
    background: #973134;
  }
  #app {
    height: 667px;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
  }
}
</style>
