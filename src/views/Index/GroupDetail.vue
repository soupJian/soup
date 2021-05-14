<template>
  <m-header title="群聊详情" :rightText="rightText" :right="flag" @handleRight="handleRight"/>
  <div class="group-wrap">
    <div class="groupinfo">
      <img :src="group.picUrl" alt="">
      <div class="right">
        <p>{{group.nick}}</p>
        <p class="time">创立于 {{moment(group.id).format('L')}}</p>
      </div>
    </div>
    <div class="des">
      <p>群介绍</p>
      <p class="description">{{group.description}}</p>
    </div>
      <div class="group-list">
        <van-swipe-cell v-for="(item,index) of list" :key="item.id">
          <div class="item" @click="toUser(item)">
            <img :src="item.picUrl" alt="">
            <span>{{item.nick}}</span>
          </div>
          <template #right v-if="index != 0">
            <van-button square type="primary" text="转让群主" />
            <van-button square text="移出删除" type="danger" class="delete-button" @click="handleDelete(item)"/>
          </template>
        </van-swipe-cell>
      </div>
  </div>
  <div class="button-wrap">
    <van-button type="primary" @click="handleToChat">发消息</van-button>
  </div>
</template>
<script>
import moment from 'moment'
import MHeader from '@/components/MHeader.vue'
import { useRoute, useRouter } from 'vue-router'
import {request} from '@/util/request.js'
import { ref,computed,onMounted,reactive,toRefs,watch } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'vant';

export default {
  components:{
    MHeader
  },
  setup(){
    const flag = ref(true)
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const id = computed(()=>route.params.id)
    const state = reactive({
      group: {}, // 群信息
      list: [], 
      rightText: '',
    })
    const user = computed(()=>store.state.user)
    const getGroupDetail = async()=>{
      const {data: result} = await request({
        url: '/group/detail',
        methods:'get',
        params: {
          id:id.value
        },
      })
      state.group = result.data.group,
      state.list = result.data.grouplist
      if(state.list[0].id == user.value.id){
        state.rightText = '删除群聊'
      }else{
        state.rightText = '退群'
      }
    }
    const addgroup = () =>{
      console.log(state.user);
    }
    const toChatDetail = () =>{
      store.commit("setGroup",state.group)
      router.push(`/groupChatDetail/${state.grpup.id}`)
    }
    const handleRight = ()=>{
      if(state.list[0].id == user.value.id){
        Dialog.confirm({
          message: '确认删除群聊么?',
        }).then(() => {
            console.log('123');
        })
      }else{
        Dialog.confirm({
          message: '退出群聊后，你将收不到该群的任何消息。',
        }).then(() => {
            console.log('123');
        })
      }
    }
    const toUser = (item) =>{
      router.push(`/user/${item.id}`)
    }
    const handleToChat = ()=>{
      store.commit('setGroup',state.group)
      router.replace(`/groupChatDetail/${state.group.id}`)
    }
    watch(id,()=>{
      if(!id.value){
        return
      }
      getGroupDetail()
    })
    onMounted(()=>{
      getGroupDetail()
    })
    return{
      ...toRefs(state),
      user,
      moment,
      flag,
      toUser,
      addgroup,
      toChatDetail,
      handleRight,
      handleToChat
    }
  }
}
</script>
<style lang="less" scoped>
.group-wrap{
  position: fixed;
  top: 46px;
  left: 0;
  bottom: 0;
  right: 0;
  background: #EAEDF4;
  padding-bottom: 54px;
}
.groupinfo{
  display: flex;
  padding: 5px 10px;
  background: #fff;
  margin-bottom: 10px;
  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .right{
    padding: 5px 0;
    margin-left: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    p{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &.time{
        color: #ccc;
        font-size: 12px;
      }
    }
  }
}
.des{
  padding: 5px;
  background: #fff;
  margin-bottom: 5px;
  width: 100%;
  .description{
    margin-top: 5px;
    word-break: break-all;
    line-height: 16px;
  }
}
.group-list{
  background: #fff;
  .item{
    padding:5px 10px;
    display: flex;
    align-items: center;
    img{
      width: 30px;
      height: 30px;
    }
    span{
      margin-left: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
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
      width: 80%;
    }
  }
</style>