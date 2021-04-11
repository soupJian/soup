<template>
  <van-index-bar :index-list="indexList">
  <van-index-anchor index="1">标题1</van-index-anchor>
  <div class='item'>
    <img src="../../assets/img/logo.jpg" alt="">
    <span>张三</span>
  </div>
  <van-index-anchor index="2">标题2</van-index-anchor>
  <div class='item'>
    <img src="../../assets/img/logo.jpg" alt="">
    <span>张三</span>
  </div><div class='item'>
    <img src="../../assets/img/logo.jpg" alt="">
    <span>张三</span>
  </div><div class='item'>
    <img src="../../assets/img/logo.jpg" alt="">
    <span>张三</span>
  </div><div class='item'>
    <img src="../../assets/img/logo.jpg" alt="">
    <span>张三</span>
  </div><div class='item'>
    <img src="../../assets/img/logo.jpg" alt="">
    <span>张三</span>
  </div><div class='item'>
    <img src="../../assets/img/logo.jpg" alt="">
    <span>张三</span>
  </div>
</van-index-bar>
</template>
<script>
export default {
   setup() {
      return {
        indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      };
  },
}
</script>
<style lang="less" scoped>
/deep/.van-index-anchor{
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