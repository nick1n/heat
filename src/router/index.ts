import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AIView from '../views/AIView.vue'
import KingAidView from '../views/KingAidView.vue'
import TicketView from '../views/TicketView.vue'
import MonsterView from '../views/MonsterView.vue'
import ShowdownView from '../views/ShowdownView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue')
    // },
    {
      path: '/ai',
      name: 'ai',
      component: AIView
    },
    {
      path: '/king',
      name: 'king',
      component: KingAidView
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: TicketView
    },
    {
      path: '/monster',
      name: 'monster',
      component: MonsterView
    },
    {
      path: '/showdown',
      name: 'showdown',
      component: ShowdownView
    }
  ]
})

export default router
