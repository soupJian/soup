<template>
<div class="header">
  <van-nav-bar
    title="编辑资料"
    left-text="返回"
    right-text="保存"
    left-arrow
    @click-left="back"
    @click-right="save"

  />
</div>
<van-form>
<van-field
  v-model="user.id"
  label="账号"
  readonly
  input-align="right"
/>
<van-field
  v-model="user.nick"
  label="昵称"
  placeholder="请输入昵称"
  input-align="right"
/>
<van-field
  label="修改密码"
  input-align="right"
  @click="toChange"
/>
<van-field
  v-model="user.phoneNumber"
  label="手机号"
  placeholder="请输入手机号"
  input-align="right"
  :rules="[{validator: checkPhone }]"
/>
<van-field
  v-model="user.email"
  label="邮箱"
  placeholder="请绑定邮箱"
  :rules="[{validator: checkEmail }]"
  input-align="right"
/>
<van-field
  v-model="user.address"
  label="地址"
  placeholder="请输入地址"
  input-align="right"
/>
<van-field
  v-model="user.age"
  label="年龄"
  placeholder="请输入年龄"
  input-align="right"
/>
<van-field
  v-model="user.sex"
  readonly
  clickable
  label="性别"
  input-align="right"
  placeholder="选择性别"
  @click="showPicker = true"
/>
<van-popup v-model:show="showPicker" round position="bottom">
  <van-picker
    :columns="columns"
    @cancel="showPicker = false"
    @confirm="onConfirm"
  />
</van-popup>
<van-field
  v-model="user.signature"
  rows="2"
  autosize
  label=""
  type="textarea"
  maxlength="50"
  placeholder="请输入签名"
  show-word-limit
/>
<van-field label="头像" input-align="right" class="picUrl">
  <template #input>
    <van-uploader v-model="picUrlList" max-count="1"/>
  </template>
</van-field>
<van-field label="大图" input-align="right" class="bgImg">
  <template #input>
    <van-uploader v-model="bgImgList" max-count="1"/>
  </template>
</van-field>
</van-form>
  
</template>
<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {request} from '@/util/request.js'
import {Toast} from 'vant'
export default {
  setup(){
    const router = useRouter()
    const store = useStore()
    // user
    const user = ref(JSON.parse(JSON.stringify(store.state.user)))
    const userBase = ref(JSON.parse(JSON.stringify(store.state.user)))

    const columns = ['男','女'];
    const showPicker = ref(false)
    const picUrlList = ref([
      { url: user.value.picUrl },
    ])
    const bgImgList = ref([
      { url: user.value.bgImg },
    ])
    // 选择性别
    const onConfirm = (value) => {
      user.value.sex = value
      showPicker.value = false;
    };
    // 路由返回
    const back = () => {
      router.back()
    }
    const checkEmail = (value) =>{
      const emailReg = /^([a-zA-Z0-9]+[_|_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if(!emailReg.test(value)){
        return '请输入格式正确的邮箱'
      }else{
        return ''
      }
    }
    const checkPhone = (value) => {
      const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if(!phoneReg.test(value)){
        return '请输入格式正确的手机号'
      }else{
        return ''
      }
    }
    const toChange = () => {
      router.push('/change')
    }
    const save = async () =>{
      if(bgImgList.value.length > 0){
        user.value.bgImg = bgImgList.value[0].url || bgImgList.value[0].content
      }
      if(picUrlList.value.length > 0){
        user.value.picUrl = picUrlList.value[0].url || picUrlList.value[0].content
      }
      let data = {id: user.value.id}
      // 比较信息，判断哪些内容做出了改变
      for(let key in userBase.value){
        if(user.value[key] != userBase.value[key]){
          data[key] = user.value[key]
        }
      }
      const {data: result} = await request({
        url: '/changeinfo',
        methods:'post',
        data: {
          user: data
        },
      })
      if(result.code && result.code == 200){
        store.commit('setUser',result.user)
        Toast.success("信息保存成功")
        router.back()
      }else{
        Toast.fail(result.msg);
      }
    }
    return{
      // data
      columns,
      showPicker,
      onConfirm,
      user,
      bgImgList,
      picUrlList,
      // methods
      checkEmail,
      checkPhone,
      back,
      toChange,
      save
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  :deep(.van-icon), :deep(.van-nav-bar__text){
          color: #000;
        }
}
:deep(.van-cell){
  padding: 8px 16px;
}
:deep(.van-field__error-message){
  text-align: right;
}
.picUrl{
  :deep(.van-uploader__preview-image){
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
}
.bgImg{
  :deep(.van-uploader__preview-image){
    width: 150px;
  }
}
.picUrl,.bgImg{
  :deep(.van-uploader__upload){
    border-radius: 50%;
  }
  img{
    border-radius: 50%;
  }
}
</style>