import moment from 'moment'
moment.locale('zh-cn'); // 默认的语言环境为英语。
const fmt = (time) =>{
  // 如果是今天
  if (new Date(time).toDateString() === new Date().toDateString()) {
    return moment(time).format('LT');
  }else{
    // 7天内
    const date = Date.now()
    // 时间差
    const difference = date - time
    if(difference < 604800000){
      return moment(time).format('dddd LT');
    }else{
      return moment(time).format('MMMM Do YYYY')
    }
  }
}
export default fmt