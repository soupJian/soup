<template>
  <div class="item" v-for="item of chatArray" :key="item.time">
    <!-- 聊天对象 -->
    <div v-if="item.id != user.id" class="fuser">
      <img :src="picUrl(item.id)" class="picUrl" @click="toUser(item.id)">
      <div v-if="item.type == 0">
        <p v-html="item.msg" class="msg"></p>
      </div>
      <div v-if="item.type == 1">
        <img :src="item.msg" class="msgImg">
      </div>
    </div>
    <!-- 自己本人 -->
    <div v-else class="user">
      <div v-if="item.type == 0">
        <p v-html="item.msg" class="msg"></p>
      </div>
      <div v-if="item.type == 1">
        <img :src="item.msg" class="msgImg">
      </div>
      <img :src="user.picUrl" class="picUrl" @click="toUser(user.id)">
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  props:['chatArray'],
  setup(){
    const router = useRouter()
    const store = useStore()
    // 用户
    const user = computed(()=>store.state.user)
    const back = () => {
      router.back()
    }
    // 用户头像
    const picUrl = (id) =>{
      return `http://175.24.116.96:3100/user/${id}/-----soupCover======/picUrl.jpg`
    }
    const toUser = (id)=>{
      router.push(`/user/${id}`)
    }

    return {
      user,
      back,
      picUrl,
      toUser,
    }
  }
}
</script>
<style lang="less" scoped>
.item{
  margin-bottom: 10px;
  .fuser,.user{
    display: flex;
    .picUrl{
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .msg{
      padding: 5px 10px;
      line-height: 20px;
      border-radius: 5px;
      word-break:break-word;
    }
    .msgImg{
      max-width: 250px;
      margin-left: 10px;
    }
  }
  .fuser{
    justify-content: flex-start;
    padding-right: 40px;
    .msg{
      margin-left: 10px;
      background: #fff;
      color: #333;
    }
  }
  .user{
    justify-content: flex-end;
    padding-left: 40px;
    .msg{
      margin-right: 10px;
      background: #1989FA;
      color: #fff;
    }
  }
}
</style>