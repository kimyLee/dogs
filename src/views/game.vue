<template>
  <div class="game-page">
    <!-- 要保持背景图长宽比 -->
    <img class="bg-img" src="~@/assets/img/gamepage.png">
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
          <img :src="'/dogs/static/img/' + item.dog + '.png'" :class="{'click-error': item.clickError}"/>
        </span>
        </transition-group>
      </div>
      <div class="btns">
        <span class="img-btn fu" @click.prevent="update('fudog')"><img src="~@/assets/img/fu.png"/></span>
        <span class="img-btn lu" @click.prevent="update('ludog')"><img src="~@/assets/img/lu.png"/></span>
        <span class="img-btn shou" @click.prevent="update('shoudog')"><img src="~@/assets/img/shou.png"/></span>
        <span class="img-btn xi" @click.prevent="update('xidog')"><img src="~@/assets/img/xi.png"/></span>
      </div>
    </div>
    <!-- 弹框 -->
    <div class="my-dialog" v-show="showDialog">
      <div class="dialog-head">
        <img src="/dogs/static/img/caidai.png">
        <span class="dialog-head-text">{{score}}<span style="font-size: 1.4rem">&nbsp;分</span></span>
      </div>
      <!-- 成功 -->
      <div class="dialog-box" v-show="score >= 8">
        <p class="dialog-rank">全国排名 30</p>
        <img class="loterry-button" @click.prevent="$router.push({name: 'lottery'})" src="/dogs/static/img/loterryBtn.png">
        <div class="button-panel">
          <span class="dialog-btn share">分享</span>
          <span class="dialog-btn rank-list" @click.prevent="$router.push({name: 'rank'})">排行榜</span>
        </div>
      </div>
      <!-- 失败 -->
      <div class="dialog-box" v-show="score < 8">
        <p class="dialog-fail">挑战失败</p>
        <p class="dialog-fail small" >不要灰心，继续努力哦</p>
        <div class="button-panel">
          <!-- <span class="dialog-btn share">分享</span> -->
          <span class="dialog-btn rank-list" @click.prevent="restart" style="font-size: 1.6rem">再来一局</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'game',
  data () {
    return {
      dogs: ['fudog', 'ludog', 'shoudog', 'xidog'],
      items: [],
      lock: false,
      clickCount: 0,
      time: 10,
      score: 0,
      gameStart: false,
      showDialog: false
    }
  },
  mounted () {
    let time = 1
    this.items = this.dogs.map((e) => {
      return {dog: e, time: time++, clickError: false}
    })
  },
  methods: {
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
      // alert('游戏结束，你获得了' + this.score + '分')
    },
    restart () {
      this.showDialog = false
      this.gameStart = false
      this.time = 10
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
        this.score++
      } else {
        this.lock = true
        target.clickError = true
        if (target.dog.indexOf('_error') === -1) {
          target.dog = target.dog + '_error'
        }
        setTimeout(() => {
          this.lock = false
          target.clickError = false
        }, 1000)
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
      top: 30%;
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
      .loterry-button {
        width: 10.5rem;
        display: inline-block;
        margin-bottom: 1.5rem;
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
    .content-box {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .bg-img {
      position: absolute;
      top: 0;
      left: 50%;
      height: 100%;
      transform: translateX(-50%);
      max-height: 690px;
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
      margin-top: 22rem;
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
  @keyframes mymove {
    from {transform: translateX(-10px);}
    to {transform: translateX(10px);}
  }

</style>
