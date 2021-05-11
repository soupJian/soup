<template>
<div class="qq">
  <m-header title="QQ"/>
  <img src="../../assets/img/qq.jpg" alt="">
</div>
</template>
<script>
import MHeader from "@/components/MHeader"
export default {
  components:{
    MHeader
  }
}
</script>
<style lang="less" scoped>
.qq{
  height: 100vh;
  overflow: hidden;
  img{
    width: 100%;
  }
}
</style>