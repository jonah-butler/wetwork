import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Terminal from '../views/Terminal.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Terminal
  },
  {
    path: '/epk',
    name: 'Epk',
     component: () => import(/* webpackChunkName: "about" */ '../views/EPK.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
