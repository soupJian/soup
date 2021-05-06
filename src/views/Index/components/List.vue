<template>
<div class="item-wrap">
  <van-swipe-cell v-for="item of newsList" :key='item.id'>
    <div class="item" @click="toUser(item)">
      <img :src="item.picUrl" alt="">
      <div class="des">
        <p style="margin-bottom: 5px">
          <span class="des-name">{{item.nick}}</span>
          <span class="des-time">{{item.time}}</span>
        </p>
        <p>
          <span class="des-description">{{item.msg}}</span>
          <span class="des-bradge" v-show="item.bradge > 0 && item.id != user.id">{{item.bradge}}</span>
        </p>
      </div>
    </div>
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" @click="handleDelete(item)"/>
    </template>
  </van-swipe-cell>
</div>
  <div >
   
  </div>
</template>
<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  props:{
    list: {
      type: Array,
      required: true
    }
  },
  emits: ['delete','readNews'],
  setup(props,ctx){
    const handleDelete = (item) =>{
      ctx.emit('delete',item)
    }
    const router = useRouter()
    const store = useStore()
    const user = computed(()=>store.state.user)
    const newsList = computed(()=>props.list)
    const toUser = (item)=>{
      store.commit("setFuser",item)
      ctx.emit('readNews',item)
      router.push(`/chatdetail/${item.id}`)
    }
    return{
      user,
      newsList,
      handleDelete,
      toUser
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/css/mixins.less';
.item-wrap{
  position: fixed;
  bottom: 50px;
  top: 100px;
  width: 100%;
  overflow: scroll;
}
.item{
  display: flex;
  padding: 10px 20px;
  align-items: center;
  img{
    width: 30px;
    height: 30px;
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