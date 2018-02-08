<template>
  <div class="home-page">
    <!-- 要保持背景图长宽比 -->
    <transition name="fade">
      <div v-show="appear">
        <img  class="bg-img" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/home.jpg">
        <img  class="bg-img-eye-left" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/eyes.png">
        <img  class="bg-img-eye-right" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/eyes.png">
      </div>
      <!-- <img v-show="appear" class="bg-img" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/page1.png"> -->
    </transition>
    <img class="bg-img-text" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/home_text.png">

    <!-- 排行榜和我的奖品 -->
    <div class="rightside">
      <div class="rightside-btn" @click.prevent="$router.push({name: 'home', query: {tab: 'rank'}})">排行榜</div>
      <div class="rightside-btn" @click.prevent="$router.push({name: 'home', query: {tab: 'myreward'}})">
        <span class="btn-text">我的<br>奖品</span>
      </div>
    </div>
    <!-- 按钮面板 -->
    <div class="option-panel" >
      <span class="start-btn" @click.prevent="startGame()">开始游戏</span>
      <!-- <img class="logo-img" src="~@/assets/img/logo.png"> -->
      <img class="logo-img" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/logo.png">
    </div>

    <!-- 规则面板 -->
    <rule v-show="$route.query.tab"></rule>
  </div>
</template>

<script>
import rule from '@/components/rule'
/* eslint-disable */
let bounceEaseOut = (t, b, c, d) => {
  if ((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b;
  } else if (t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
  } else if (t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
  } else {
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
  }
}
export default {
  name: 'home',
  data () {
    return {
      appear: false,
      eyeTimer: '',
      // 掉落相关参数
      movetion: {start: 0, begin: 0, end: 200, during: 100},
      target: ''
    }
  },
  components: {
    rule
  },
  mounted () {
    this.$nextTick(() => {
      this.appear = true
      this.target = this.$el.querySelector('.bg-img-text')
      this.dropdown()
      this.moveEyes()
    })
  },
  beforeDestroy () {
    // console.log('carry')
    clearInterval(this.eyeTimer)
  },
  methods: {
    startGame () {
      // 兼容ios
      // let bgMusic = document.getElementById('bg-music')
      // window.isIOS && bgMusic && bgMusic.play()
      this.$router.push({name: 'home', query: {tab: 'ruler'}})
    },
    moveEyes () {
      let eyeLeft = this.$el.querySelector('.bg-img-eye-left')
      let eyeRight = this.$el.querySelector('.bg-img-eye-right')
      this.eyeTimer = setInterval(() =>{
        let dis1 = (Math.random() - 0.6).toFixed(1)
        let dis2 = (Math.random()).toFixed(1)
        eyeLeft.style.transform = `translateY(${dis1}rem) translateX(${dis2}rem)`
        eyeRight.style.transform = `translateY(${dis1}rem) translateX(${dis2}rem)`
      }, 1000)
    },
    dropdown () {
      let dis = bounceEaseOut(this.movetion.start, this.movetion.begin, this.movetion.end, this.movetion.during)
      // 执行动画
      if (this.target) {
        this.target.style.transform = `translateY(${dis - 200}px)`
      }
      this.movetion.start++
      if (this.movetion.start <this.movetion.during) {
        requestAnimationFrame(this.dropdown)
      }
    }
  }
}
</script>

<style lang="scss">
  .home-page {
    width: 100%;
    height: 100%;
    background: #ff1457;
    .bg-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .bg-img-eye-left {
      position: absolute;
      top: 15rem;
      left: 7.5rem;
      width: 2rem;
      transition: transform .5s ease;
    }
    .bg-img-eye-right {
      position: absolute;
      top: 15rem;
      right: 8.7rem;
      width: 2rem;
      transition: transform .5s ease;
    }
    .bg-img-text {
      position: absolute;
      top: 1.2rem;
      left: 50%;
      margin-left: -10rem;
      width: 20rem;
    }
    .rightside {
      position: absolute;
      right: 1rem;
      top: 9rem;
      // padding: 0 2.5rem;
      // box-sizing: border-box;
      // text-align: right;
    }
    .rightside-btn {
      width: 5rem;
      height: 5rem;
      vertical-align: middle;
      border: 2px solid #fff;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      margin-bottom: 1rem;
      font-size: 1.4rem;
      position: relative;
      -webkit-tap-highlight-color: transparent;
      &::after {
        content: '';
        width: 0;
        height: 100%;
        display: inline-block;
        vertical-align: middle;
      }

      .btn-text {
        position: absolute;
        width: 5rem;
        vertical-align: middle;
        top: 50%;
        transform: translateY(-50%);
        left: 0;;
      }
    }
    .option-panel {
      position: absolute;
      bottom: 2rem;
      padding: 0 2.5rem;
      width: 100%;
      box-sizing: border-box;
    }
    .start-btn{
      width: 14rem;
      height: 5rem;
      border-radius: 2.2rem;
      line-height: 5rem;
      display: inline-block;
      background: #fc9808;
      text-align: center;
      color: #fff;
      font-size: 3rem;
      font-weight: bold;
      position: absolute;
      left: 1rem;
      bottom: 0;
      -webkit-tap-highlight-color: transparent;
    }
    .logo-img {
      display: inline-block;
      float: right;
      width: 8rem;
    }
    // 出场过渡效果
    .fade-enter-active, .fade-leave-active {
      transition: all 1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      transform: translateY(20px);
      opacity: 0;
    }
  }
  @media (max-width: 359px) {
    .home-page {
      .bg-img-eye-left {
        position: absolute;
        top: 14.5rem;
        left: 7.5rem;
        width: 1.8rem;
        transition: transform .5s ease;
      }
      .bg-img-eye-right {
        position: absolute;
        top: 14.5rem;
        right: 8.2rem;
        width: 1.8rem;
        transition: transform .5s ease;
      }
    }
  }
  @media (max-width: 320px) {
    .home-page {
      .bg-img-eye-left {
        position: absolute;
        top: 12.5rem;
        left: 6.5rem;
        width: 1.5rem;
        transition: transform .5s ease;
      }
      .bg-img-eye-right {
        position: absolute;
        top: 12.5rem;
        right: 7.2rem;
        width: 1.5rem;
        transition: transform .5s ease;
      }
    }
  }
</style>
