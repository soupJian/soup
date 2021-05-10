<template>
<m-header :title="title"/>
<div class="login">
  <div class="header">
    <img src="../../assets/img/logo.jpg" alt="">
    <span>oup</span>
  </div>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="name"
      label="账号"
      placeholder="请输入手机号/邮箱"
      :rules="[{ required: true, message: '请输入手机号/邮箱' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="新密码"
      placeholder="请输入新密码"
      :rules="[{ required: true, message: '请输入密码' }]"
    />
    <van-field
      v-model="repassword"
      type="password"
      name="repassword"
      label="确认密码"
      placeholder="请再次输入新密码"
      :rules="[{ required: true, message: '请再次输入新密码' },{ validator: rePwdmessage }]"
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
import MHeader from '@/components/MHeader.vue'
import { reactive,ref, toRefs } from 'vue'
import {useRouter} from 'vue-router'
import {request} from '@/util/request.js'
import {Toast} from 'vant'
export default {
  name:'forget',
  components:{
    MHeader
  },
  setup(){
    const title = ref("忘记密码")
    // 定义user对象
    const user = reactive({
      username: '',
      password: '',
      repassword: '',
      checkbox: false,
    })
    // 定义路由
    const router = useRouter()
    // 注册提交
    const onSubmit = async(values) =>{
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
      });
      const {data: result} = await request({
        methods: 'post',
        url: '/forget',
        data:{
          name: values.name,
          password: values.password
        }
      })
      if(result.code == 200){
        Toast.clear()
        Toast.fail(result.data.msg);
      }
      Toast.clear()
      Toast.success("密码修改成功，请重新登录")
      router.replace('/login')
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
      title,
      ...toRefs(user),
      onSubmit,
      rePwdmessage,
      toggleAgree
    }
  }
}
</script>
<style lang="less" scoped>
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
}
</style>