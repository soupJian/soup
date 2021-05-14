<template>
  <div class="img-wrap" :style="{'background': `url(${user.bgImg}) no-repeat`,'background-size': '100% 100%','background-position': 'center center'}">
    <div class="img-layout">
      <div class="back">
        <van-icon name="arrow-left" @click="back" size="20"/>
        <span>设置</span>
      </div>
      <img :src="user.picUrl" alt="">
      <p class="nick">{{user.nick}}</p>
      <p>
        <span>{{user.sex}}</span>
      <span v-if="user.age != ''">{{user.age}}岁</span>
      <span>{{user.address}}</span>
      </p>
    </div>
  </div>
  <div class="item">
    <p>
      <van-icon name="manager-o" size="20"/>
      <span>{{user.id}}</span>
    </p>
    <p>
      <van-icon name="label-o" size="20"/>
      <span>{{user.signature == '' ? '这家伙很懒什么也没有留下!': user.signature}}</span>
    </p>
    <p>
      <van-icon name="bulb-o" size="20"/>
      <span>soup空间</span>
    </p>
    <p>
      <van-icon name="chat-o" />
      <span>留言</span>
    </p>
  </div>
  <div class="button-wrap" v-if="show">
    <van-button plain type="primary" @click="addFriend">加好友</van-button>
    <van-button type="primary" @click="toChatDetail">发消息</van-button>
  </div>
  <div class="button-wrap" v-else>
    <van-button class="primaryButton" type="primary" @click="toChatDetail">发消息</van-button>
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import {request} from '@/util/request.js'
import { computed,onMounted,reactive,toRefs,watch } from 'vue'
import { useStore } from 'vuex'
import addFriends from '@/util/addfriend.js'
import {Toast} from 'vant'

export default {
  setup(){
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = computed(()=>route.params.id)
    const friends = computed(()=>store.state.friends)
    const user = computed(()=>store.state.user)
    const state = reactive({
      user: {},
      show: true
    })
    const getUserDetail = async()=>{
      const {data: result} = await request({
        url: '/users',
        methods:'get',
        params: {
          id:id.value
        },
      })
      state.user = result
      state.show = checkfriends()
    }
    const back = ()=>{
      router.back()
    }
    const checkfriends = ()=>{
      const index = friends.value.findIndex(item=>{
        return item.id == state.user.id
      })
      if(index >= 0){
        return false
      }else{
        return true
      }
    }
    const addFriend = async() =>{
      const {data: result} = await addFriends(state.user,user)
      store.commit('setFriends',result.data.friends)
      Toast.success('添加好友成功')
      state.show = checkfriends()
    }
    const toChatDetail = () =>{
      store.commit("setFuser",state.user)
      router.push(`/userChatDetail/${state.user.id}`)
    }
    watch(id,()=>{
      if(!id.value){
        return
      }
      getUserDetail()
    })
    onMounted(()=>{
      getUserDetail()
    })
    return{
      ...toRefs(state),
      back,
      addFriend,
      toChatDetail
    }
  }
}
</script>
<style lang="less" scoped>
.img-wrap{
  width: 100%;
  height: 200px;
  position: relative;
  .img-layout{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .back{
      position: fixed;
      top: 10px;
      left: 0;
      right: 0;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
    }
    img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .nick{
      font-size: 20px;
      margin: 10px 0;
    }
    p{
      span{
        margin: 0 5px;
      }
    }
  }
}
.item{
  padding: 10px 20px;
  p{
    height: 40px;
    display: flex;
    align-items: center;
    span{
      margin-left: 10px;
    }
  }
}
.button-wrap{
    position: absolute;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    button{
      width: 40%;
      &.primaryButton{
        width: 80%;
      }
    }
  }
</style>