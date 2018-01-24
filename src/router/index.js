import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import ruler from '@/components/rule/ruler'
import rank from '@/components/rule/rank'
import myreward from '@/components/rule/myreward'
import game from '@/views/game'

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
          path: 'ruler',
          component: ruler
        },
        {
          name: 'rank',
          path: 'rank',
          component: rank
        },
        {
          name: 'myreward',
          path: 'myreward',
          component: myreward
        }
      ]
    },
    {
      path: '/game',
      name: 'game',
      component: game
    }
  ]
})
