<template>
  <div class="lottery-page">
    <!-- 要保持背景图长宽比 -->
    <img class="bg-img" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/lotteryBg.jpg">
    <img class="logo-img" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/text.png">
    <img class="logo-bottom-img" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/logo2.png">
    <!-- <img class="bg-img" src="/luckydogs/static/img/lotteryBg.jpg">
    <img class="logo-img" src="/luckydogs/static/img/text.png">
    <img class="logo-bottom-img" src="/luckydogs/static/img/logo2.png"> -->
    <!-- loterry-panel -->
    <div class="loterry-panel" v-show="!result">
      <div v-for="item in blocks" class="block-item" :key="item.index" :class="{'turn': item.turn, 'selected': item.selected}">
        <!-- 正面 -->
        <div class="front block-item-page"
            :class="{'click-btn': item.index === 9, 'active': activeIndex === item.index}">
            <div v-if="item.index === 9"
            class="block-reward-text"
            style="color: #fff;"
            @click.prevent="beginLoterry">立即抽奖</div>
            <!-- <div v-if="item.index === 9" class="block-text" @click.prevent="beginLoterry">
              <div class="block-text-top" style="height: 50%;">立即</div>
              <div class="block-text-bottom" style="height: 50%;">抽奖</div>
            </div> -->
        </div>
        <!-- 背面 -->
        <div class="back block-item-page">
          <div class="block-reward-text small-text" >
            {{item.reward.slice(0, 2)}}<br>{{item.reward.slice(2)}}
            <!-- <div class="block-text-top" style="height: 50%;">{{item.reward.slice(0, 2)}}</div>
            <div class="block-text-bottom" style="height: 50%;">{{item.reward.slice(2, 4)}}</div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="lottery-dialog" v-show="result">
      <div class="dialog-box">
        <!-- <div class="close"><span class="close-btn">×</span></div> -->
        <!-- 中奖 -->
        <div v-show="result.reward !== '谢谢参与'">
          <p class="reward-name">{{result.reward}}</p>
          <p class="reward-name-small">恭喜您获得“滕王阁幸福家”<br>{{result.reward}}一份</p>
          <div class="operation">
            <span class="operation-btn" @click.prevent="$router.replace({name: 'info'})">填写信息</span>
          </div>
        </div>
        <!-- 未中奖 -->
        <div style="text-align: center" v-show="result.reward === '谢谢参与'">
          <img class="not-reward" src="http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/smile.png">
          <p class="reward-name-small" style="font-size: 1.8rem;">哎呀，与幸福擦肩而过<br>非常抱歉没有中奖<br>明天要继续加油哦！</p>
          <div class="operation">
            <span class="operation-btn" style="margin-right: 1rem;"   @click.prevent="$router.push({name: 'home'})">返回首页</span>
            <span class="operation-btn" @click.prevent="$router.push({name: 'game'})">再来一局</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import Qs from 'qs'
