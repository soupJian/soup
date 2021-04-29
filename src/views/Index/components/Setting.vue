<template>
  <div class="img-wrap" :style="{'background': `url(${user.bgImg}) no-repeat`,'background-size': '100% 100%','background-position': 'center center'}">
    <div class="layout">
      <span class="changeInfo" @click="changeInfo">编辑资料</span>
      <div class="info">
        <img :src="user.picUrl" alt="">
        <div class="info-des">
          <p>{{user.nick}}</p>
          <p>
            <van-icon name="label-o" size="12" style="margin-right: 5px"/>
            {{user.signature == '' ? '这家伙很懒，什么也没有留下！': user.signature}}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="item-wrap">
    <p>
      <van-icon name="vip-card-o" />
      <span>VIP服务</span>
    </p>
    <p>
      <van-icon name="cluster-o" />
      <span>soup空间</span>  
    </p>
    <p>
      <van-icon name="award-o" />
      <span>我的收藏</span>
    </p>
    <p>
      <van-icon name="photo-o" />
      <span>我的相册</span>
    </p>
    <p>
      <van-icon name="credit-pay" />
      <span>我的文件</span>
    </p>
    <p>
      <van-icon name="cash-on-deliver" />
      <span>我的钱包</span>
    </p>
  </div>
  <div class="quit">
    <van-button plain type="danger" size="large" @click="quit">退出登录</van-button>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import {useStore} from 'vuex'
import { Dialog } from 'vant';
import { computed, getCurrentInstance } from 'vue';
export default {
  setup(){
    const store = useStore()
    const user = computed(()=>store.state.user)
    const router = useRouter()
    const {ctx} = getCurrentInstance()
    const quit = () => {
      Dialog.confirm({
        message: '确认退出登录么',
      })
      // on confirm
      .then(() => {
          ctx.$socket.emit('outline',user.value.id)
          localStorage.clear()
          router.replace('/login')
          store.commit('resetVuex')
      })
    }
    const changeInfo = () => {
      router.push('/changeinfo')
    }
    return{
      user,
      quit,
      changeInfo
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/css/mixins.less';
.img-wrap{
  height: 162px;
  overflow: hidden;
  position: relative;
  .layout{
    position: absolute;
    background: rgba(0,0,0,.4);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .info{
      position: absolute;
      bottom: 10px;
      left: 0;
      display: flex;
      padding-left: 20px;
      box-sizing: border-box;
      width: 100%;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .info-des{
        flex: 1;
        padding-left: 10px;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        p{
          line-height: 20px;
          color: #fff;
          .ellipsis()
        }
      }
    }
    .changeInfo{
      position: absolute;
      right: 10px;
      top: 10px;
      color: #fff;
    }
  }
}
.item-wrap{
  padding: 20px 20px 0;
  p{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 16px;
    span{
      margin-left: 10px;
    }
  }
}
.quit{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
}

</style>