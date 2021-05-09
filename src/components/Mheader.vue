<template>
  <van-nav-bar
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
    leftText:{
      type:String,
      default: '返回'
    }
  },
  setup(){
    console.log(123)
    const router = useRouter()
    const back = ()=>{
      router.back()
    }
    return {back}
  }
}
</script>
<style lang="less" scoped>
:deep(.van-icon), :deep(.van-nav-bar__text){
  color: #000;
}
</style>