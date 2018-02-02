<template>
  <div class="ruler-intro">
    <p>1、根据萌犬的不同颜色，一次选择对应颜色的福禄寿喜。</p>
    <p>2、选择匹配的正确颜色越多，分数越多，加油吧！</p>
    <p>3、单次8000分以上可获得一次抽奖机会，中奖后填写寄送信息，每人每天仅仅可抽奖2次，奖品丰厚，数量有限，加油冲分吧！</p>
    <p>4、活动结束后，将赠送全国排名前二十位，寄送丰厚礼品。<br>
    <span class="orange-text">第1名：红米手机 1台</span><br>
    <span class="orange-text">第2名：高档压杆箱 1个</span><br>
    <span class="orange-text">第3名：美的电压力锅 1套</span><br>
    <span class="orange-text">1~20名榜单奖：国味礼盒1份</span>
    </p>
    <p>活动时间：<br>
    <span class="orange-text">2018年2月5日—2月10日</span>
    </p>
    <p>本活动最终解释权归主办方所有。</p>
    <div class="start-panel">
      <router-link class="btn-link" :class="{'empty': $route.name !== 'game'}" :to="{name: $route.name}" @click.prevent.stop>返回</router-link>
      <router-link class="btn-link" v-show="$route.name !== 'game'" :to="{name: 'game'}" @click.prevent.stop><span style="">开始</span></router-link>
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
  .ruler-intro {
    text-align: left;
    font-size: 1.4rem;
    padding: 0 1.6rem;
    color: #444;
      overflow: auto;
    height: calc(100% - 10rem);
    .orange-text {
      color: #e95513;
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
