<template>
  <div class="img-wrap" :style="{'background': `url(${user.bgImg}) center center` }">
    <div class="img-layout">
      <div class="back">
        <van-icon name="arrow-left" @click="back" size="20"/>
        <span>设置</span>
      </div>
      <img :src="user.picUrl" alt="">
      <p class="nick">{{user.nick}}</p>
      <p>
        <span>{{user.sex}}</span>
      <span>{{user.age}}岁</span>
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
      <span>{{user.signature}}</span>
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
  <div class="button-wrap">
    <van-button plain type="primary" @click="addFriend">加好友</van-button>
    <van-button type="primary">发消息</van-button>
  </div>
  <!-- <div class="button-wrap">
    <van-button type="primary">发消息</van-button>
  </div> -->
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import {request} from '@/util/request.js'
import { computed,onMounted,reactive,toRefs,watch } from 'vue'

export default {
  setup(){
    const route = useRoute()
    const router = useRouter()
    const id = computed(()=>route.params.id)
    const state = reactive({
      user: {}
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
    }
    const back = ()=>{
      router.back()
    }
    const addFriend = () =>{
      console.log(state.user);
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
      addFriend
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
    }
  }
</style>