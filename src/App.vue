<template>
  <div id="app">
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
    <!-- 全局弹窗 -->
    <!-- <div class="global-dialog" v-show="showDialog">
      <div class="dialog-box">
        <div class="close"><span class="close-btn">×</span></div>
        <div style="text-align: center">
          <img class="not-reward" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/smile.png">
          <p class="reward-name-small" style="font-size: 1.8rem;">{{msg}}</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      showDialog: false,  // 显示弹窗
      msg: '',            // 显示信息
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
    })
  },
  watch: {
    'notLoadImgCount' () {
      this.progress = 100 - Math.round(this.notLoadImgCount / this.imgToalCount * 100)
    }
  },
  methods: {
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
