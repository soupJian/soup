<template>
  <m-header :title="fuser.nick"/>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="content" ref="content">
    <van-list
      v-model:loading="loading"
      @load="onLoad"
      :finished="finished"
    >
      <chat-list :chatArray="chatArray"/>
    </van-list>
  </van-pull-refresh>
  <bottom-serve @socketPostOneChat="socketPostOneChat"/>
</template>
<script>
import MHeader from '@/components/MHeader'
import ChatList from './components/ChatList'
import BottomServe from './components/BottomServe'
import { computed, onMounted,onActivated, reactive, toRefs,watch,ref} from 'vue'
import { useStore } from 'vuex'
import {request} from '@/util/request.js'
import $socket from '@/util/socket'

export default {
  components:{
    MHeader,
    ChatList,
    BottomServe
  },
  setup(){
    const content = ref(null)
    const store = useStore()
    // 用户
    const user = computed(()=>store.state.user)
    // 聊天对象
    const fuser = computed(()=>store.state.fuser)
    const id = computed(()=>store.state.fuser.id)
    const state = reactive({
      chatArray:[],
      loading: true,
      finished: false,
      refreshing: false,
    })
    // 加载列表
    const onLoad = async() => {
      if (state.refreshing) {
        state.chatArray = [];
        state.refreshing = false;
      }
      const {data: result} = await request({
        methods: 'get',
        url: '/chat',
        params:{
          uid: user.value.id,
          fid: fuser.value.id
        }
      })
      state.chatArray = result
      state.loading = false;
      state.finished = true;
      scroll()
    };
    // 下拉刷新
    const onRefresh = () => {
      state.loading = true;
      onLoad();
    };
    // 滚动到底部
    const scroll = () =>{
      // window.screen.height 屏幕高度 130是头部导航栏和底部输入框区域
        const contentHeight = window.screen.height - 130 
        // 采用定时器0,解决输入后获取的还是上一个的高度
        setTimeout(()=>{
          // 滚动的高度 + 1000 是为了让滚动直接滚动到底部，模拟器正常，手机网页不正常
          if(content.value.$el.scrollHeight > contentHeight){
            content.value.$el.scrollTop =  content.value.$el.scrollHeight- contentHeight + 1000
          }
        },0)
    }
    // 用户向socket发送消息
    const socketPostOneChat = (message) =>{
      $socket.emit('postOneChat',{
        user:{
          id: user.value.id,
          nick: user.value.nick,
          picUrl: user.value.picUrl
        },
        fuser:{
          id: fuser.value.id,
          nick: fuser.value.nick,
          picUrl: fuser.value.picUrl
        },
        type: 0,
        msg: message
      })
    }
    // 用户接受socket消息
    const socketReceiveOneChat = ()=>{
      $socket.on('receiveOneChat',data=>{
          state.chatArray.push({
            id: data.id,
            time: data.time,
            type: data.type,
            msg: data.msg
          })
          scroll()
      })
    }
    onMounted(()=>{
      socketReceiveOneChat()
    })
    onActivated(()=>{
      scroll()
    })
    watch(id,()=>{
      state.chatArray = []
      state.loading = true
      state.finished=false
      state.refreshing=false
      if(id.value){
        onLoad()
      }
    })
    return {
      ...toRefs(state),
      content,
      fuser,
      socketPostOneChat,
      onLoad,
      onRefresh
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  padding: 10px;
  background: #EAEDF4;
  position: fixed;
  top: 46px;
  bottom: 84px;
  left: 0;
  right: 0;
  overflow: scroll;
}
</style>
