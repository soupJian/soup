<template>
<van-nav-bar
    title="登录"
    left-text="返回"
    left-arrow
    @click-left="back"
  />
<div class="login">
  <div class="header">
    <img src="../../assets/img/logo.png" alt="">
    <span>soup</span>
  </div>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="name"
      label="账号"
      placeholder="soup号/手机号/邮箱"
      :rules="[{ required: true, message: '请输入soup号/手机号/邮箱' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
  <div class="action">
    <router-link to="/forget">忘记密码</router-link>
    <router-link to="/register">用户注册</router-link>
  </div>
</div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import {useRouter} from 'vue-router'
export default {
  setup(){
    // 定义user对象
    const user = reactive({
      username: '',
      password: ''
    })
    // 定义路由
    const router = useRouter()
    const onSubmit = (values) =>{
      console.log(values);
    }
    const back = () =>{
      router.back()
    }
    return{
      ...toRefs(user),
      onSubmit,
      back
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .van-icon, /deep/.van-nav-bar__text{
        color: #000;
      }
.login{
  margin-top: 25vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  .header{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    img{
      width: 50px;
    }
    span{
      margin-left: 1px;
      font-size: 50px;
      font-weight: bold;
    }
  }
  .action{
    position: fixed;
    bottom: 40px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>