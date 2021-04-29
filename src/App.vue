<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="['login','register','change','forget']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import $socket from '@/util/socket'
export default {
  setup(){
    const store = useStore()
    const user = store.state.user
    // 用户已经登陆过，下次进来自动进行socket连接
    if(user.id){
      onMounted(()=>{
        $socket.emit('online',user.id)
      })
    }
  }
}
</script>
