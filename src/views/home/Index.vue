<template>
  <div class="home">
    <div class="button-wrap">
      <van-button type="primary"  plain @click="toRegister">新用户</van-button>
      <van-button type="primary" @click="toLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'Home',
  setup(){
    const router = useRouter()
    const toLogin = () =>{
      router.push('/login')
    }
    const toRegister = () =>{
      router.push('/register')
    }
    return {
      toLogin,
      toRegister
    }
  }
}
</script>
<style lang="less" scoped>
.home{
  width: 100vw;
  height: 100vh;
  background: url('~@/assets/img/home.jpg') no-repeat;
  background-size: 100% 100%;
  position: relative;
  .button-wrap{
    position: absolute;
    bottom: 40px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    button{
      width: 40%;
    }
  }
}
</style>
