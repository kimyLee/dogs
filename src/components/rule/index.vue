<template>
  <div class="rule">
    <div class="inner-box">
      <!-- tab banner -->
      <div>
        <router-link :to="'home'">活动规则</router-link>
        <span class="slider"></span>
        <router-link :to="'home'">排行榜</router-link>
        <span class="slider"></span>
        <router-link :to="'home'">我的奖品</router-link>
      </div>
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
  .rule {
    position: absolute;
    padding: 2rem 1.5rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    .inner-box {
      width: 100%;
      height: 100%;
      background: #fffade;
      border-radius: 2rem 2rem 0 0;
    }
  }
</style>
