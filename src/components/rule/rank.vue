<template>
  <div class="rank-panel">
    <div class="my-rank">
      <div class="my-pic">
        <img :src="personInfo.pic">
      </div>
      <div class="my-info">
        <div class="my-info-name">{{personInfo.name}}</div>
        <div class="my-info-score">最好成绩&nbsp;<span class="orange-text">{{personInfo.bestScore}}</span></div>
        <div  class="my-info-score">全国排名&nbsp;<span class="orange-text">{{personInfo.rank}}</span></div>
      </div>
    </div>
    <!-- 排行榜 todo: 滚动 -->
    <div>
      <ul class="content">
          <li v-for="item in rankList" :key="item.Sort">
            <div class="ranking-section">
              <span class="rank">{{ item.Sort }}</span>
               <img :src="item.UserLogo" class="avatar" />
              <span class="name">{{ item.UserName }}</span>
              <span class="score">{{ item.score }}</span>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      personInfo: {
        pic: '/dogs/static/img/fu.png',
        name: '我可能是遗落地球的小仙女',
        bestScore: '100',
        rank: 30
      },
      rankList: [
        { Sort: 1, UserLogo: '/dogs/static/img/fu.png', UserName: '只想做安静的书呆子', score: 199 },
        { Sort: 2, UserLogo: '/dogs/static/img/xi.png', UserName: '我可能是遗落地球的小仙女', score: 198 },
        { Sort: 3, UserLogo: '/dogs/static/img/lu.png', UserName: '来呀被我伤害呀', score: 197 },
        { Sort: 4, UserLogo: '/dogs/static/img/shou.png', UserName: '小龙虾', score: 196 },
        { Sort: 5, UserLogo: '/dogs/static/img/fu.png', UserName: 'kimmy', score: 195 }
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .rank-panel {
    padding: 0 1.6rem;
    .my-rank {
      margin-top: 2rem;
      height: 8rem;
      padding-bottom: 2rem;
      background-image: linear-gradient(to right, #888 59%, rgba(255,255,255,0) 0%);
      background-position: bottom;
      background-size: 8px 1px;
      background-repeat: repeat-x;
    }
    .my-pic {
      display: inline-block;
      float: left;
      width: 8rem;
      img {
        width: 100%;
      }
    }
    .my-info {
      display: inline-block;
      float: left;
      margin-left: 1rem;
      margin-top: 0.3rem;
      text-align: left;
    }
    .my-info-name{
      font-size: 1.6rem;
      max-width: 16rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 2.8rem;
      line-height: 2.8rem;
      font-weight: bold;
    }
    .my-info-score {
      height: 2.3rem;
      line-height: 2.5rem;
      font-size: 1.4rem;
      font-weight: bold;
    }
    .orange-text {
      color: #e95513;
    }
    // 排行榜
    .content {
      text-align: left;
      color: #444;
      font-size: 1.6rem;
      padding: 0;
      margin: 0;
      li {
        display: block;
         background-image: linear-gradient(to right, #ccc 59%, rgba(255,255,255,0) 0%);
          background-position: bottom;
          background-size: 8px 1px;
          background-repeat: repeat-x;
      }
      .ranking-section {
        height: 5rem;
        line-height: 5rem;
         overflow: hidden;
        .rank {
          display: inline-block;
          vertical-align: top;
        }
        .avatar {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          display: inline-block;
          vertical-align: middle;
          margin-left: 1.5rem;
          position: relative;
          top: -0.2rem;
        }
        .name {
          display: inline-block;
          vertical-align: middle;
          margin-left: 1.5rem;
          max-width: 13rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .score {
          float: right;
        }
      }
    }
  }
</style>
