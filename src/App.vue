<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="['login','register','change','forget']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import $socket from '@/util/socket'
import { useRouter } from 'vue-router'
export default {
  setup(){
    const store = useStore()
    const router = useRouter()
    const user = computed(()=>store.state.user)
    const creategroup = computed(()=>store.state.creategroup)
    const addgroup = computed(()=>store.state.addgroup)
    // 用户已经登陆过，下次进来自动进行socket连接
    onMounted(()=>{
      if(user.value.id){
        $socket.emit('online',user.value.id)
        if(creategroup.value.length > 0){
          creategroup.value.forEach(item => {
            $socket.emit('group',item.id)
          });
        }
        if(addgroup.value.length>0){
          addgroup.value.forEach(item => {
            $socket.emit('group',item.id)
          });
        }
        router.replace('/index')
      }
    })
  }
}
</script>
