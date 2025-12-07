import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Terminal from '../views/Terminal.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Terminal,
    meta: {
      title: "wetwork",
    }
  },
  {
    path: '/epk',
    name: 'Epk',
    component: () => import(/* webpackChunkName: "about" */ '../views/EPK.vue'),
    meta: {
      title: "EPK"
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
})

export default router
