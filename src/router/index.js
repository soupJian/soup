import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('../views/home/Index.vue')
  },
  {
    path: '/login',
    component:() => import('../views/user/Login.vue')
  },
  {
    path: '/register',
    component:() => import('../views/user/Register.vue')
  },
  {
    path: '/forget',
    component:() => import('../views/user/Forget.vue')
  },
  {
    path: '/change',
    component:() => import('../views/user/Change.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
