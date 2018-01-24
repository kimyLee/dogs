<template>
  <div class="rule">
    <div class="inner-box">
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
