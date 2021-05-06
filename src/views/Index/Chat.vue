<template>
  <List :list="list" @delete="handleDelete"></List>
</template>
<script>
import { computed, onMounted, reactive, toRefs } from 'vue'
import List from './components/List'
import $socket from '@/util/socket'
import {request} from '@/util/request.js'
import { useStore } from 'vuex'

export default {
  components:{
    List
  },
  setup(){
    const store = useStore()
    const user = computed(()=>store.state.user)
    const state = reactive({
      list:[]
    })
    const handleDelete = (item)=>{
      console.log(item);
    }
    const getNewsList = async() =>{
      const {data: result} = await request({
        methods: 'get',
        url: '/newsList',
        params:{
          id: user.value.id
        }
      })
      state.list = result.data.list
    }
    const receiveNewsList = ()=>{
      $socket.on('receiveNewsList',data =>{
        let bradge = 0
        const index = state.list.findIndex(item=>{
          return item.id == data.id
        })
        if(index >= 0){
          bradge = state.list[index].bradge
          state.list.splice(index,1)
        }
        state.list.unshift({
          id: data.id,
          nick: data.nick,
          time: data.time,
          picUrl: data.picUrl,
          bradge: bradge + 1,
          msg: data.msg
        })
      })
    }
    onMounted(()=>{
      getNewsList()
      receiveNewsList()
    })
    return{
      ...toRefs(state),
      handleDelete
    }
  }
}
</script>