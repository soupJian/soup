<template>
<van-nav-bar
    title="注册"
    left-text="返回"
    left-arrow
    @click-left="back"
  />
<div class="login">
  <div class="header">
    <img src="../../assets/img/logo.jpg" alt="">
    <span>oup</span>
  </div>
  <van-form @submit="onSubmit">
    <van-field
      v-model="nick"
      name="nick"
      label="昵称"
      placeholder="昵称"
      :rules="[{ required: true, message: '请输入您的昵称' }]"
    />
    <van-field
      v-model="account"
      name="account"
      label="账号"
      placeholder="手机号/邮箱"
      :rules="[{ required: true, message: '请输入手机号/邮箱' },{ validator: checkAccount }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
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
    <div class="action">
      <label @click="toggleAgree" :class="showAnimation ? 'animation': ''">
        <div :class="['checkbox',checkbox?'active':'']"></div>
          已阅读并同意<a href="/server.html" style="color: #1989FA;" @click.stop>服务协议</a>
      </label>
      <router-link to="/login">立即登录</router-link>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        立即注册
      </van-button>
    </div>
  </van-form>
</div>
</template>
<script>
import {Toast} from 'vant'
import { reactive,ref, toRefs } from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {request} from '@/util/request.js'
export default {
  name:'register',
  setup(){
    // 定义user对象
    const user = reactive({
      nick:'',
      account: '',
      password: '',
      repassword: '',
      checkbox: false,
    })
    const showAnimation = ref(false)
    const timer = ref(null)
    // 定义路由
    const router = useRouter()
    // 定义 vuex 对象
    const store = useStore()
    // 注册提交
    const onSubmit = async(values) =>{
      if(!user.checkbox){ // 判断用户是否统一条款
        showAnimation.value = !showAnimation.value
        clearTimeout(timer.value)
         timer.value = setTimeout(()=>{
          showAnimation.value = !showAnimation.value
        },1000)
      }else{
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
        const {data: result} = await request({
          methods: 'post',
          url: '/register',
          data:{
            nick: values.nick,
            account: values.account,
            password: values.password
          }
        })
        if(result.code && result.code == 200){
          store.commit('setUser',result.data.user)
          store.commit('setFriends',result.data.friends)
        }else{
          Toast.clear()
          Toast.fail(result.data.msg);
          return
        }
        Toast.clear()
        router.push('/index')
      }
    }
    // 路由返回
    const back = () =>{
      router.back()
    }
    // 检查手机号或者邮箱格式匹配
    const checkAccount = (value) =>{
      const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      const emailReg = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if(phoneReg.test(value) || emailReg.test(value)){
        return ''
      }else{
        return '手机号或者邮箱格式有误'
      }
    }
    // 检查两次密码是否一致
    const rePwdmessage = (value)=>{
      if(value != user.password){
        return '两次密码不一致，请重新输入'
      }
    }
    // 是与否同意条款
    const toggleAgree = () =>{
      user.checkbox = !user.checkbox
    }
    return{
      showAnimation,
      ...toRefs(user),
      onSubmit,
      back,
      checkAccount,
      rePwdmessage,
      toggleAgree
    }
  }
}
</script>
<style lang="less" scoped>
:deep(.van-icon),:deep(.van-nav-bar__text){
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