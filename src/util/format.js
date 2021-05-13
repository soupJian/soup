import moment from 'moment'
moment.locale('zh-cn'); // 默认的语言环境为英语。
const fmt = (time) =>{
  // 如果是今天
  if (new Date(time).toDateString() === new Date().toDateString()) {
    return moment(time).format('h:mm');  
  }else{
    // 7天内
    const date = Date.now()
    // 时间差
    const difference = date - time
    if(difference < 604800000){
      return moment(time).format('dddd h:mm');
    }else{
      console.log(time + '---' + date);
      console.log(difference);
      return moment().format('MMMM Do YYYY')
    }
  }
}
export default fmt