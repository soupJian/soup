<template>
  <transition name="slide">
    <div class="qq">
      <m-header title="QQ"/>
      <img src="../../assets/img/qq.jpg" alt="">
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
.qq{
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  img{
    width: 100%;
    align-items: center;
  }
}
</style>