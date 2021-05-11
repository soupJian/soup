import {request} from './request'
 const addGroup = (group,user) =>{
   const result = request({
     url: '/group/add',
     methods: 'post',
     data: {
       user:{
         id: user.id,
         nick: user.nick,
         picUrl: user.picUrl
       },
       group:{
         id: group.id,
         nick: group.nick,
         picUrl: group.picUrl
       }
     }
   })
   return result
}
export default addGroup