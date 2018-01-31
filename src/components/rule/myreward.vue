<template>
  <div class="reward">
     <p class="reward-item"
        v-for="(item, $index) in rewards"
        :key="item.AwardId">
        <span class="reward-info">{{$index + 1}}、{{item.AwardName}}</span>
        <span class="info-btn" @click="goInfo($index)">管理</span>
     </p>
     <p v-show="!rewards.length" class="no-reward">还没获得奖品哦<br>多多努力赢取大奖吧</p>
      <div class="start-panel">
      <router-link class="btn-link" :class="{'empty': $route.name !== 'game'}" :to="{name: $route.name}" @click.prevent.stop>返回</router-link>
      <router-link class="btn-link" v-show="$route.name !== 'game'" :to="{name: 'game'}" @click.prevent.stop><span style="">GO</span></router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      /* eslint-disable */
      rewards: [
        // {
        //   "AwardId": 3,
        //   "AwardName": "海洋王國萬聖節夜間門票8折",
        //   "AwardDesc": "",
        //   "AwardType": 2,
        //   "AwardImg": "中奖图片",
        //   "ChanceKey": "PAFIIFBJ1",
        //   "IsChange": false,
        //   "UserName": "",
        //   "UserPhone": "",
        //   "UserAddress": "",
        //   "IsGet": true
        // },
        // {
        //   "AwardId": 6,
        //   "AwardName": "海洋王國萬聖節夜間門票8折",
        //   "AwardDesc": "",
        //   "AwardType": 2,
        //   "AwardImg": "中奖图片",
        //   "ChanceKey": "PAFIIFBJ1",
        //   "IsChange": false,
        //   "UserName": "",
        //   "UserPhone": "",
        //   "UserAddress": "",
        //   "IsGet": true
        // }
      ]
    }
  },
  mounted () {
    this.getRewardInfo()
  },
  methods: {
    goInfo (index) {
      this.$router.push({name: 'info', query: {index}})
    },
    // 获取奖品信息
    getRewardInfo () {
      // window.$rewards = this.rewards
      console.log('success')
      axios.post('/Index/UserRecord')
        .then((result) => {
          let res = result.data
          if (res.Code === 1) {
            let data = res.Data
            window.$rewards = data.AwardRecord
            console.log(window.$rewards)
            this.rewards = data.AwardRecord
          } else {
            return Promise.reject(res)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
  .reward {
    text-align: left;
    font-size: 1.6rem;
    padding: 0 1.6rem;
    color: #444;
    .reward-item {
      font-size: 1.2rem;
      // padding-right: 5rem;
      box-sizing: border-box;
      overflow: hidden;
    }
    .reward-info {
      display: inline-block;
      width: calc(100% - 5rem);
      vertical-align: top;
      float: left;
      height: 2rem;
      line-height: 2rem;
    }
    .info-btn {
      display: inline-block;
      text-align: center;
      float: right;
      width: 4rem;
      color: #fff;
      height: 2rem;
      line-height: 2rem;
      background: #fc9808;
      border-radius: 0.7rem;
    }
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
