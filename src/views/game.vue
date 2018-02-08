<template>
  <div class="game-page">
    <!-- 游戏开始 GO -->
    <div class="fade-text-hover" v-show="beginNum >= 0">
      <transition name="fade-text">
        <div class="text-effect" v-show="showTextEffect">{{showTextEffect}}</div>
      </transition>
    </div>
    <!-- 要保持背景图长宽比 -->
    <!-- <div id="canvas-container" class="canvas-container"></div> -->
    <img  class="bg-img-top" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/game-top.jpg">
    <img class="bg-img-bottom" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/game-bottom.jpg">
    <!-- <img class="bg-img" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/gamepage.png"> -->
    <!-- 云彩 -->
    <transition name="fade">
      <div v-show="appear">
        <img class="bg-img-cloud1" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/cloud1.png">
        <img class="bg-img-cloud2" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/cloud2.png">
        <!-- <img class="bg-img-fire" src="/luckydogs/static/img/fire.png"> -->
        <img class="bg-img-fire" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/fire.png">
        <img class="bg-img-text" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/game_text.png">
      </div>
    </transition>
    <!-- dogs -->
    <div class="content-box">
       <!-- 得分面板 -->
      <div class="score-panel">
        <div class="top">
          <span>当前得分</span>
        </div>
        <div class="bottom">
          <span >{{score}}分</span>
        </div>
      </div>
    <!-- 倒计时 -->
      <div class="leftside">
        <div class="leftside-btn">
          <span class="btn-text">倒计时</span>
          <span class="btn-text-time">{{time}}s</span>
        </div>
      </div>
      <div class="img-dog-panel">
        <transition-group :name="(clickCount % 2) ? 'list' : 'list-left'" tag="p">
        <!-- <transition-group name="list" tag="p"> -->
        <span class="img-dog"
          :class="'order' + $index"
          v-for="(item, $index) in items"
          :key="item.time">
          <!-- <img :src="'/luckydogs/static/img/' + item.dog + '.png'" :class="{'click-error': item.clickError}"/> -->
          <img :src="'http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/' + item.dog + '.png'" :class="{'click-error': item.clickError}"/>
        </span>
        </transition-group>
      </div>
      <div class="btns">
        <span class="img-btn fu" @click.prevent="update('fudog')"><img src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/fu.png"/></span>
        <span class="img-btn lu" @click.prevent="update('ludog')"><img src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/lu.png"/></span>
        <div class="img-btn shou">
          <span  @click.prevent="update('shoudog')"><img src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/shou.png"/></span>
          <!-- 引导提示 v-if="addFirstTip" v-if="handIn"-->
          <div class="click-tip" @click="directClick(2)" v-if="addTips === 2">
            <transition name="right-in">
              <img class="click-tip-finger" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/finger.png" v-if="handIn === 2"/>
            </transition>
            <div class="w1" ></div>
            <div class="w2" ></div>
            <div class="w3"></div>
          </div>
        </div>
        <div class="img-btn xi">
          <span  @click.prevent="update('xidog')"><img src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/xi.png"/></span>
           <!-- 引导提示 v-if="addFirstTip" v-if="handIn"-->
          <div class="click-tip" @click="directClick(1)" v-if="addTips === 1">
            <transition name="right-in">
              <img class="click-tip-finger" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/finger.png" v-if="handIn === 1"/>
            </transition>
            <div class="w1" ></div>
            <div class="w2" ></div>
            <div class="w3"></div>
          </div>
        </div>
        <!-- <span class="img-btn fu" @click.prevent="update('fudog')"><img src="~@/assets/img/fu.png"/></span>
        <span class="img-btn lu" @click.prevent="update('ludog')"><img src="~@/assets/img/lu.png"/></span>
        <span class="img-btn shou" @click.prevent="update('shoudog')"><img src="~@/assets/img/shou.png"/></span>
        <span class="img-btn xi" @click.prevent="update('xidog')"><img src="~@/assets/img/xi.png"/></span> -->
      </div>
    </div>
    <!-- 弹框 -->
    <div class="my-dialog" v-show="showDialog">
      <div class="dialog-head">
        <img src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/caidai.png">
        <span class="dialog-head-text">{{score}}<span style="font-size: 1.4rem">&nbsp;分</span></span>
      </div>
      <!-- 成功 -->
      <div class="dialog-box" v-show="score >= 8000">
        <!-- <p class="dialog-rank">全国排名 30</p> -->
        <!-- <img class="loterry-button" @click.prevent="$router.push({name: 'lottery'})" src="/luckydogs/static/img/loterryBtn.png"> -->
        <div @click="jumpLottery" class="loterry-button-hover"><img class="loterry-button"  src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/loterryBtn.png"></div>
        <div class="button-panel">
          <!-- <span class="dialog-btn share">分享</span> -->
          <span class="dialog-btn rank-list" @click.prevent="$router.push({name: $route.name, query: {tab: 'rank'}})">排行榜</span>
        </div>
      </div>
      <!-- 失败 -->
      <div class="dialog-box" v-show="score < 8000">
        <p class="dialog-fail">挑战失败</p>
        <p class="dialog-fail small" >不要灰心，继续努力哦</p>
        <div class="button-panel">
          <!-- <span class="dialog-btn share">分享</span> -->
          <span class="dialog-btn" @click.prevent="$router.push({name: $route.name, query: {tab: 'rank'}})">排行榜</span><br>
          <span class="dialog-btn rank-list" @click.prevent="restart" style="font-size: 1.6rem">再来一局</span>
        </div>
      </div>
    </div>
    <!-- 规则面板 -->
    <rule v-show="$route.query.tab"></rule>
  </div>
