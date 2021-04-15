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
  <div class="item" v-for="item of userlist" :key="item.id">
    <div>
      <img :src="item.picUrl" alt="">
      <span v-html="item.nick"></span>
    </div>
    <button>
      {{type==0?'+好友':'+群聊'}}
    </button>
  </div>
</div>
<div class="list" v-show="type == 1">
  <van-empty image="search" description="暂无搜索结果" v-show="grouplist.length == 0" />
  <div class="item" v-for="item of grouplist" :key="item.id">
    <div>
      <img :src="item.picUrl" alt="">
      <span v-html="item.nick"></span>
    </div>
    <button>+关注</button>
  </div>
</div>
</template>
<script>
import { onActivated, reactive, toRefs,watch } from 'vue'
import { useRouter } from 'vue-router'
import {request} from '@/util/request.js'
export default {
  setup(){
    const router = useRouter()
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
            item.nick = item.nick.replace(state.value,'<font color="#409EFF">' + state.value + '</font>')
        })
      }else{
        state.grouplist = result.data
      }
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
    // watch
    watch(()=>state.value,()=>{
      state.userlist = []
      state.grouplist = []
      if(state.value == ''){
        return
      }else{
        clearTimeout(state.timer)
        setTimeout(()=>{
          search()
        },500)
      }
    })
    onActivated(()=>{
      state.value = '',
      state.type = 0,
      state.userlist = []
      state.grouplist = [],
      state.timer = null
    })
    return{
      ...toRefs(state),
      // methods
      back,
      search,
      onCancel,
      changeType
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
  .item{
    display: flex;
    align-items: center;
    padding: 10px 20px;
    justify-content: space-between;
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;
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
</style>