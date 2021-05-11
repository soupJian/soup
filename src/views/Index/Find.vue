<template>
<div class="find">
  <div class="block" v-for="(list,index) of array" :key="index">
    <div v-if="list.type == 0">
      <div class='item' v-for="item of list.array" :key="item.id">
        <router-link :to="item.url">
          <img :src="item.imgUrl">
          <span>{{item.name}}</span>
        </router-link>
      </div>
    </div>
    <div v-if="list.type == 1">
      <div class='item' v-for="item of list.array" :key="item.id">
        <a :href="item.url" target="_blank">
          <img :src="item.imgUrl">
          <span>{{item.name}}</span>
        </a>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { onMounted, reactive, toRefs } from 'vue'
import {request} from '@/util/request.js'
export default {
  setup(){
    const state = reactive({
      array: []
    })
    const getFind = async() => {
      const {data: result} = await request({
        methods: 'get',
        url: '/find'
      })
      state.array = result.data
    }
    onMounted(()=>{
      getFind()
    })
    return {
      ...toRefs(state),
      getFind
    }
  }
}
</script>
<style lang="less" scoped>
.find{
  background: #F5F6FA;
}
.block{
  margin-bottom: 10px;
  .item{
    padding: 10px 20px;
    display: flex;
    align-items: center;
    background: #fff;
    img{
      width: 20px;
      height: 20px;
      border-radius: 5px;
    }
    span{
      margin-left: 20px;
      font-size: 18px;
    }
  }
}
</style>