</template>

<script>
import md5 from 'md5'
import Qs from 'qs'
import axios from 'axios'
import rule from '@/components/rule'
// import Fireworks from '@/lib/firework'
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
let rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);}
/* eslint-enable */
export default {
  name: 'game',
  data () {
    return {
      randomCode: '',
      appear: false,
      dogs: ['fudog', 'ludog', 'shoudog', 'xidog'],
      items: [],
      lock: false,
      clickCount: 0,
      time: 20,
      score: 0,
      gameStart: false,
      showDialog: false,
      // 掉落相关参数
      touchEarth: false,
      movetion: {start: 0, begin: 0, end: 200, during: 50},
      target: '',
      firework: '',
      fireworkTimer: '',
      showTextEffect: '',                   // 进场特效
      beginNum: 3,                          // 进场特效
      addTips: '',                          // 显示哪个手指
      handIn: '',                            // 手指
      hasCheck: false                            // 是否引导国
    }
  },
  components: {
    rule
  },
  beforeDestroy () {
    clearInterval(this.fireworkTimer)
  },
  mounted () {
    this.getKeys()
    // 初始化开始
    setTimeout(() => {
      this.countEffect()
    }, 50)
    // 初始化狗狗
    let time = 1
    this.items = this.dogs.map((e) => {
      return {dog: e, time: time++, clickError: false}
    })

    // 初始化掉落进场
    this.target = this.$el.querySelector('.bg-img-top')
    window.tarHeight = this.target.style.Height
    setTimeout(() => {
      this.dropdown()
    }, 500)

    // let winW = window.innerWidth
    // let winY = window.innerHeight * 0.45
    setTimeout(() => {
      this.appear = true
      // this.firework = new Fireworks()
      // this.fireworkTimer = setInterval(() => {
      //   this.firework.createFireworks(rand(winW / 2 - 50, winW / 2 + 50), winY, rand(50, winW - 50), rand(50, winY / 2) - 50)
      //   this.firework.createFireworks(rand(winW / 2 - 50, winW / 2 + 50), winY, rand(50, winW - 50), rand(50, winY / 2) - 50)
      // }, 1200)
    }, 1000)
  },
  methods: {
    // 引导点击了按钮
    directClick (num) {
      if (num === 1) {
        this.addTips = 2
        this.handIn = 2
        let ele = {
          dog: this.dogs[Math.floor(Math.random() * 4)],
          time: (new Date()).getTime(),
          clickError: false
        }
        this.clickCount = this.clickCount > 100 ? 0 : (this.clickCount + 1)
        this.items.splice(0, 0, ele)
        this.items.splice(this.items.length - 1, 1)
        // this.score = this.score + 600
      }
      if (num === 2) {
        this.addTips = ''
        let ele = {
          dog: this.dogs[Math.floor(Math.random() * 4)],
          time: (new Date()).getTime(),
          clickError: false
        }
        this.clickCount = this.clickCount > 100 ? 0 : (this.clickCount + 1)
        this.items.splice(0, 0, ele)
        this.items.splice(this.items.length - 1, 1)
        // this.score = this.score + 600
        localStorage.setItem('hasCheck', 1)
      }
      console.log('click')
    },
    countEffect () {
      console.log(this.beginNum)
      if (this.beginNum > 0) {
        this.showTextEffect = this.beginNum
        setTimeout(() => {
          this.showTextEffect = ''
        }, 500)
        setTimeout(() => {
          this.beginNum--
          this.countEffect()
        }, 1000)
      } else {
        this.showTextEffect = 'GO'
        setTimeout(() => {
          this.showTextEffect = ''
          this.beginNum--
          // 触发提示
          this.hasCheck = !!(localStorage.getItem('hasCheck') - 0)
          if (!this.hasCheck) {
            this.addTips = 1
            setTimeout(() => {
              this.handIn = 1
            }, 50)
          }
        }, 500)
      }
    },
    // 掉落函数
    dropdown () {
      let dis = bounceEaseOut(this.movetion.start, this.movetion.begin, this.movetion.end, this.movetion.during)
      // 执行动画
      if (!this.touchEarth && dis >= 200) {
        this.touchEarth = true
      }
      if (this.target) {
        this.target.style.transform = `scaleY(${dis / 200})`
        // this.target.style.transform = `translateY(${dis - 200}px)`
        // if (this.touchEarth) {
        //   this.target.style.transform = `translateY(${dis - 200}px) scaleY(${(window.tarHeight + 200 - dis) / window.tarHeight})`
        //   // this.target.style.Height = window.tarHeight + 200 - dis
        // } else {
        //   this.target.style.transform = `translateY(${dis - 200}px)`
        // }
      }
      this.movetion.start++
      if (this.movetion.start < this.movetion.during) {
        requestAnimationFrame(this.dropdown)
      }
    },
    // 保存分数前先获取随机数密文传输
    getKeys () {
      return axios.post('/index/getcode')
        .then((result) => {
          this.randomCode = md5('WBLxinchun' + result)
        })
        .catch((error) => {
          console.log(error)
        })
      // console.log(md5('message'))
    },
    updateScore () {
      let fn = () => {
        let params = Qs.stringify({
          score: this.score,
          sign: this.randomCode
        })
        axios.post('/Index/SaveScore', params, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
          .then((result) => {
            let res = result.data
            if (res.Code === 1) {
            } else {
              return Promise.reject(res)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
      this.getKeys()
        .then(() => {
          fn()
        })
        .catch((error) => {
          console.log(error)
          fn()
        })
    },
    jumpLottery () {
      this.$router.push({name: 'lottery', query: {score: this.score}})
    },
    // 场景计时
    renderScence () {
      this.time--
      if (this.time >= 0) {
        setTimeout(() => {
          this.renderScence()
        }, 1000)
      } else {
        this.time = 0
        this.gameOver()
      }
    },
    gameOver () {
      this.lock = true
      this.showDialog = true
      this.updateScore()
      // alert('游戏结束，你获得了' + this.score + '分')
    },
    restart () {
      this.showDialog = false
      this.gameStart = false
      this.time = 20
      this.score = 0
      this.lock = false
    },
    update (dog) {
      if (this.addTips) {
        return
      }
      if (this.lock) {
        return
      }
      if (!this.gameStart) {
        this.gameStart = true
        this.renderScence()
      }
      let target = this.items[this.items.length - 1]
      // 判断是否按对
      if (target.dog.indexOf(dog) === 0) {
        let ele = {
          dog: this.dogs[Math.floor(Math.random() * 4)],
          time: (new Date()).getTime(),
          clickError: false
        }
        this.clickCount = this.clickCount > 100 ? 0 : (this.clickCount + 1)
        this.items.splice(0, 0, ele)
        this.items.splice(this.items.length - 1, 1)
        this.score = this.score + 600
      } else {
        this.lock = true
        target.clickError = true
        if (target.dog.indexOf('_error') === -1) {
          target.dog = target.dog + '_error'
        }
        setTimeout(() => {
          this.lock = false
          target.clickError = false
        }, 500)
      }
    },
    add () {
    },
    remove () {
    }
  }
}
</script>

<style lang="scss">
  .game-page {
    width: 100%;
    height: 100%;
    background: #ff1457;
    .fade-text-enter-active, .fade-text-leave-active {
      opacity: 0;
      transform: scale(1.8);
      transition: transform .5s, opacity .5s;
    }
    .fade-text-enter, .fade-text-leave-to {
      transform: scale(1);
      opacity: 1;
    }
    .right-in-enter-active, .right-in-leave-active {
      transition: all ease .3s;
    }
    .right-in-enter, .right-in-leave-to {
      transform: translateY(-1rem);
      opacity: 0;
    }
    .fade-text-hover {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      height: 100%;
      vertical-align: middle;
      text-align: center;
      &::after {
        content: '';
        width: 0;
        height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
      background: rgba(255, 255, 255, .7);
    }
    .text-effect {
      display: inline-block;
      height: 4rem;
      line-height: 4rem;
      top: 50%;
      margin-top: 2rem;
      vertical-align: middle;
      color: #ff1458;
      font-weight: bold;
      font-size: 9rem;
    }
    // 弹窗样式
    .my-dialog {
      position: absolute;
      z-index: 99;
      top: 10%;
      left: 0;
      padding: 0 3.9rem;
      box-sizing: border-box;
      width: 100%;
      .dialog-head {
        text-align: center;
        position: relative;
        transform: translateY(35%);
        .dialog-head-text {
          color: #444;
          display: inline-block;
          font-size: 2rem;
          line-height: 4.5rem;
          position: absolute;
          width: 100%;
          left: 0;
        }
        img {
          display: inline-block;
          width: 70%;
        }
      }
      .dialog-box {
        width: 100%;
        padding-bottom:2rem;
        background: #fffade;
        border-radius: 2rem;
        text-align: center;
      }
      .dialog-rank {
        font-size: 2rem;
        margin: 0;
        padding: 3rem 0 1.5rem 0;
        color: #ba1a35;
      }
      .loterry-button-hover {
        -webkit-tap-highlight-color: transparent;
      }
      .loterry-button {
        width: 10.5rem;
        margin-top: 3rem;
        display: inline-block;
        margin-bottom: 1.5rem;
        -webkit-tap-highlight-color: transparent;
      }
      .button-panel {
        width: 100%;
        overflow: hidden;
        padding: 0 2rem;
        box-sizing: border-box;
      }
      .dialog-btn {
        display: inline-block;
        font-size: 1.8rem;
        color: #e95513;
        height: 2.4rem;
        line-height: 2.4rem;
        min-width: 10rem;
        border:  2px solid #e95513;
        border-radius: 2.4rem;
        -webkit-tap-highlight-color: transparent;
        margin-bottom: 1rem;
      }
      .share {
        // float: left;
      }
      .rank-list {
        // float: right;
      }
      .dialog-fail {
        margin: 0;
        padding: 5rem 0 0 0;
        font-size: 2.2rem;
        color: #444;
        &.small {
          padding: 1rem 0 4rem 0;
          font-size: 1.8rem;
        }
      }
    }
    .canvas-container {
      position: absolute;
      z-index: 99999;
      width: 100%;
      height: 40%;
      // background: rgba(255, 255, 255, 0.5);
    }
    .content-box {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .score-panel {
      position: absolute;
      right: 2.5rem;
      top: 14rem;
      border-radius: 0.6rem;
      width: 8.4rem;
      overflow: hidden;
      text-align: center;
      font-size: 1.6rem;
      z-index: 1000;
      .top {
        background: #ff1458;
        height: 4rem;
        line-height: 4rem;
        width: 100%;
        color: #fff;
      }
      .bottom {
        background: #fff;
        height: 4rem;
        line-height: 4rem;
        width: 100%;
        color: #444;
      }
    }
    .bg-img-top {
      position: absolute;
      top: 0;
      width: 100%;
      height: 44.5%;
      max-height: 690px;
      transform-origin: 50% 100%;
      transform: scaleY(0);
    }
    .bg-img-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      // left: 50%;
      height: 56%;
      // transform: translateX(-50%);
      max-height: 690px;
    }
    .bg-img-cloud1 {
      position: absolute;
      left: 4rem;
      top: 10rem;
      width: 11rem;
      // perspective: 200px;
      animation: cloud 4s ease-in-out infinite alternate;
    }
    .bg-img-cloud2 {
      position: absolute;
      right: 3rem;
      top: 7rem;
      width: 8.6rem;
      // perspective: 200px;
      animation: cloud2 5s ease-in-out infinite alternate;
    }
    .bg-img-fire {
      position: absolute;
      top: 4rem;
      left: 1.5rem;
      width: 7.5rem;
      animation: fire 15s linear infinite;
    }
    .bg-img-text {
      position: absolute;
      width: 26rem;
      left: 50%;
      margin-left: -13rem;
      top: 1.5rem;
    }
    .btns {
      position: absolute;
      bottom: 2rem;
      text-align: center;
      width: 100%;
    }
    .img-btn {
      width: 6.7rem;
      height: 6.7rem;
      display: inline-block;
      -webkit-tap-highlight-color: transparent;
      img{
        width: 100%;
      }
      span {
        width: 100%;
        height: 100%;
        display: inline-block
      }
    }
    .fu {
      position: relative;
      top: 0rem;
      left: 0rem;
    }
    .lu {
      position: relative;
      top: -3rem;
      left: 0rem;
    }
    .shou {
      position: relative;
      top: 0rem;
      left: 0rem;
    }
    .xi {
      position: relative;
      top: -1.5rem;
      left: 1rem;
      &::after{

      }
    }
    // 引导按钮
    .click-tip {
      position: absolute;
      top: -25%;
      left: -25%;
      width: 150%;
      height: 150%;
      // z-index: 999;
      // bottom: 0rem;
      // right: 0;
      // width: 8rem;
      // height: 8rem;
      .click-tip-finger {
        position: absolute;
        top: -6rem;
        right: 1rem;
        width: 7rem;
        opacity: 1;
        transform: translateY(0);
        animation: finger 1s infinite alternate;
      }
      div {
        border: 0.6rem solid #fff;
        position:absolute;
        width: 0;
        height: 0;
        top: 14%;
        left: 14%;
        border-radius:50%;
        // margin-top: 1.2rem;
        // margin-left: 0.7rem;
        &.w1 {
          animation: ripple 2s infinite;
          animation-delay: 0s;
        }
        &.w2 {
          animation: ripple 2s infinite;
          animation-delay: 1s;
        }
        &.w3 {
          animation: ripple 2s infinite;
          animation-delay: 1.5s;
        }
      }
    }
    // dogs
    .list-enter-active, .list-leave-active {
      transition: all .7s;
    }
     .list-leave-to {
      opacity: 0;
      transform: translateX(40px);
    }
    .list-left-enter-active, .list-left-leave-active {
      transition: all .7s;
    }
     .list-left-leave-to {
      opacity: 0;
      transform: translateX(-40px);
    }
    .img-dog-panel {
      width: 100%;
      overflow: hidden;
      margin-top: 20rem;
      // text-align: center;
    }
    .img-dog {
      display: inline-block;
      width: 13.5rem;
      position: absolute;
      left: 50%;
      margin-left: -6.75rem;
      // transform: translateX(-50%);
      text-align: center;
      img {
        width: 100%;
      }
      .click-error {
        animation: mymove .05s 5;
      }
    }
    .order0 {
      margin-top: -1rem;
    }
    .order1 {
      margin-top: 0rem;
    }
    .order2 {
      margin-top: 1rem;
    }
    .order3 {
      margin-top: 2rem;
    }
    .leftside {
      position: absolute;
      left: 2.5rem;
      top: 28rem;
    }
    .leftside-btn {
      width: 5.5rem;
      height: 5.5rem;
      vertical-align: middle;
      border: 5px solid #fff;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      margin-bottom: 1rem;
      font-size: 1.4rem;
      position: relative;
      &::after {
        content: '';
        width: 0;
        height: 100%;
        display: inline-block;
        vertical-align: middle;
      }

      .btn-text {
        font-size: 1.2rem;
        position: relative;
        top: 2px;
      }
      .btn-text-time {
         font-size: 2.4rem;
        position: relative;
        top: -8px;
      }
    }
  }
  // 出场过渡效果
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  @keyframes mymove {
    from {transform: translateX(-10px); }
    to {transform: translateX(10px);}
  }
  @keyframes cloud {
    from {transform: translateX(-30px) }
    to {transform: translateX(30px)}
  }
  @keyframes cloud2 {
    from {transform: translateX(30px)}
    to {transform: translateX(-30px)}
  }
  @keyframes fire {
    from {transform: rotate(0)}
    to {transform: rotate(360deg)}
  }
  @keyframes finger {
    from {transform: translateY(-2rem)}
    to {transform: translateY(0)}
  }
  @keyframes ripple {
    from {
      opacity: 1;
      width: 60%;
      height: 60%;
      top: 14%;
      left: 14%;
    }
    to {
      opacity: 0;
      width: 100%;
      height: 100%;
      top: -8%;
      left: -8%;
    }
  }
  @media (max-width: 340px) {
    .game-page {
      .score-panel {
        right: 2rem;
        top: 12rem;
      }
      .bg-img-cloud1 {
        position: absolute;
        left: 4rem;
        top: 10rem;
        width: 8rem;
        // perspective: 200px;
        animation: cloud 4s ease-in-out infinite alternate;
      }
      .bg-img-cloud2 {
        position: absolute;
        right: 3rem;
        top: 7rem;
        width: 6rem;
        // perspective: 200px;
        animation: cloud2 5s ease-in-out infinite alternate;
      }
      .bg-img-fire {
        position: absolute;
        top: 4rem;
        left: 1.5rem;
        width: 6.5rem;
        animation: fire 15s linear infinite;
      }
      .img-dog-panel {
        width: 100%;
        overflow: hidden;
        margin-top: 18rem;
        // text-align: center;
      }
      .img-btn {
        width: 5.7rem;
        height: 5.7rem;
        display: inline-block;
        -webkit-tap-highlight-color: transparent;
        img{
          width: 100%;
        }
      }
      .my-dialog {
        .dialog-btn {
          display: inline-block;
          font-size: 1.8rem;
          height: 2.4rem;
          line-height: 2.4rem;
          width: 6.5rem;
          border:  2px solid #e95513;
          border-radius: 2.4rem;
          -webkit-tap-highlight-color: transparent;
        }
      }
    }
  }

</style>
