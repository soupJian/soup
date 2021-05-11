<template>
<van-search
  v-model="keyword"
  show-action
  shape="round"
  placeholder="请输入搜索关键词"
  @search="handleSearch"
  @cancel="handleCancel"
/>
<van-empty description="功能暂未完善，开发中..." />
</template>
<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
// import {request} from '@/util/request'
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      keyword: '' // 搜索关键字
    })
    const handleSearch = (val) =>{
      state.keyword = val
    }
    const handleCancel = () =>{
      router.back()
    }
    return {
      ...toRefs(state),
      handleSearch,
      handleCancel 
    };
  },
}
</script>