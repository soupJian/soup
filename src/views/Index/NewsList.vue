<template>
  <List :list="list" @delete="handleDelete" @readNews="handleReadNews"></List>
</template>
<script>
import { computed, onMounted, reactive, toRefs, watch } from 'vue'
import List from './components/List'
import $socket from '@/util/socket'
import {request} from '@/util/request.js'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components:{
    List
  },
  setup(){
    const store = useStore()
    const route = useRoute()
    const user = computed(()=>store.state.user)
    // 利用id；来判断用户是否切换了账号
    const id = computed(()=>user.value.id)
    const state = reactive({
      list:[]
    })
    const handleDelete = async(item)=>{
      const index = state.list.findIndex(i=>{
        return i.id == item.id
      })
      state.list.splice(index,1)
      await request({
        methods: 'post',
        url: '/newsList',
        data:{
          id: user.value.id,
          list: JSON.stringify(state.list)
        }
      })
    }
    // 获取聊天列表
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
    // 点击表示已读，右侧小圆点消失
    const handleReadNews = async (item)=>{
      if(item.bradge == 0){
        return
      }
      const index  = state.list.findIndex(i=>{
        return i.id == item.id
      })
      state.list[index].bradge = 0
      await request({
        methods: 'post',
        url: '/newsList',
        data:{
          id: user.value.id,
          list: JSON.stringify(state.list)
        }
      })
    }
    // 接受socket消息
    const receiveNewsList = ()=>{
      $socket.on('receiveNewsList',async (data) =>{
        let bradge = 0
        const index = state.list.findIndex(item=>{
          return item.id == data.id
        })
        if(index >= 0){
          // 如果是自己发送的消息不需要展示右侧远点
          // 如果已经处于用户聊天界面，这里也不需要显示右侧圆点
          if(data.flag && route.path != `/userChatDetail/${data.id}` && route.path != `/groupChatDetail/${data.id}`){ 
            bradge = state.list[index].bradge + 1
          }
          state.list.splice(index,1)
        }else{
          bradge = 1
        }
        state.list.unshift({
          id: data.id,
          nick: data.nick,
          time: data.time,
          picUrl: data.picUrl,
          bradge,
          msg: data.msg,
          type: data.type
        })
        // 由于群聊消息无法进行逐个数据入库，所以需要在首页消息列表中进行数据入库
        if(data.type == 1){
          await request({
            methods: 'post',
            url: '/newsList',
            data:{
              id: user.value.id,
              list: JSON.stringify(state.list)
            }
          })
        }
      })
    }
    onMounted(()=>{
      getNewsList()
      receiveNewsList()
    })
    watch(id,()=>{
      if(id.value){
        getNewsList()
        receiveNewsList()
      }
    })
    return{
      ...toRefs(state),
      handleDelete,
      handleReadNews
    }
  }
}
</script>