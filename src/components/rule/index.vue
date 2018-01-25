<template>
  <div class="rule">
    <div class="inner-box">
      <!-- tab banner -->
      <div class="banner-title">
        <router-link class="tab-link" :to="{name: 'ruler'}">活动规则</router-link>
        <span class="slider"></span>
        <router-link class="tab-link" :to="{name: 'rank'}">排行榜</router-link>
        <span class="slider"></span>
        <router-link class="tab-link" :to="{name: 'myreward'}">我的奖品</router-link>
        <router-view></router-view>
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
    .banner-title {
      padding: 1.6rem 0;
      text-align: center;
      .tab-link {
        // font-weight: bold;
        display: inline-block;
        text-decoration: none;
        // height: 1.6rem;
        // line-height: 1.6rem;
        font-size: 2rem;
        margin: 0 0.8rem;
        color: #444;
      }
    }
    .slider {
      width: 0;
      height: 2.2rem;
      line-height: 2.2rem;
      position: absolute;
      margin-top: 0.3rem;
      display: inline-block;
      border-right: 1px solid #888;
    }
    .tab-link.router-link-active {
      color: #e95513;
    }
  }
</style>
