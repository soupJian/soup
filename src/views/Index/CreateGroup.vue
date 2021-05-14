<template>
<div>
  <div class="header">
    <m-header :right="flag" title="创建群聊" rightText="完成" @handleRight="rightHandle" />
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
import MHeader from '@/components/MHeader.vue'
import {Toast} from 'vant'
import { computed, reactive, toRefs,ref, onActivated } from 'vue';
import { useRouter } from 'vue-router'
import {request} from '@/util/request.js'
import { useStore } from 'vuex';
import $socket from '@/util/socket'

export default {
  components:{
    MHeader
  },
  setup(){
    // 定义路由
    const router = useRouter()
    const flag = ref(true)
    // vuex
    const store = useStore()
    const user = computed(()=>store.state.user)
    const creategroup = computed(()=>store.state.creategroup)
    const state = reactive({
      fileList: [],
      groupname: '',
      description: ''
    })
    const rightHandle = async() =>{
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
        store.commit('setCreateGroup',result.creategroup)
        socketPostGroup()
        Toast.success({
          message: result.msg,
          position: 'top',
        });
        router.back()
      }
    }
    const socketPostGroup = () =>{
      const group = creategroup.value[creategroup.value.length -1]
      $socket.emit('group',group.id)
      $socket.emit('postGroupChat',{
        user:{
          id: user.value.id,
          nick: user.value.nick,
          picUrl: user.value.picUrl
        },
        group:{
          id: group.id,
          nick: group.nick,
          picUrl: group.picUrl
        },
        nick: group.nick,
        nickStr: group.nick,
        type: 0,
        groupMsg: 0, // 是否为群发布消息 0 是 1 不是
        msg: '创建群聊成功，快去邀请小伙伴加入群聊吧'
      })
    }
    onActivated(()=>{
      state.fileList = []
      state.groupname = ''
      state.description = ''
    })
    return{
      ...toRefs(state),
      flag,
      rightHandle
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  margin-bottom: 30px;
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