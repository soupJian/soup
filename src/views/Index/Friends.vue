<template>
<div class="friend-wrap">
  <van-collapse v-model="activeNames">
    <van-collapse-item title="我创建的群聊" name="1">
      <div class='item' v-for="item of creategroup" :key="item.id" @click="handleToGroup(item)">
        <img :src="item.picUrl" alt="">
        <span>{{item.nick}}</span>
      </div>
    </van-collapse-item>
    <van-collapse-item title="我加入的群聊" name="2">
      <div class='item' v-for="item of addgroup" :key="item.id" @click="handleToGroup(item)">
        <img :src="item.picUrl" alt="">
        <span>{{item.nick}}</span>
      </div>
    </van-collapse-item>
  </van-collapse>
  <van-index-bar >
    <div v-for="item of friendsObj" :key="item[0]">
      <van-index-anchor :index="item[0]"/>
      <div class='item' v-for="list of item[1]" :key="list.id" @click="handleToUser(list.id)">
        <img :src="list.picUrl" alt="">
        <span>{{list.nick}}</span>
      </div>
    </div>
  </van-index-bar>
</div>
</template>
<script>
import { computed,ref } from 'vue';
import { useStore } from 'vuex';
import pinyin from 'pinyin'
import { useRouter } from 'vue-router';
export default {
   setup() {
     const store = useStore()
     const router = useRouter()
     const friend = computed(()=>store.state.friends)
     const creategroup = computed(()=>store.state.creategroup)
     const addgroup = computed(()=>store.state.addgroup)
     const activeNames = ref(['0']);
    // 创建排序好的数组
     const friendsObj = computed(()=> {
        //  获取所有的好友
        let arr = friend.value
        let keyArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        arr.forEach( item =>{
          item.pinyin = pinyin(item.nick)[0][0]
          item.key = item.pinyin[0].toUpperCase()
          if(keyArr.indexOf(item.key) < 0){
            item.key = "#"
          }
        });
        // 按照首字母进行排序
        arr.sort((a,b)=>{
          return a.pinyin.localeCompare(b.pinyin);
        })
        // 实例化 map
        const obj = new Map()
          arr.forEach(item=>{
          obj.set(item.key,(obj.get(item.key) || []).concat(item))
        })
        return [...obj]
     })
     const handleToUser = (id)=>{
       router.push(`/user/${id}`)
     }
    //  进入群聊中心
     const handleToGroup = (item)=>{
        store.commit("setGroup",item)
        router.push(`/groupChatDetail/${item.id}`)
     }
      return {
        activeNames,
        creategroup,
        addgroup,
        friendsObj,
        handleToUser,
        handleToGroup
      };
  },
}
</script>
<style lang="less" scoped>
:deep(.van-index-anchor){
  background: #F5F6FA;
}
:deep(.van-cell){
  flex-direction: row-reverse;
}
:deep(.van-cell__right-icon){
  margin: 0 10px 0 0;
}
:deep(.van-collapse-item__content){
  padding: 0;
}
.friend-wrap{
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow: scroll;
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