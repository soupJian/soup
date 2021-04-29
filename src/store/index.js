import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {}, // 用户信息
    fuser: JSON.parse(localStorage.getItem('fuser')) || {}, // 一对一聊天对象信息
    friends: JSON.parse(localStorage.getItem('friends')) || [] ,// 用户好友列表
    createGroup: JSON.parse(localStorage.getItem('creategroup')) || [], // 用户创建的群
    addgroup: JSON.parse(localStorage.getItem('addgroup')) || [], // 用户加入的群
  },
  mutations: {
    setUser(state,user){
      state.user = user
      if(user.id){
        localStorage.setItem('user',JSON.stringify(user))
      }else{
        localStorage.removeItem('user')
      }
    },
    setFuser(state,fuser){
      state.fuser = fuser
      if(fuser.id){
        localStorage.setItem('fuser',JSON.stringify(fuser))
      }else{
        localStorage.removeItem('fuser')
      }
    },
    setAddCroup(state,addgroup){
      state.addgroup = addgroup
      if(addgroup.length>0){
        localStorage.setItem('addgroup',JSON.stringify(addgroup))
      }else{
        localStorage.removeItem('addgroup')
      }
    },
    setCreateGroup(state,creategroup){
      state.creategroup = creategroup
      if(creategroup.length>0){
        localStorage.setItem('creategroup',JSON.stringify(creategroup))
      }else{
        localStorage.removeItem('creategroup')
      }
    },
    setFriends(state,friends){
      state.friends = friends
      if(friends.length>0){
        localStorage.setItem('friends',JSON.stringify(friends))
      }else{
        localStorage.removeItem('friends')
      }
    },
    resetVuex(state){
      state.user = {}
      state.fuser = {}
      state.friends = []
      state.createGroup = []
      state.addgroup = []
    }
  },
  actions: {
  },
  modules: {
  }
})
