<template>
  <div class="item" v-for="(item,index) of chatArray" :key="item.time">
    <p class="time" v-if="showTime(index)">
      {{fmt(item.time)}}
    </p>
    <!-- 自己本人 -->
    <div v-if="item.id == user.id" class="user">
      <div v-if="item.type == 0" class="user-item">
        <span v-if="item.nick">{{item.nick}}</span>
        <p v-html="item.msg" class="msg"></p>
      </div>
      <div v-if="item.type == 1">
        <van-image lazy-load :src="item.msg" class="msgImg" @load="loadImg" />
      </div>
      <van-image lazy-load :src="user.picUrl" class="picUrl" @click="toUser(user)" />
    </div>
    <!-- 聊天对象 -->
    <div v-else class="fuser">
      <van-image lazy-load :src="picUrl(item)" class="picUrl" @click="toUser(item)" />
      <div v-if="item.type == 0" class="fuser-item">
        <span v-if="item.nick">{{item.nick}}</span>
        <p v-html="item.msg" class="msg"></p>
      </div>
      <div v-if="item.type == 1">
        <van-image lazy-load :src="item.msg" class="msgImg" @load="loadImg"/>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'
import fmt from '@/util/format'

export default {
  props:['chatArray'],
  emits:['loadImg'],
  setup(props,ctx){
    const router = useRouter()
    const store = useStore()
    const arr = computed(()=>props.chatArray)
    // 用户
    const user = computed(()=>store.state.user)
    const back = () => {
      router.back()
    }
    // 用户头像
    const picUrl = (item) =>{
      if(item.groupMsg == 0){
        return `http://175.24.116.96:3100/group/${item.id}/-----soupCoover======/picUrl.jpg`
      }else{
        return `http://175.24.116.96:3100/user/${item.id}/-----soupCover======/picUrl.jpg`
      }
    }
    const toUser = (item)=>{
      if(item.groupMsg == 0){
        return
      }else{
        router.push(`/user/${item.id}`)
      }
    }
    const showTime = (index) =>{
      if(index == 0){
        return true
      }else{
        if(arr.value[index].time - arr.value[index-1].time < 180000){
          return false
        }else{
          return true
        }
      }
    }
    const loadImg = () =>{
      ctx.emit('loadImg')
    }
    return {
      user,
      back,
      picUrl,
      toUser,
      fmt,
      showTime,
      loadImg
    }
  }
}
</script>
<style lang="less" scoped>
.item{
  margin-bottom: 10px;
  .time{
    text-align: center;
    font-size: 12px;
    margin: 5px 0;
  }
  .fuser,.user{
    display: flex;
    .picUrl{
      width: 30px;
      height: 30px;
      :deep(img){
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .msg{
      padding: 5px 10px;
      line-height: 20px;
      border-radius: 5px;
      word-break:break-word;
    }
    .msgImg{
      max-width: 250px;
      margin: 0 10px;
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
  .fuser-item,.user-item{
    display: flex;
    flex-direction: column;
  }
  .fuser-item{
    span{
      padding-left: 10px;
      margin-bottom: 5px;
      align-self: flex-start;
    }
  }
  .user-item{
    span{
      margin-bottom: 5px;
      padding-right: 10px;
      align-self: flex-end;
    }
  }
}
</style>