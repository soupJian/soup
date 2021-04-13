import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('../views/home/Index.vue')
  },
  {
    path: '/index',
    component: () => import('../views/Index/Index.vue'),
    children:[
      {
        path: '/index',
        redirect: '/chat'
      },
      {
        path: '/chat',
        component:() => import('../views/Index/Chat.vue'),
      },
      {
        path: '/friends',
        component:() => import('../views/Index/Friends.vue'),
      },
      {
        path: '/find',
        component:() => import('../views/Index/Find.vue'),
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component:() => import('../views/user/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component:() => import('../views/user/Register.vue')
  },
  {
    path: '/forget',
    name: 'forget',
    component:() => import('../views/user/Forget.vue')
  },
  {
    path: '/change',
    name: 'change',
    component:() => import('../views/user/Change.vue')
  },
  {
    path: '/search',
    component:() => import('../views/search/Index.vue')
  },
  {
    path: '/user',
    component:() => import('../views/user/User.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
