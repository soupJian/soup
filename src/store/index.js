import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{}, // 用户信息
  },
  mutations: {
    setUser(state,user){
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
