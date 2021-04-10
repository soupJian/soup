<template>
  <div class="title">
    <img src="../../../assets/img/logo.jpg
    " alt="">
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
export default {
  props:{
    title:{
      type: String,
      required: true
    }
  },
  setup(){
    const router = useRouter()
    const toSearch = () => {
      router.push('/search')
    }
    return{
      toSearch
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