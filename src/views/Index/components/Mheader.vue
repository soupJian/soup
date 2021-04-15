<template>
  <van-popup v-model:show="show" position="left" :style="{ height: '100%',width: '90%' }">
    <Setting/>
  </van-popup>
  <div class="title">
    <img :src="user.picUrl" @click="showPopup">
    <span>{{title}}</span>
    <van-icon name="plus" size="18" color="#fff" @click="toggleOption"/>
  </div>
  <div class="search" @click="toSearch">
    <div class="input-wrap">
      <van-icon name="search" size="16"/>
      <span>搜索</span>
    </div>
  </div>
  <div class="option-wrap" @click="toggleOption" v-show="showOption">
    <div class="triangle">
      <van-icon name="wap-home" color="#fff" size="20"/>
    </div>
    <div class="option">
      <ul>
        <li v-for='item of option' :key="item.value">
          <router-link :to="item.router">
            <van-icon :name="item.name" />
            <span>{{item.text}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import {computed, onActivated, ref} from 'vue'
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
    const showOption = ref(false)
    // 定义路由
    const router = useRouter()
    // 定义vuex
    const store = useStore()
    const user = computed(()=>store.state.user)
    const dropValue = ref('0')
    const option = [
      { text: '加朋友 / 群', value: 0 ,name: "add",router:'/searchAdd'},
      { text: '创建群聊', value: 1 ,name:'more',router:'/createGroup'},
    ];
    // methods
    const toSearch = () => {
      router.push('/search')
    }
    const showPopup = () => {
      show.value = true;
    };
    const toggleOption = () =>{
      showOption.value = !showOption.value
    }
    onActivated(()=>{
      show.value = false
    })
    return{
      // data
      user,
      show,
      dropValue,
      option,
      showOption,
      // methods
      toSearch,
      showPopup,
      toggleOption
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
.option-wrap{
  position: fixed;
  z-index: 2;
  top: 50px;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,.5); 
  .triangle{
    position: fixed;
    top: 50px;
    right: 10px;
  }  
  .option{
    position: fixed;
    top: 70px;
    right: 10px;
    background: #fff;
    ul{
      li{
        padding: 0 20px;
        line-height: 40px;
        display: flex;
        align-items: center;
        span{
          color: #000;
          font-size: 14px;
          margin-left: 5px;
        }
      }
    }
  }
}

</style>