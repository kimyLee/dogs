<template>
  <div class="game-page">
    <!-- 要保持背景图长宽比 -->
    <img class="bg-img" src="~@/assets/img/gamepage.png">

    <!-- 排行榜和我的奖品 -->
    <div class="rightside">
      <div class="rightside-btn">排行榜</div>
      <div class="rightside-btn">
        <span class="btn-text">我的<br>奖品</span>
      </div>
    </div>
    <!-- 按钮面板 -->
    <div class="option-panel">
      <span class="start-btn">挑战开始</span>
      <img class="logo-img" src="~@/assets/img/logo.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .game-page {
    width: 100%;
    height: 100%;
    background: #ff1457;
    .bg-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
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
      width: 12rem;
      height: 3rem;
      border-radius: 3rem;
      line-height: 3rem;
      display: inline-block;
      background: #fc9808;
      text-align: center;
      color: #fff;
      font-size: 2rem;
      position: absolute;
      bottom: 0;
    }
    .logo-img {
      display: inline-block;
      float: right;
      width: 8rem;

    }
  }
</style>
