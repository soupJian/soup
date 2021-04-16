<template>
  <van-search
  v-model="value"
  shape="round"
  placeholder="请输入搜索关键词"
/>
<van-empty description="功能暂未完善，开发中..." />
</template>
<script>
import { ref,reactive,toRefs } from 'vue';
import {request} from '@/util/request'
export default {
  setup() {
    const value = ref('');
    const state = reactive({
      historySearch:[]
    })
    // 历史搜索 五位搜索用户
    const getHistory = async() =>{
      const {data: result} = request({
        url:'/search/historySearch',
      })
      console.log(result);
    }
    return {
      ...toRefs(state),
      value,
      getHistory 
    };
  },
}
</script>