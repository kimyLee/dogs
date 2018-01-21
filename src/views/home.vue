<template>
  <div class="home-page">
    <!-- 要保持背景图长宽比 -->
    <img class="bg-img" src="~@/assets/img/page1.png">
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
    .option-panel {
      position: absolute;
      bottom: 2rem;
      padding: 0 2rem;
      width: 100%;
      box-sizing: border-box;
    }
    .start-btn{
      width: 8rem;
      height: 3rem;
      border-radius: 3rem;
      line-height: 3rem;
      display: inline-block;
      background: #faee01;
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
