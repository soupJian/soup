<template>
  <van-nav-bar
    v-if="right"
    :title="title"
    :left-text="leftText"
    :right-text="rightText"
    left-arrow
    @click-right="handleRight"
    @click-left="back"
  />
  <van-nav-bar
    v-else
    :title="title"
    :left-text="leftText"
    left-arrow
    @click-left="back"
  />
  
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  props:{
    title:{
      type: String,
      required: true
    },
    left:{
      type:Boolean,
      default: true
    },
    right:{
      type:Boolean,
      default: false
    },
    leftText:{
      type:String,
      default: '返回'
    },
    rightText:{
      type:String
    }
  },
  emits:['handleRight'],
  setup(props,ctx){
    const router = useRouter()
    const back = ()=>{
      router.back()
    }
    const handleRight = () =>{
      ctx.emit('handleRight')
    }
    return {back,handleRight}
  }
}
</script>
<style lang="less" scoped>
:deep(.van-icon), :deep(.van-nav-bar__text){
  color: #000;
}
</style>