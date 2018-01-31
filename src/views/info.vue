<template>
  <div class="info-page">
    <!-- 要保持背景图长宽比 -->
    <img class="bg-img" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/lotteryBg.jpg">
    <img class="logo-img" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/text.png">
    <img class="logo-bottom-img" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/logo2.png">
   <!--  <img class="bg-img" src="/luckydogs/static/img/lotteryBg.jpg">
    <img class="logo-img" src="/luckydogs/static/img/text.png">
    <img class="logo-bottom-img" src="/luckydogs/static/img/logo2.png"> -->
    <div class="input-panel">
        <span class="input-item"><span class="input-item-title">姓名</span><input type="text" /></span>
        <span class="input-item"><span class="input-item-title">电话</span><input type="text" /></span>
        <span class="input-item"><span class="input-item-title">地址</span><input type="text" /></span>
        <div style="text-align: center">
          <span class="submit-btn" @click.prevent="goback" style="margin-right: 2rem">返回</span>
          <span class="submit-btn" @click.prevent="subMit">提交</span>
        </div>
    </div>
    <!-- 保存成功弹窗 -->
    <!-- <div class="lottery-dialog" v-show="saveSuccess">
      <div class="dialog-box">
        <div style="text-align: center" v-show="result.reward === '谢谢参与'">
          <img class="not-reward" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/smile.png">
          <p class="reward-name-small" style="font-size: 1.8rem;">哎呀，与幸福擦肩而过<br>非常抱歉没有中奖<br>明天要继续加油哦！</p>
          <div class="operation">
            <span class="operation-btn" @click.prevent="$router.push({name: 'game'})">再来一局</span>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Qs from 'qs'
import axios from 'axios'
export default {
  name: 'info',
  data () {
    return {
      target: {},
      name: '',
      phone: '',
      address: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      let index = this.$route.query.index || ''
      let target = window.$rewards && window.$rewards[index - 0]
      if (target) {
        this.name = target.UserName || ''
        this.phone = target.UserPhone || ''
        this.address = target.UserAddress || ''
      }
      this.target = target || {}
      console.log(window.$rewards, this.target, 'test')
    })
  },
  methods: {
    goback () {
      window.history.go(-1)
    },
    subMit () {
      let params = Qs.stringify({
        UserName: this.name,
        UserPhone: this.phone,
        UserAddress: this.address,
        AwardId: this.target.AwardId
      })
      axios.post('/Index/SaveInfo', params, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
        .then((result) => {
          let res = result.data
          if (res.Code === 1) {
            let data = res.Data
            if (data.Statue) {
              this.$router.push({name: 'last'})
            } else {
              return Promise.reject(data.ErrorMsg)
            }
          } else {
            return Promise.reject(res)
          }
        })
        .catch((error) => {
          console.log(error)
          alert('已提交信息或未知错误')
        })
    }
  }
}
</script>

<style lang="scss">
  .info-page {
    width: 100%;
    height: 100%;
    background: #ff1457;
    .bg-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .logo-img {
      position: absolute;
      z-index: 2;
      top: 3rem;
      left: 29%;
      width: 42%;
    }
    .logo-bottom-img {
      position: absolute;
      z-index: 2;
      bottom: 3rem;
      left: 17%;
      width: 66%;
    }
    .input-panel {
      position: absolute;
      width: 100%;
      z-index: 10;
      padding: 0 3.6rem;
      top: 50%;
      transform: translateY(-50%);
      box-sizing: border-box;
    }
    .input-item {
      display: inline-block;
      width: 100%;
      height: 4rem;
      line-height: 4rem;
      margin-bottom: 3rem;
      background: #fffade;
      font-size: 1.8rem;
      padding: 0 0.8rem;
      box-sizing: border-box;
      .input-item-title {
        display: inline-block;
        //vertical-align: top;
        height: 100%;
        // line-height: 2.4rem;
      }
      input {
        vertical-align: top;
        font-size: 1.8rem;
        margin-left: 0.5rem;
        width: calc(100% - 6rem);
        display: inline-block;
        vertical-align: middle;
        // height: 3rem;
        // line-height: 3rem;
        overflow: hidden;
        background: none;
        outline: none;
        border: none;
        -webkit-tap-highlight-color: transparent;
      }
    }
    .submit-btn {
      margin-top: 3rem;
      text-align: center;
      display: inline-block;
      font-size: 1.8rem;
      width: 9rem;
      height: 3.2rem;
      line-height: 3.2rem;
      border: 1px solid #444;
      border-radius: 0.5rem;
      -webkit-tap-highlight-color: transparent;
    }
  }
</style>
