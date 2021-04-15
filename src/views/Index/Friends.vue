<template>
  <van-index-bar >
    <van-index-anchor index="A" />
    <div class='item'>
      <img src="../../assets/img/logo.jpg" alt="">
      <span>张三</span>
    </div>
</van-index-bar>
</template>
<script>
export default {
   setup() {
      return {
      };
  },
}
</script>
<style lang="less" scoped>
:deep(.van-index-anchor){
  background: #F5F6FA;
}
.item{
  padding: 10px;
  display: flex;
  align-items: center;
  img{
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }
  span{
    margin-left: 20px;
    font-size: 18px;
  }
}
</style>