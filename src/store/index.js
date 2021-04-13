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
    }
  },
  actions: {
  },
  modules: {
  }
})
