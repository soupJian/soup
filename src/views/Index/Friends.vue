<template>
  <van-index-bar >
    <div v-for="item of friendsObj" :key="item[0]">
      <van-index-anchor :index="item[0]"/>
      <div class='item' v-for="list of item[1]" :key="list.id" @click="toUser(list.id)">
        <img :src="list.picUrl" alt="">
        <span>{{list.nick}}</span>
      </div>
    </div>
  </van-index-bar>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import pinyin from 'pinyin'
import { useRouter } from 'vue-router';
export default {
   setup() {
     const store = useStore()
     const router = useRouter()
     const friend = computed(()=>store.state.friends)
    // 创建排序好的数组
     const friendsObj = computed(()=> {
        //  获取所有的好友
        let arr = friend.value
        const list = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        arr.forEach( item =>{
          item.pinyin = pinyin(item.nick)[0][0] // 可以自行选择不同的生成拼音方案和风格。
          item.key = item.pinyin[0].toUpperCase()
          if(list.indexOf(item.pinyin[0]) == -1){
            item.pinyin = '#',
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
     const toUser = (id)=>{
       console.log(id);
       router.push(`/user/${id}`)
     }
      return {
        friendsObj,
        toUser
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