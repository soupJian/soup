<template>
<m-header :title="title"/>
<div class="login">
  <div class="header">
    <img src="../../assets/img/logo.jpg" alt="">
    <span>oup</span>
  </div>
  <van-form @submit="onSubmit">
    <van-field
      v-model="oldPassword"
      type="password"
      name="oldPassword"
      label="旧密码"
      placeholder="请输入旧密码"
      :rules="[{ required: true, message: '请输入旧密码' }]"
    />
    <van-field
      v-model="newPassword"
      type="password"
      name="newPassword"
      label="新密码"
      placeholder="请输入密码"
      :rules="[{ required: true, message: '请填输入新密码' }]"
    />
    <van-field
      v-model="repassword"
      type="password"
      name="repassword"
      label="确认密码"
      placeholder="请再次输入密码"
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
import { computed, reactive,ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import {Toast} from 'vant'
import {request} from '@/util/request.js'
import { useRouter } from 'vue-router'

export default {
  components:{
    MHeader
  },
  name:'change',
  setup(){
    const store = useStore()
    const router = useRouter()
    const title = ref("修改密码")
    // 定义user对象
    const user = reactive({
      oldPassword: '',
      newPassword: '',
      repassword: '',
      checkbox: false,
    })
    const obj = computed(()=>store.state.user)
    // 定义路由
    // 注册提交
    const onSubmit = async(values) =>{
      const {data: result} = await request({
        url: '/forget/pwd',
        methods:'post',
        data: {
          id: obj.value.id,
          oldPassword: values.oldPassword,
          password: values.newPassword
        },
      })
      Toast(result.msg)
      if(result.code == 200){
        router.back()
      }
    }
    const rePwdmessage = (value)=>{
      if(value != user.newPassword){
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