import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import ruler from '@/components/rule/ruler'
import rank from '@/components/rule/rank'
import myreward from '@/components/rule/myreward'
import game from '@/views/game'
import lottery from '@/views/lottery'
import info from '@/views/info'
import last from '@/views/last'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          name: 'ruler',
          path: 'home/ruler',
          component: ruler
        },
        {
          name: 'rank',
          path: 'home/rank',
          component: rank
        },
        {
          name: 'myreward',
          path: 'home/myreward',
          component: myreward
        }
      ]
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: lottery
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/last',
      name: 'last',
      component: last
    }
  ]
})
