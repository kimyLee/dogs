<template>
  <div class="">
    <p>1. 根据萌犬不同</p>
    <p></p>
    <p></p>
    <router-link class="tab-link" :to="{name: 'game'}">GO</router-link>
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
