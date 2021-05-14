import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name:'home',
    component: () => import('../views/home/Index.vue')
  },
  {
    path: '/index',
    component: () => import('../views/Index/Index.vue'),
    children:[
      {
        path: '/index',
        redirect: '/newslist'
      },
      {
        path: '/newslist',
        name: 'newslist',
        component:() => import('../views/Index/NewsList.vue'),
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
    path: '/user/:id',
    name: 'user',
    component:() => import('../views/user/User.vue'),
  },
  {
    path: '/group/:id',
    name: 'group',
    component:() => import('../views/Index/GroupDetail.vue'),
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
  },
  {
    path:'/changeinfo',
    name:'changeinfo',
    component: () => import('../views/user/ChangeInfo.vue')
  },
  {
    path: '/userChatDetail/:id',
    name: 'userChatDetail',
    component:() =>import('../views/chatdetail/UserChat.vue')
  },
  {
    path: '/groupChatDetail/:id',
    name: 'groupChatDetail',
    component:() =>import('../views/chatdetail/UserChat.vue')
  },
  {
    path: '/cloud',
    name: 'cloud',
    component:() =>import('../views/cloud/Index.vue')
  },
  {
    path: '/qq',
    name: 'qq',
    component:() =>import('../views/user/QQ.vue')
  },
  {
    path: '/wx',
    name: 'wx',
    component:() =>import('../views/user/WX.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next) => {
  if ((to.path === '/login') || (to.path === '/register') || (to.path === '/') || (to.path === '/forget')) return next();
  //获取token
  const user = localStorage.getItem('user')
  //没有token，强制跳转登录页
  if(!user) return next('/')
  // 放行
  next()
})

export default router
