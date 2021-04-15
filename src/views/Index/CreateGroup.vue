<template>
<div>
  <div class="header">
    <van-nav-bar
    title="创建群聊"
    left-text="返回"
    right-text="完成"
    left-arrow
    @click-left="back"
    @click-right="upload"
  />
  </div>
</div>
<van-form>
  <van-field name="uploader" label="群logo">
  <template #input>
    <van-uploader v-model="fileList"  deletable max-count="1"/>
  </template>
</van-field>
  <van-field
    v-model="groupname"
    name="groupname"
    label="群名"
    placeholder="请输入群名"
    :rules="[{ required: true, message: '请填写群名' }]"
  />
  <div class="description">
    <van-field
      v-model="description"
      rows="8"
      autosize
      label="群介绍"
      type="textarea"
      maxlength="200"
      placeholder="填写群介绍"
      show-word-limit
    />
  </div>
</van-form>
</template>
<script>
import {Toast} from 'vant'
import { computed, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router'
import {request} from '@/util/request.js'
import { useStore } from 'vuex';
export default {
  setup(){
    // 定义路由
    const router = useRouter()
    // vuex
    const store = useStore()
    const user = computed(()=>store.state.user)
    const state = reactive({
      fileList: [],
      groupname: '',
      description: ''
    })
    const back = ()=>{
      router.back()
    }
    const upload = async() =>{
      if(state.fileList.length == 0){
        Toast.fail({
          message: '请上传群logo',
          position: 'top',
        });
        return
      }
      else if(state.groupname == ''){
        Toast.fail({
          message: '请输入群名称',
          position: 'top',
        });
        return
      }else{
        const {data: result} = await request({
          methods: 'post',
          url: '/group/create',
          data:{
            user:user.value,
            nick: state.groupname,
            imgUrl: state.fileList[0].content,
            description: state.description
          }
        })
        Toast.success({
          message: result.msg,
          position: 'top',
        });
        router.back()
      }
    }
    return{
      ...toRefs(state),
      back,
      upload,
      
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  margin-bottom: 30px;
  :deep(.van-icon), :deep(.van-nav-bar__text){
          color: #000;
  }
}
.upload{
  display: flex;
  margin-top: 40px;
  justify-content: center;
}
.name{
  margin: 20px 0px;
}
</style>