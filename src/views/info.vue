<template>
  <div class="info-page">
    <!-- 要保持背景图长宽比 -->
    <img class="bg-img" src="/dogs/static/img/lotteryBg.jpg">
    <img class="logo-img" src="/dogs/static/img/text.png">
    <img class="logo-bottom-img" src="/dogs/static/img/logo2.png">
    <div class="input-panel">
        <span class="input-item">姓名<input type="text" /></span>
        <span class="input-item">电话<input type="text" /></span>
        <span class="input-item">地址<input type="text" /></span>
        <div style="text-align: center">
          <span class="submit-btn" @click.prevent="$router.push({name: 'last'})">提交</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
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
  .info-page {
    width: 100%;
    height: 100%;
    background: #ff1457;
    .bg-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .logo-img {
      position: absolute;
      z-index: 2;
      top: 3rem;
      left: 29%;
      width: 42%;
    }
    .logo-bottom-img {
      position: absolute;
      z-index: 2;
      bottom: 3rem;
      left: 17%;
      width: 66%;
    }
    .input-panel {
      position: absolute;
      width: 100%;
      z-index: 10;
      padding: 0 3.6rem;
      top: 50%;
      transform: translateY(-50%);
      box-sizing: border-box;
    }
    .input-item {
      display: inline-block;
      width: 100%;
      height: 4rem;
      line-height: 2.4rem;
      margin-bottom: 3rem;
      background: #fffade;
      font-size: 1.8rem;
      padding: 0.8rem;
      box-sizing: border-box;
      input {
        vertical-align: top;
        font-size: 1.8rem;
        margin-left: 0.5rem;
        width: calc(100% - 6rem);
        display: inline-block;
        height: 100%;
        background: none;
        outline: none;
        border: none;
      }
    }
    .submit-btn {
      margin-top: 3rem;
      text-align: center;
      display: inline-block;
      font-size: 1.8rem;
      width: 12rem;
      height: 3.2rem;
      line-height: 3.2rem;
      border: 1px solid #444;
      border-radius: 0.5rem
    }
  }
</style>
