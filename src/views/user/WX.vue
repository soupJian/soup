<template>
<div class="wx">
  <m-header title="微信"/>
  <img src="../../assets/img/wx.png" alt="">
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
.wx{
  height: 100vh;
  overflow: hidden;
  img{
    width: 100%;
    margin-top: 50%vh;
    transform: translateY(25%);
  }
}
</style>