<template>
  <div class="last-page">
    <!-- 要保持背景图长宽比 -->
    <img class="bg-img" src="~@/assets/img/last.jpg">
     <img class="logo-bottom-img" src="/dogs/static/img/logo2.png">

    <!-- 排行榜和我的奖品 -->
    <div class="rightside">
      <div class="rightside-btn" @click.prevent="$router.push({name: 'home'})">
        <span class="btn-text">返回<br>首页</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
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
  .last-page {
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
    .logo-bottom-img {
      position: absolute;
      z-index: 2;
      bottom: 3rem;
      left: 17%;
      width: 66%;
    }
    .rightside {
      position: absolute;
      right: 2rem;
      bottom: 5rem;
    }
    .rightside-btn {
      width: 5rem;
      height: 5rem;
      vertical-align: middle;
      // border: 2px solid #fff;
      background: #fc9808;
      border-radius: 50%;
      color: #444;
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
