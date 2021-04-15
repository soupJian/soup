import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {}, // 用户信息
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
    }
  },
  actions: {
  },
  modules: {
  }
})
