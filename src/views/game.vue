<template>
  <div class="game-page">
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
        <span class="img-btn shou" @click.prevent="update('shoudog')"><img src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/shou.png"/></span>
        <span class="img-btn xi" @click.prevent="update('xidog')"><img src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/xi.png"/></span>
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
          <span class="dialog-btn" style="float:left;" @click.prevent="$router.push({name: $route.name, query: {tab: 'rank'}})">排行榜</span>
          <span class="dialog-btn rank-list" @click.prevent="restart" style="font-size: 1.6rem">再来一局</span>
        </div>
      </div>
    </div>
    <!-- 规则面板 -->
    <rule v-show="$route.query.tab"></rule>
  </div>
</template>

<script>
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
      fireworkTimer: ''
    }
  },
  components: {
    rule
  },
  beforeDestroy () {
    clearInterval(this.fireworkTimer)
  },
  mounted () {
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
    updateScore () {
      let params = Qs.stringify({
        score: this.score
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
        width: 7.5rem;
        border:  2px solid #e95513;
        border-radius: 2.4rem;
        -webkit-tap-highlight-color: transparent;
      }
      .share {
        float: left;
      }
      .rank-list {
        float: right;
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
  @media (max-width: 340px) {
    .game-page {
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
