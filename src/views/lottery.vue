<template>
  <div class="lottery-page">
    <!-- 要保持背景图长宽比 -->
    <img class="bg-img" src="~@/assets/img/last.jpg">
    <!-- loterry-panel -->
    <div class="loterry-panel">
      <div class="block-item"
        v-for="item in 9"
        :class="{'click-btn': item === 5} "
        :key="item"
      >
        <span v-if="item === 5">立即抽奖</span>
      </div>
    </div>
  </div>
</template>

<script>
import rule from '@/components/rule'
export default {
  name: 'app',
  data () {
    return {
      speed: 200,
      decayIndex: 0,
      activeIndex: 0
    }
  },
  components: {
    rule
  },
  mounted () {
  },
  methods: {
    start (speedCtrlFn){
      var that=this;
      // 速度控制函数  speedCtrlFn(this.speedState) ==> state = start | decay
      this.speedCtrlFn = speedCtrlFn || function(state) {
        let speed = that.speed
        switch (state) {
          case 'start':
            break
          case 'decay':
            let maxInterval = 400
            speed = Math.min(speed + this.decayIndex * (maxInterval / this.decayDistance), 600)
            break
        }
        return speed;
      };
      this.startDraw();
    },
    speedCtrlFn () {
    }
  }
}
</script>

<style lang="scss">
  .lottery-page {
    width: 100%;
    height: 100%;
    background: #ff1457;
    .bg-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .loterry-panel {
      position: absolute;
      z-index: 1;
      width: 100%;
      padding: 0 2rem;
      box-sizing: border-box;
      top: 50%;
      transform: translateY(-50%);
      // background: #fff;
      // display: flex;
      // flex-flow: row wrap;
      // justify-content: space-between;
    }
    .block-item {
      width: 31%;
      padding-bottom: 31%;
      background-color: #E78326;
      border-radius: 3%;
      float: left;
      margin: 1%;
      background: url(~@/assets/img/horse.jpg);
      background-size: 100%;
      &.active {
        background: url(~@/assets/img/horse_active.jpg);
        background-size: 100%;
      }
      &.click-btn {
        background: red;
        span {
          position: absolute;
        }
      }
    }
  }
</style>
