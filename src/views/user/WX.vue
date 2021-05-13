<template>
  <transition name="slide">
    <div class="wx">
      <m-header title="微信"/>
      <img src="../../assets/img/wx.png" alt="">
    </div>
  </transition>
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
.slide-enter-from,.slide-leave-to {
      transform: translateX(100%);
    }
.slide-enter-active,.slide-leave-active{
      transition: all 0.5s ease;
    }
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