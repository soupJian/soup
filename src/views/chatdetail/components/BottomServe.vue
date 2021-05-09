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
      />
      <van-button :color="message.length > 0 ? '#0089FF': '#7EC0F9'" 
        class="right-button" @click="socketPostOneChat">发送</van-button>
    </div>
    <div class="serve-wrap">
      <van-icon name="volume-o" class="left-icon" size="20" />
      <van-icon name="location-o" size="20"/>
      <van-icon name="envelop-o" size="20"/>
      <van-icon name="photo-o" size="20"/>
      <van-icon name="tv-o" size="20"/>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup(props,ctx){
    const message = ref('')
    const socketPostOneChat = ()=>{
      ctx.emit('socketPostOneChat',message.value)
      message.value = ''
    }
    return {
      message,
      socketPostOneChat
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
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
}
</style>