<template>
  <div class="reward">
     <p>1、"滕王阁幸福家"紫光礼盒1份</p>
     <p class="no-reward">还没获得奖品哦<br>多多努力赢取大奖吧</p>
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
  }
</style>
