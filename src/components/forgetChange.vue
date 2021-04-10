<template>
<van-nav-bar
    :title="title"
    left-text="返回"
    left-arrow
    @click-left="back"
  />
<div class="login">
  <div class="header">
    <img src="../assets/img/logo.png" alt="">
    <span>soup</span>
  </div>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="name"
      label="账号"
      placeholder="手机号/邮箱"
      :rules="[{ required: true, message: '请输入手机号/邮箱' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="新密码"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填输入密码' }]"
    />
    <van-field
      v-model="repassword"
      type="password"
      name="repassword"
      label="确认密码"
      placeholder="请再次输入密码"
      :rules="[{ required: true, message: '请再次输入密码' },{ validator: rePwdmessage }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        修改密码
      </van-button>
    </div>
  </van-form>
</div>
</template>
<script>
import { reactive,ref, toRefs } from 'vue'
import {useRouter} from 'vue-router'
export default {
  props:{
    title:{
      type: String,
      required: true
    }
  },
  setup(){
    // 定义user对象
    const user = reactive({
      username: '',
      password: '',
      repassword: '',
      checkbox: false,
    })
    const showAnimation = ref(false)
    const timer = ref(null)
    // 定义路由
    const router = useRouter()
    // 注册提交
    const onSubmit = (values) =>{
      if(!user.checkbox){
        showAnimation.value = !showAnimation.value
        clearTimeout(timer.value)
         timer.value = setTimeout(()=>{
          showAnimation.value = !showAnimation.value
        },1000)
      }else{
        console.log(values);
      }
    }
    const back = () =>{
      router.back()
    }
    const rePwdmessage = (value)=>{
      if(value != user.password){
        return '两次密码不一致，请重新输入'
      }
    }
    const toggleAgree = () =>{
      user.checkbox = !user.checkbox
    }
    return{
      showAnimation,
      ...toRefs(user),
      onSubmit,
      back,
      rePwdmessage,
      toggleAgree
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .van-icon, /deep/.van-nav-bar__text{
        color: #000;
      }
.login{
  margin-top: 15vh;
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
  .checkbox{
    margin: 10px 0;
  }
  .action{
    margin: 10px 0;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    label{
      display: flex;
      align-items: center;
      &.animation{
        animation: nodisAgree 2s linear;
      }
      .checkbox{
        width: 15px;
        height: 15px;
        border: 1px solid #000;
        border-radius: 50%;
        margin-right: 5px;
        &.active{
          border: 1px solid #1989FA;
          background: #1989FA;
        }
      }
    }
  }
}
@keyframes nodisAgree {
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1);
  }
  100%{
    transform: scale(0);
  }
}
</style>