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
        name: 'chat',
        component:() => import('../views/Index/Chat.vue'),
      },
      {
        path: '/friends',
        name: 'friend',
        component:() => import('../views/Index/Friends.vue'),
      },
      {
        path: '/find',
        name: 'find',
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
    name: 'search',
    component:() => import('../views/search/Index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component:() => import('../views/user/User.vue'),
  },
  {
    path:'/searchAdd',
    name:'searchAdd',
    component: () => import('../views/search/SearchAdd.vue')
  },
  {
    path:'/createGroup',
    name:'createGroup',
    component: () => import('../views/Index/CreateGroup.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// router.beforeEach((to, from, next) => {
//   if (to.name != 'login' || to.name != 'forget' || to.name != 'register'){
//     const token = localStorage.getItem('token')
//     if(token){
//       next()
//     }else{
//       next({ name: 'login' })
//     }
//   } else{
//     next()
//   }
// })

export default router