import axios from 'axios'
import rule from '@/components/rule'
export default {
  name: 'lottery',
  data () {
    return {
      randomCode: '',
      isLotterying: false,
      score: '',
      result: '', // 获奖结果
      // 高档浴巾和精美雨伞是机动组
      blocks: [
        {index: 1, turn: false, reward: '吉品新年礼', selected: false},                    // 榜单
        {index: 2, turn: false, reward: '精美雨伞', selected: false},                // 榜单
        {index: 3, turn: false, reward: '瑞香新年礼', selected: false},                // 榜单
        {index: 8, turn: false, reward: '谢谢参与', selected: false},
        {index: 9, turn: false, reward: '立即抽奖', selected: false},
        {index: 4, turn: false, reward: '紫光新年礼', selected: false},                // 榜单
        {index: 7, turn: false, reward: '谢谢参与', selected: false},
        {index: 6, turn: false, reward: '谢谢参与', selected: false},
        {index: 5, turn: false, reward: '浴巾', selected: false}
      ],
      speed: 100,
      decayIndex: 0,
      activeIndex: -1,
      speedState: 'start',
      drawTimer: '',

      prizesCount: 8, // 奖项
      isDrawing: false, // 是否未开始延时，正在抽奖
      startDrawIndex: 1, // 开始抽奖的序号
      speedCtrlFn: '', // 速度回调控制函数
      decayDistance: 5, // 衰变距离
      wonIndex: 4 // 中奖奖块
    }
  },
  components: {
    rule
  },
  mounted () {
    this.$nextTick(() => {
      this.score = this.$route.query.score
    })
  },
  methods: {
    // 保存分数前先获取随机数密文传输
    getKeys () {
      return axios.post('/index/getcode')
        .then((result) => {
          let res = result.data
          this.randomCode = md5('MenggouPandora' + res)
        })
        .catch((error) => {
          console.log(error)
        })
      // console.log(md5('message'))
    },
    beginLoterry () {
      if (this.isLotterying) {
        return
      }
      this.isLotterying = true
      this.start()
      let fn = () => {
        let params = Qs.stringify({
          DrawType: 1,
          Score: this.score,
          sign: this.randomCode
        })
        axios.post('/Index/GetDraw', params, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
          .then((result) => {
            let res = result.data
            if (res.Code === 1) {
              let data = res.Data
              if (data.IsWin) {
                if (!window.$rewards) {
                  window.$rewards = []
                }
                window.$rewards.push(data.AwardRecord)
                let reward = data.AwardRecord
                // 找到抽中奖品
                if (reward.AwardId >= 6) {
                  // this.blocks[7].reward = reward.AwardName
                  setTimeout(() => {
                    this.wonIndex = 8
                    this.stop()
                  }, 2000)
                } else {
                  setTimeout(() => {
                    this.wonIndex = reward.AwardId || 8
                    this.stop()
                  }, 2000)
                }
                // this.blocks[1].reward = data.AwardRecord.AwardName.slice(0, 4)
                // setTimeout(() => {
                //   this.wonIndex = 2
                //   this.stop()
                // }, 2000)
              } else {
                setTimeout(() => {
                  // sets: 对应谢谢参与在数组的下标
                  let sets = [3, 6, 7]
                  let index = (Math.random() * 3) << 0
                  this.wonIndex = this.blocks[sets[index]].index
                  this.stop()
                }, 2000)
              }
            } else {
              return Promise.reject(res)
            }
          })
          .catch((error) => {
            console.log(error)
            setTimeout(() => {
              // sets: 对应谢谢参与在数组的下标
              let sets = [3, 6, 7]
              let index = (Math.random() * 3) << 0
              this.wonIndex = this.blocks[sets[index]].index
              this.stop()
            }, 2000)
          })
      }
      this.getKeys()
        .then(() => {
          fn()
        })
        .catch((error) => {
          console.log(error)
          fn()
        })
    },
    begin () {
      this.start()
      setTimeout(() => {
        // console.log('finish!')
        // lottery.setWonIndex((Math.random() * 8+1)<<0)
        this.wonIndex = (Math.random() * 8 + 1) << 0
        this.stop()
      }, 2000)
    },
    stop () {
      this.isDrawing = false
    },
    start (speedCtrlFn) {
      let that = this
      // 速度控制函数  speedCtrlFn(this.speedState) ==> state = start | decay
      this.speedCtrlFn = speedCtrlFn || function (state) {
        let speed = that.speed
        switch (state) {
          case 'start':
            break
          case 'decay':
            let maxInterval = 400
            speed = Math.min(speed + this.decayIndex * (maxInterval / this.decayDistance), 600)
            break
        }
        return speed
      }
      this.startDraw()
    },
    startDraw () {
      this.drawIndex = this.startDrawIndex
      this.isDrawing = true

      this.startIndex = 1
      this.speedState = 'start'

      this.drawing(() => {
        this.startIndex++
        if (this.isDrawing) {
          return true
        } else {
          // 停止抽奖流程了~应该从 drawIndex --> wonIndex
          // 理论应该有一个衰变操作
          this.decay()
          return false
        }
      })
    },
    drawingCallback (index, Time) {
      this.activeIndex = index
      // console.log(index, Time)
    },
    drawing (shouldContinute, drawTime) {
      let self = this
      window.clearTimeout(self.drawTimer)
      let CostTime = drawTime || self.speedCtrlFn.call(this, this.speedState) || 200
      self.drawingCallback && self.drawingCallback(self.drawIndex, CostTime)

      if (shouldContinute && shouldContinute.call(self)) {
        self.drawTimer = window.setTimeout(() => {
          self.increaseDrawIndex()
          self.drawing(shouldContinute)
        }, CostTime)
      }
    },
    increaseDrawIndex () {
      this.drawIndex++
      if (this.drawIndex > this.prizesCount) {
        this.drawIndex = 1
      }
    },
    decay () {
      // 开始衰变的索引
      // 如果 decayDistance > prizesCount，则 decayDistance % prizesCount = 真正需要衰变的索引
      let decayIndex = this.wonIndex - (this.decayDistance % this.prizesCount)
      if (decayIndex <= 0) {
        decayIndex += this.prizesCount
      }

      // 一直 drawing，直到 drawIndex == decayIndex，则开始 decayDrawing
      this.drawing(() => {
        if (this.drawIndex === decayIndex) {
          this.decayDraw()
          return false
        }
        return true
      })
    },
    decayDraw () {
      // 当前开始衰变的索引
      this.decayIndex = 1
      this.speedState = 'decay'

      this.drawing(() => {
        this.decayIndex++
        if (this.decayIndex >= this.decayDistance && this.drawIndex === this.wonIndex) {
          // 执行最后的回掉函数
          this.wonCallback && this.wonCallback(this.wonIndex)
          return false
        }
        return true
      })
    },
    // 成功了
    wonCallback (index) {
      for (let i = this.blocks.length; i--;) {
        if (this.blocks[i].index === index) {
          this.blocks[i].turn = true
          this.blocks[i].selected = true
          setTimeout(() => {
            this.result = this.blocks[i]
          }, 2000)
          break
        }
      }
      setTimeout(() => {
        for (let i = this.blocks.length; i--;) {
          if (this.blocks[i].index !== 9 && this.blocks[i].index !== index) {
            this.blocks[i].turn = true
          }
        }
      }, 500)
    }
  }
}
</script>

<style lang="scss">
  .lottery-page {
    width: 100%;
    height: 100%;
    background: #ff1457;
    .lottery-dialog {
      z-index: 99;
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      padding: 0 3rem;
      box-sizing: border-box;
      font-size: 1.6rem;
      p {
        margin: 0;
        padding: 0;
      }
      .dialog-box {
        width: 100%;
        border-radius: 2rem;
        background: #fffade;
        padding: 1rem;
        box-sizing: border-box;
      }
      .close{
        overflow: hidden;
        // padding: 1rem;
        box-sizing: border-box;
      }
      .close-btn{
        display: inline-block;
        text-align: center;
        height: 2.4rem;
        line-height: 2.4rem;
        width: 2.4rem;
        float: right;
        font-size: 2.4rem;
      }
      .reward-name {
        text-align: center;
        font-size: 4rem;
        font-weight: bold;
        color: #960c1d;
      }
      .reward-name-small {
        text-align: center;
        font-size: 1.8rem;
        margin: 1rem 0;
      }
      .operation {
        text-align: center;
      }
      .operation-btn {
        margin: 2rem 0;
        display: inline-block;
        font-size: 1.8rem;
        width: 8rem;
        height: 2.6rem;
        line-height: 2.6rem;
        border: 1px solid #444;
        border-radius: 0.5rem;
        -webkit-tap-highlight-color: transparent;
      }
      .not-reward {
        display: inline-block;
        width: 5.7rem;
      }
    }
    // END dialog
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
    .block-text {
      position: absolute;
      width: 100%;
      text-align: center;
      font-size: 3.2rem;
      color: #fff;
      &::after {
        content: '';
        width: 0;
        height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .block-reward-text {
      position: absolute;
      width: 100%;
      text-align: center;
      line-height: 1;
      font-size: 3.2rem;
      color: #c79f62;
      top: 50%;
      transform: translateY(-50%);
    }
    .small-text {
      font-size: 2.4rem;
    }
    .block-text-top{
      position: relative;
      top: 2px;
    }
    .block-text-bottom {
      position: relative;
      top: -2px;
    }
    .block-item {
      position: relative;
      width: 31%;
      padding-bottom: 31%;
      border-radius: 3%;
      float: left;
      margin: 1%;
      .active {
        // background: url(~@/assets/img/horse_active.jpg);
        background: url(http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/horse_active.jpg);
        background-size: 100%;
      }
      .click-btn {
        background: #ff0b57;
        span {
          position: absolute;
        }
      }
    }
    .front {
      position: absolute;
      width: 100%;
      height: 100%;
        // background: url(~@/assets/img/horse.jpg);
        background: url(http://pandora-project.oss-cn-shenzhen.aliyuncs.com/AdorableDog/static/img/horse.jpg);
        background-size: 100%;
        transform: rotateY(0);
        backface-visibility: hidden;
        transition: transform .4s ease-in-out;
        -webkit-tap-highlight-color: transparent;
      }
    .turn .front{
      transform: rotateY(180deg);
    }
    .back {
      position: absolute;
      width: 100%;
      height: 100%;
      background: #fff;
      transform: rotateY(180deg);
      backface-visibility: hidden;
      transition: transform .4s ease-in-out;
    }
    .turn .back{
      transform: rotateY(360deg);
    }
    .turn.selected .back{
      background: #ff0b57;
      .block-reward-text {
        color: #fff;
      }
    }
  }
</style>
