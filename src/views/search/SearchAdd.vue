<template>
<div class="search-wrap">
  <div class="back" @click="back">
    <van-icon name="arrow-left" size="30"/>
  </div>
  <form action="/">
    <van-search
      v-model="value"
      show-action
      placeholder="找人/群"
      @cancel="onCancel"
    />
  </form>
</div>
<div class="type">
  <button :class="type==0? 'active': ''" @click="changeType(0)">找人</button>
  <button :class="type==1? 'active': ''" @click="changeType(1)">找群</button>
</div>
<div class="list" v-show="type == 0">
  <van-empty image="search" description="暂无搜索结果" v-show="userlist.length == 0" />
  <div class="item-wrap" v-for="item of userlist" :key="item.id" @click="toUser(item.id)">
    <div class="item">
      <img :src="item.picUrl" alt="">
      <div>
        <p v-html="item.nickStr"></p>
        <p v-html="item.idStr"></p>
      </div>
    </div>
    <div v-if="!actionFriends(item)">
      <button @click.stop="addfriend(item)">+关注</button>
    </div>
  </div>
</div>
<div class="list" v-show="type == 1">
  <van-empty image="search" description="暂无搜索结果" v-show="grouplist.length == 0" />
  <div class="item-wrap" v-for="item of grouplist" :key="item.id" @click="toGroup(item)">
    <div class="item">
      <img :src="item.picUrl" alt="">
      <div>
        <p v-html="item.nickStr"></p>
        <p v-html="item.idStr"></p>
      </div>
    </div>
    <div v-if="!actionGroups(item)">
      <button @click.stop="joingroup(item)">+关注</button>
    </div>
  </div>
</div>
</template>
<script>
import { reactive, toRefs,watch,computed } from 'vue'
import { useRouter } from 'vue-router'
import {request} from '@/util/request.js'
import addFriends from '@/util/addfriend.js'
import addGroups from '@/util/addgroup.js'
import $socket from '@/util/socket'

import { useStore } from 'vuex'
import {Toast} from 'vant'

export default {
  setup(){
    const router = useRouter()
    const store = useStore()
    // 用户好友
    const friends = computed(()=>store.state.friends)
    // 用户创建的群
    const creategroup = computed(()=>store.state.creategroup)
    // 用户加入的群
    const addgroup = computed(()=>store.state.addgroup)
    const user = computed(()=>store.state.user)
    const state = reactive({
      value: '', // 搜索框的值
      type: 0, // 搜索类型，默认找人
      userlist: [], // 搜索出的用户列表
      grouplist: [], // 搜索出的群列表
      timer:null
    })
    // methods
    const back = () =>{
      router.back()
    }
    const search = async() =>{
      if(state.value == ''){
        return
      }
      const {data: result} = await request({
        methods: 'get',
        url: '/search',
        params:{
          keywords: state.value,
          type: state.type
        }
      })
      if(state.type == 0){
        state.userlist = result.data
        state.userlist.forEach(item=>{
            item.nickStr = item.nick.replace(state.value,'<font color="#409EFF">' + state.value + '</font>')
            item.idStr = `${item.id}`.replace(state.value,'<font color="#409EFF">' + state.value + '</font>')
        })
      }else{
        state.grouplist = result.data
        state.grouplist.forEach(item=>{
            item.nickStr = item.nick.replace(state.value,'<font color="#409EFF">' + state.value + '</font>')
            item.idStr = `${item.id}`.replace(state.value,'<font color="#409EFF">' + state.value + '</font>')
        })
      }
      clearTimeout(state.timer)
    }
    const onCancel = () =>{
      state.value = ''
    }
    const changeType = (num) =>{
      state.type = num
      if(state.type == 0 && state.userlist.length > 0){
        return
      }
      else if(state.type == 1 && state.grouplist.length > 0){
        return
      }
      search()
    }
    const toUser = (id) =>{
      router.push(`/user/${id}`)
    }
    const toGroup = (item) =>{
      if(!actionGroups(item)){
        Toast('您还没有加入该群哦，暂无权限!')
        return
      }
      router.push(`/group/${item.id}`)
    }
    const addfriend = async (item) =>{
      const {data: result} = await addFriends(item,user)
      store.commit('setFriends',result.data.friends)
      Toast.success('添加好友成功')
    }
    const actionFriends = (item) =>{
      const index = friends.value.findIndex(i=>{
        return i.id == item.id
      })
      if(index >= 0){ // 存在则表示已关注
        return true
      }else{ // 没有关注
        return false
      }
    }
    const joingroup = async(item) =>{
      const {data: result} = await addGroups(item,user.value)
      store.commit('setAddGroup',result)
      Toast.success('添加群聊成功')
      socketPostGroup(item)
      router.replace('/index')
    }
    const actionGroups = (item) =>{
      // 判断是否为用户创建的群
      let createIndex,addIndex
      if(creategroup.value.length > 0){
        createIndex = creategroup.value.findIndex(i=>{
          return i.id == item.id
        })
      }
      // 判断是否为用户加入的群
      if(addgroup.value.length > 0){
        addIndex = addgroup.value.findIndex(i=>{
          return i.id == item.id
        })
      }
      if(createIndex >= 0 || addIndex >= 0){
        return true
      }else{
        return false
      }
    }
    const socketPostGroup = (item) =>{
      $socket.emit('group',item.id)
      $socket.emit('postGroupChat',{
        user:{
          id: user.value.id,
          nick: user.value.nick,
          picUrl: user.value.picUrl
        },
        group:{
          id: item.id,
          nick: item.nick,
          picUrl: item.picUrl
        },
        type: 0,
        nick: item.nick,
        groupMsg: 0, // 是否为群发布消息 0 是 1 不是
        msg: `${user.value.nick}加入群聊，大家欢迎~~~撒花`
      })
    }
    // watch
    watch(()=>state.value,()=>{
      if(state.value == ''){
        return
      }else{
        clearTimeout(state.timer)
        setTimeout(()=>{
          search()
        },500)
      }
    })
    return{
      ...toRefs(state),
      // methods
      back,
      search,
      onCancel,
      changeType,
      toUser,
      toGroup,
      addfriend,
      joingroup,
      actionFriends,
      actionGroups,
    }
  }
}
</script>
<style lang="less" scoped>
.search-wrap{
  display: flex;
  align-items: center;
  form{
    flex: 1;
  }
}
.type{
  text-align: center;
  button{
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    &.active{
      background: #1989FA;
      color: #fff;
    }
  }
}
.list{
  .item-wrap{
    display: flex;
    align-items: center;
    padding: 10px 20px;
    justify-content: space-between;
    .item{
      display: flex;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 20px;
      }
      p{
        line-height: 20px;
      }
      button{
        width: 50px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #ccc;
        border-radius: 15px;
        font-size: 12px;
      }
    }
  }
}
</style>