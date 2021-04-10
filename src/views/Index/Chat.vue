<template>
  <List :list="list"></List>
</template>
<script>
import { reactive, toRefs } from 'vue'
import List from '@/components/List.vue'
export default {
  components:{
    List
  },
  setup(){
    const state = reactive({
      list:[
        {id:'001',name: '凌俊杰',time:"22:09","description":'最近还好吗?',picUrl:'https://p2.music.126.net/Ayo8yOb3OZZJ7V67DYg3NA==/109951165842000704.jpg'},
        {id:'002',name: '薛之谦',time:"22:09","description":'最近还好吗?吃了么？吃多少？干饭干饭，干饭人干饭魂',picUrl:'https://p2.music.126.net/1tSJODTpcbZvNTCdsn4RYA==/109951165034950656.jpg',bradge:1},
        {id:'003',name: '周深',time:"22:09","description":'最近还好吗?',picUrl:'https://p2.music.126.net/QEoBTZ2D2aAZG-QRvAeZ9w==/109951165830828173.jpg'},
        {id:'004',name: '某野鸡协会会长XXXXXXXXXXXXXXX',time:"2021-04-01","description":'最近还好吗?',picUrl:'https://p2.music.126.net/-vAAAt4wZ8bAJCkilZVbcQ==/109951163780408942.jpg'}
      ]
    })
    return{
      ...toRefs(state)
    }
  }
}
</script>