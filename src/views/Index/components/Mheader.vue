<template>
  <van-popup v-model:show="show" position="left" :style="{ height: '100%',width: '90%' }">
    <Setting/>
  </van-popup>
  <div class="title">
    <img :src="user.picUrl" @click="showPopup">
    <span>{{title}}</span>
    <van-icon name="plus" size="18" color="#fff"/>
  </div>
  <div class="search" @click="toSearch">
    <div class="input-wrap">
      <van-icon name="search" size="16"/>
      <span>搜索</span>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import Setting from  './Setting'
export default {
  components:{
    Setting
  },
  props:{
    title:{
      type: String,
      required: true
    }
  },
  setup(){
    const show = ref(false);
    // 定义路由
    const router = useRouter()
    // 定义vuex
    const store = useStore()
    const user = computed(()=>store.state.user)
    // methods
    const toSearch = () => {
      router.push('/search')
    }
    const showPopup = () => {
      show.value = true;
    };

    return{
      toSearch,
      show,
      showPopup,
      user
    }
  }
}
</script>
<style lang="less" scoped>
.title{
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1989FA;
  img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  span{
    font-size: 22px;
    color: #fff;
  }
}
.search{
  margin: 10px 10px;
  .input-wrap{
    width: 100%;
    height: 30px;
    border-radius: 15px;
    background: #F5F6FA;
    color: #B9BCC7;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      margin-left: 5px;
    }
  }
}
</style>