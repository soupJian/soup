<template>
  <transition name="slide">
    <div class="chat">
      <m-header v-if="flag" :title="chatObj.nick || ''" rightText="详情" :right="flag" @handleRight="handleRight"/>
      <m-header :title="chatObj.nick" v-else/>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="content" ref="content">
        <van-list
          v-model:loading="loading"
          @load="onLoad"
          :finished="finished"
        >
          <chat-list :chatArray="chatArray" @loadImg="loadImg"/>
        </van-list>
      </van-pull-refresh>
      <bottom-serve @socketPostChat="socketPostChat"/>
    </div>
  </transition>
</template>
<script>
import MHeader from '@/components/MHeader'
import ChatList from './components/ChatList'
import BottomServe from './components/BottomServe'
import { computed,onActivated, reactive, toRefs,watch,ref, nextTick} from 'vue'
import { useStore } from 'vuex'
import {request} from '@/util/request.js'
import $socket from '@/util/socket'
import { useRoute,useRouter } from 'vue-router'

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
    // 路由对象
    const route = useRoute()
    const router = useRouter()
    const name = ref(route.name)
    // 右上角是否展示
    const flag = computed(()=>{
      if(name.value == "userChatDetail"){
        return false
      }else{
        return true
      }
    })
    const chatObj = computed(()=>{
      if(name.value == "userChatDetail"){
        return store.state.fuser
      }else{
        return store.state.group
      }
    })
    // 请求路由
    const url = computed(()=>{
      if(name.value == "userChatDetail"){
        return '/chat/user'
      }else{
        return '/chat/group'
      }
    })
    // 请求参数
    const params = computed(()=>{
      if(name.value == "userChatDetail"){
        return {
          uid: user.value.id,
          fid: chatObj.value.id
        }
      }else{
        return {
          id: chatObj.value.id
        }
      }
    })
    const id = computed(()=>chatObj.value.id)
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
        url: url.value,
        params: params.value,
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
    const loadImg = ()=>{
      scroll()
    }
    // 滚动到底部
    const scroll = async() =>{
      await nextTick()
      // window.screen.height 屏幕高度 130是头部导航栏和底部输入框区域
        const contentHeight = window.screen.height - 140 
        // 滚动的高度 + 1000 是为了让滚动直接滚动到底部，模拟器正常，手机网页不正常
      if(content.value.$el.scrollHeight > contentHeight){
        content.value.$el.scrollTop =  content.value.$el.scrollHeight- contentHeight
      }
    }
    // 用户向socket发送消息
    const socketPostChat = (message,type) =>{
      if(url.value == '/chat/user'){
        $socket.emit('postOneChat',{
          user:{
            id: user.value.id,
            nick: user.value.nick,
            picUrl: user.value.picUrl
          },
          fuser:{
            id: chatObj.value.id,
            nick: chatObj.value.nick,
            picUrl: chatObj.value.picUrl
          },
          type,
          msg: message
        })
      }else{
        $socket.emit('postGroupChat',{
          user:{
            id: user.value.id,
            nick: user.value.nick,
            picUrl: user.value.picUrl
          },
          group:{
            id: chatObj.value.id,
            nick: chatObj.value.nick,
            picUrl: chatObj.value.picUrl
          },
          type,
          nick: user.value.nick,
          groupMsg: 1, // 是否为群发布消息 0 是 1 不是
          msg: message
        })
      }
    }
    // 用户接受socket消息
    const socketReceiveChat = ()=>{
      $socket.on('receiveChat',data=>{
        if(data.groupMsg == 0){
          state.chatArray.push({
            id: data.id,
            time: data.time,
            type: data.type,
            msg: data.msg,
            nick: data.nick,
            groupMsg: data.groupMsg
          })
        }else{
          state.chatArray.push({
            id: data.id,
            time: data.time,
            type: data.type,
            msg: data.msg
          })
        }
        scroll()
      })
    }
    // socket 自调用
    socketReceiveChat()
    const handleRight = () =>{
      router.push(`/group/${chatObj.value.id}`)
    }
    onActivated(()=>{
      name.value = route.name
      // scroll()
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
      flag,
      content,
      chatObj,
      socketPostChat,
      onLoad,
      loadImg,
      onRefresh,
      handleRight
    }
  }
}
</script>
<style lang="less" scoped>
.slide-enter-from,.slide-leave-to {
      transform: translateX(100%);
    }
.slide-enter-active,.slide-leave-active{
      transition: all 0.5s ease;
    }
.chat{
  position: fixed;
  top:0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.content{
  padding: 10px;
  background: #EAEDF4;
  position: fixed;
  top: 46px;
  bottom: 94px;
  left: 0;
  right: 0;
  overflow: scroll;
}
</style>
