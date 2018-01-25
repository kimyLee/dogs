<template>
  <div class="game-page">
    <!-- 要保持背景图长宽比 -->
    <img class="bg-img" src="~@/assets/img/gamepage.png">
    <!-- dogs -->
    <div class="content-box">
    <div class="img-dog-panel">
      <transition-group :name="(clickCount % 2) ? 'list' : 'list-left'" tag="p">
      <span class="img-dog"
        :class="'order' + $index"
        v-for="(item, $index) in items"
        :key="item.time">
        <img :src="'/dogs/static/img/' + item.dog"/>
      </span>
      </transition-group>
    </div>
    <div class="btns">
      <span class="img-btn fu" @click="update"><img src="~@/assets/img/fu.png"/></span>
      <span class="img-btn lu" @click="update"><img src="~@/assets/img/lu.png"/></span>
      <span class="img-btn shou" @click="update"><img src="~@/assets/img/shou.png"/></span>
      <span class="img-btn xi" @click="update"><img src="~@/assets/img/xi.png"/></span>
    </div>
    </div>
    <!-- 排行榜和我的奖品 -->
    <!-- <div class="rightside">
      <div class="rightside-btn">排行榜</div>
      <div class="rightside-btn">
        <span class="btn-text">我的<br>奖品</span>
      </div>
    </div> -->
    <!-- 按钮面板 -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      dogs: ['fudog.png', 'ludog.png', 'shoudog.png', 'xidog.png'],
      items: [],
      nextNum: 4,
      clickCount: 0
    }
  },
  mounted () {
    let time = 1
    this.items = this.dogs.map((e) => {
      return {dog: e, time: time++}
    })
  },
  methods: {
    update () {
      // this.remove()
      // this.add()
      let ele = {
        dog: this.dogs[Math.floor(Math.random() * 4)],
        time: (new Date()).getTime()
      }
      this.clickCount = this.clickCount > 100 ? 0 : (this.clickCount + 1)
      this.items.splice(0, 0, ele)
      this.items.splice(this.items.length - 1, 1)
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
      transition: all 1s;
    }
     .list-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
    .list-left-enter-active, .list-left-leave-active {
      transition: all 1s;
    }
     .list-left-leave-to {
      opacity: 0;
      transform: translateX(-30px);
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
      margin-left: -6rem;
      img {
        width: 100%;
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
  }
</style>
