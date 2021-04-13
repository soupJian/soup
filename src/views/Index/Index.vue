<template>
<m-header :title="title"></m-header>
<router-view></router-view>
<van-tabbar v-model="active" route>
  <van-tabbar-item name="chat" icon="chat" to="/chat">消息</van-tabbar-item>
  <van-tabbar-item name="friends" icon="friends" to="/friends">通讯录</van-tabbar-item>
  <van-tabbar-item name="find" icon="fire" to="/find">发现</van-tabbar-item>
</van-tabbar>
</template>
<script>
import { ref } from 'vue';
import MHeader from './components/Mheader'
export default {
  components:{
    MHeader
  },
  setup() {
    const title = ref('soup')
    const active = ref("chat");
    return {
      title, 
      active
     };
  },
}
</script>
<style lang="less" scoped>
.van-tabs{
  top: 0;
}
</style>