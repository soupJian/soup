<template>
  <div v-for="item of list" :key='item.id' class="item">
    <img :src="item.picUrl" alt="">
    <div class="des">
      <p>
        <span class="des-name">{{item.name}}</span>
        <span class="des-time">{{item.time}}</span>
      </p>
      <p>
        <span class="des-description">{{item.description}}</span>
        <span class="des-bradge" v-show="item.bradge">{{item.bradge}}</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    list: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/css/mixins.less';
.item{
  display: flex;
  padding: 10px 20px;
  img{
    width: 50px;
    border-radius: 50%;
  }
  .des{
    min-width: 0;
    flex: 1;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p{
      display: flex;
      justify-content: space-between;
      .des-name,.des-description{
        flex: 1;
        .ellipsis()
      }
      .des-name{
        font-size: 16px;
      }
      .des-description{
        font-size: 12px;
      }
      .des-bradge{
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: red;
        color: #fff;
        text-align: center;
        line-height: 15px;
      }
    }
  }
}
</style>