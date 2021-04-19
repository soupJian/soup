import {request} from './request'
 const addFriends = (item,user) =>{
   const result = request({
     url: '/friends',
     methods: 'post',
     data: {
       user: user.value,
       id: item.id,
       nick: item.nick,
       picUrl: item.picUrl
     }
   })
   return result
}
export default addFriends