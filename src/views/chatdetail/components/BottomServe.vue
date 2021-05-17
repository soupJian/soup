<template>
  <div class="bottom-wrap">
    <div class="input-wrap">
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        maxlength="500"
        class="textarea"
        contenteditable
        @focus="inputFocus"
      />
      <van-button :color="message.length > 0 ? '#0089FF': '#7EC0F9'" 
        class="right-button" @click="socketPostChat">发送</van-button>
    </div>
    <div class="serve-wrap">
      <van-icon name="volume-o" class="left-icon" size="20" />
      <van-icon name="location-o" size="20"/>
      <van-icon name="envelop-o" size="20"/>
      <van-uploader :after-read="upload" max-count="1">
        <van-icon name="photo-o" size="20" color="blue"/>
      </van-uploader>
      <van-icon name="tv-o" size="20"/>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import {request} from '@/util/request.js'
export default {
  emits:['socketPostChat','inputFocus'],
  setup(props,ctx){
    const message = ref('')
    const socketPostChat = ()=>{
      if(message.value.trim() == ''){
        return
      }
      ctx.emit('socketPostChat',message.value.trim(),0)
      message.value = ''
    }
    const upload = async (file) =>{
      const {data: result} = await request({
        methods: 'post',
        url: '/upload',
        data:{
          imgUrl: file.content,
        }
      })
      const message = result.picUrl
      ctx.emit('socketPostChat',message,1)
    }
    const inputFocus = ()=>{
      ctx.emit("inputFocus")
    }
    return {
      message,
      socketPostChat,
      upload,
      inputFocus
    }
  }
}
</script>
<style lang="less" scoped>
.bottom-wrap{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0;
  background: #EAEDF4;
  .input-wrap{
    display: flex;
    .right-button{
      align-self: flex-end;
    }
    .textarea{
      border-radius: 22px;
      margin-right: 10px;
    }
  }
  .serve-wrap{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>