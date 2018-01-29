<template>
  <div class="reward">
     <p>1、"滕王阁幸福家"紫光礼盒1份</p>
     <p class="no-reward">还没获得奖品哦<br>多多努力赢取大奖吧</p>
      <div class="start-panel">
      <router-link class="btn-link empty" :to="{name: $route.name}" @click.prevent.stop>返回</router-link>
      <router-link class="btn-link" :to="{name: 'game'}" @click.prevent.stop><span style="">GO</span></router-link>
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
  .reward {
    text-align: left;
    font-size: 1.6rem;
    padding: 0 1.6rem;
    color: #444;
    // position: relative;
    .no-reward {
      width: 100%;
      left: 0;
      text-align: center;
      position: fixed;
      top: 40%;
    }
    // .start-panel {
    //   position: absolute;
    //   bottom: 4.6rem;
    //   left: 0;
    //   width: 100%;
    //   text-align: center;
    // }
    // .btn-link {
    //   display: inline-block;
    //   width: 8.7rem;
    //   height: 3.2rem;
    //   line-height: 3.2rem;
    //   background: #fc9808;
    //   border-radius: 0.7rem;
    //   text-decoration: none;
    //   color: #fff;
    //   // border: 2px;
    //   // font-weight: bold;
    //   font-size: 1.8rem;
    //   -webkit-tap-highlight-color: transparent;
    //   &.empty {
    //     border: 0.2rem solid #fc9808;
    //     width: 8.3rem;
    //     height: 2.8rem;
    //     line-height: 2.8rem;
    //     font-size: 1.8rem;
    //     background: none;
    //     color: #fc9808;
    //     margin-right: 2.8rem;
    //   }
    // }
  }
</style>
