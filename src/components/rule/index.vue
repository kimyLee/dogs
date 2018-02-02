<template>
  <div class="rule">
    <div class="inner-box">
      <!-- tab banner -->
      <div class="banner-title">
        <router-link class="tab-link" :to="{name: $route.name, query: {tab: 'ruler'}}"
        :class="{'active': $route.query && $route.query.tab === 'ruler'}">活动规则</router-link>
        <span class="slider"></span>
        <router-link class="tab-link" :to="{name: $route.name, query: {tab: 'rank'}}"
        :class="{'active': $route.query && $route.query.tab === 'rank'}">排行榜</router-link>
        <span class="slider"></span>
        <router-link class="tab-link" :to="{name: $route.name, query: {tab: 'myreward'}}"
        :class="{'active': $route.query && $route.query.tab === 'myreward'}">我的奖品</router-link>
        <!-- <router-view></router-view> -->
      </div>
      <component v-bind:is="currentView"></component>
    </div>
  </div>
</template>

<script>
import ruler from '@/components/rule/ruler'
import rank from '@/components/rule/rank'
import myreward from '@/components/rule/myreward'
export default {
  name: 'app',
  data () {
    return {
      currentView: 'ruler'
    }
  },
  watch: {
    $route () {
      if (this.$route.query.tab) {
        // console.log(this.currentView)
        this.currentView = this.$route.query.tab
      }
    }
  },
  components: {
    ruler,
    rank,
    myreward
  },
  mounted () {
    this.currentView = this.$route.query.tab
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
    z-index: 999;
    .inner-box {
      width: 100%;
      height: 100%;
      background: #fffade;
      border-radius: 2rem 2rem 0 0;
    }
    .banner-title {
      // padding: 1.6rem 0;
      padding-top: 1.6rem;
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
        -webkit-tap-highlight-color: transparent;
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
    .tab-link.active {
      color: #e95513;
    }

    .start-panel {
      position: absolute;
      bottom: 4.6rem;
      left: 0;
      width: 100%;
      text-align: center;
    }
    .btn-link {
      display: inline-block;
      width: 8.7rem;
      height: 3.2rem;
      line-height: 3.2rem;
      background: #fc9808;
      border-radius: 0.7rem;
      text-decoration: none;
      color: #fff;
      // border: 2px;
      // font-weight: bold;
      font-size: 1.8rem;
      -webkit-tap-highlight-color: transparent;
      &.empty {
        border: 0.2rem solid #fc9808;
        width: 8.3rem;
        height: 2.8rem;
        line-height: 2.8rem;
        font-size: 1.8rem;
        background: none;
        color: #fc9808;
        margin-right: 2.8rem;
      }
    }
    @media (max-width: 359px) {
      .banner-title {
        .tab-link {
          font-size: 1.6rem;
          margin: 0 0.8rem;
        }
      }
      .slider {
        height: 1.6rem;
        line-height: 1.6rem;
        margin-top: 0.2rem;
      }
    }
  }
</style>
