<template>
  <van-index-bar >
    <van-index-anchor index="A" />
    <div class='item'>
      <img src="../../assets/img/logo.jpg" alt="">
      <span>张三</span>
    </div>
    <van-index-anchor index="B" />
    <div class='item'>
      <img src="../../assets/img/logo.jpg" alt="">
      <span>张三</span>
    </div><van-index-anchor index="E" />
    <div class='item'>
      <img src="../../assets/img/logo.jpg" alt="">
      <span>张三</span>
    </div><van-index-anchor index="H" />
    <div class='item'>
      <img src="../../assets/img/logo.jpg" alt="">
      <span>张三</span>
    </div>
</van-index-bar>
</template>
<script>
import {request} from '@/util/request.js'
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
export default {
   setup() {
     const store = useStore()
     const user = computed(()=> store.state.user)
     const getFriends = async() =>{
       const {data: result} = await request({
        url: '/friends',
        methods:'get',
        params: {
          id: user.value.id
        },
      })
      console.log(result);
     }
     onMounted(()=>{
       getFriends()
     })
      return {
        
      };
  },
}
</script>
<style lang="less" scoped>
:deep(.van-index-anchor){
  background: #F5F6FA;
}
.item{
  padding: 10px;
  display: flex;
  align-items: center;
  img{
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }
  span{
    margin-left: 20px;
    font-size: 18px;
  }
}
</style>