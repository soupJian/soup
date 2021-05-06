<template>
  <van-nav-bar
    :title="fuser.nick"
    left-text="返回"
    left-arrow
    @click-left="back"
  />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="content" ref="content">
    <van-list
      v-model:loading="loading"
      @load="onLoad"
      :finished="finished"
    >
      <div class="item" v-for="item of chatArray" :key="item.time">
        <!-- 聊天对象 -->
        <div v-if="item.uid != user.id" class="fuser">
          <img :src="fuser.picUrl" class="picUrl" @click="toUser(fuser.id)">
          <div v-if="item.type == 0">
            <p v-html="item.msg" class="msg"></p>
          </div>
          <div v-if="item.type == 1">
            <img :src="item.msg" class="msgImg">
          </div>
        </div>
        <!-- 自己本人 -->
        <div v-else class="user">
          <div v-if="item.type == 0">
            <p v-html="item.msg" class="msg"></p>
          </div>
          <div v-if="item.type == 1">
            <img :src="item.msg" class="msgImg">
          </div>
          <img :src="user.picUrl" class="picUrl" @click="toUser(user.id)">
        </div>
      </div>
    </van-list>
  </van-pull-refresh>
  <div class="bottom-wrap">
    <div class="input-wrap">
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        maxlength="500"
        class="textarea"
        contenteditable
      />
      <van-button :color="message.length > 0 ? '#0089FF': '#7EC0F9'" 
        class="right-button" @click="socketPostOneChat">发送</van-button>
    </div>
    <div class="serve-wrap">
      <van-icon name="volume-o" class="left-icon" size="20" />
      <van-icon name="location-o" size="20"/>
      <van-icon name="envelop-o" size="20"/>
      <van-icon name="photo-o" size="20"/>
      <van-icon name="tv-o" size="20"/>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { computed, onMounted, reactive, toRefs,watch,ref} from 'vue'
import { useStore } from 'vuex'
import {request} from '@/util/request.js'
import $socket from '@/util/socket'

export default {
  setup(){
    const router = useRouter()
    const store = useStore()
    const content = ref(null)
    // 用户
    const user = computed(()=>store.state.user)
    // 聊天对象
    const fuser = computed(()=>store.state.fuser)
    const id = computed(()=>store.state.fuser.id)
    const state = reactive({
      message: '',
      loading: true,
      finished: false,
      refreshing: false,
      chatArray:[],
      timer: null
    })
    const back = () => {
      router.back()
    }
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
    const onRefresh = () => {
      state.loading = true;
      onLoad();
    };
    const toUser = (id)=>{
      router.push(`/user/${id}`)
    }
    // 用户向socket发送消息
    const socketPostOneChat = () =>{
      if(state.message == ''){
        return
      }
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
        msg: state.message
      })
      state.message = ''
    }
    // 用户接受socket消息
    const socketReceiveOneChat = ()=>{
      $socket.on('receiveOneChat',data=>{
        if(data.uid){
          state.chatArray.push({
            uid: data.uid,
            time: data.time,
            type: data.type,
            msg: data.msg
          })
        }else{
          state.chatArray.push({
            fid: data.fid,
            time: data.time,
            type: data.type,
            msg: data.msg
          })
        }
        scroll()
      })
    }
    const scroll = () =>{
      // window.screen.height 屏幕高度 130是头部导航栏和底部输入框区域
        const contentHeight = window.screen.height - 130 
        // 采用定时器0,解决输入后获取的还是上一个的高度
        setTimeout(()=>{
          // 滚动的高度
          if(content.value.$el.scrollHeight > contentHeight){
            content.value.$el.scrollTop =  content.value.$el.scrollHeight- contentHeight
          }
        },0)
    }
    onMounted(()=>{
      socketReceiveOneChat()
    })
    watch(id,()=>{
      state.chatArray = []
      if(id.value){
        onLoad()
      }
      state.loading = true
    })
    return {
      ...toRefs(state),
      user,
      fuser,
      id,
      back,
      onLoad,
      onRefresh,
      toUser,
      socketPostOneChat,
      content,
    }
  }
}
</script>
<style lang="less" scoped>
:deep(.van-icon), :deep(.van-nav-bar__text){
        color: #000;
      }
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
.item{
  margin-bottom: 10px;
  .fuser,.user{
    display: flex;
    .picUrl{
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .msg{
      padding: 5px 10px;
      line-height: 20px;
      border-radius: 5px;
      word-break:break-word;
    }
    .msgImg{
      max-width: 250px;
      margin-left: 10px;
    }
  }
  .fuser{
    justify-content: flex-start;
    padding-right: 40px;
    .msg{
      margin-left: 10px;
      background: #fff;
      color: #333;
    }
  }
  .user{
    justify-content: flex-end;
    padding-left: 40px;
    .msg{
      margin-right: 10px;
      background: #1989FA;
      color: #fff;
    }
  }
}
.bottom-wrap{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0;
  background: #EAEDF4;
  .input-wrap{
    display: flex;
    .right-button{
      align-self: flex-end;
    }
    .textarea{
      border-radius: 22px;
      margin-right: 10px;
    }
  }
  .serve-wrap{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
}
</style>