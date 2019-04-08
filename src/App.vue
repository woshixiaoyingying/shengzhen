<template>
  <div id="middlemain"
    :class="phoneParams.systemType==='Android'?{isandroid:true}:null"
    v-loading="middlemainLoading.loading"
    :element-loading-text="middlemainLoading.text" :style="{height:height+'px'}"
  >
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import $plus from '@/common/plus'
import { Dialog } from 'vant';
import authorization from '@/common/authorization'
import settings from '@/settings'

export default {
  data(){
    return {
      transitionName: 'jjj',
      height:""

    }
  },
  computed:{
    ...mapState({
      phoneParams:"phoneParams",
      middlemainLoading:"middlemainLoading",
    })
  },
  created(){
    //检测登录状态
    this.checkLoginStatus();
    this.height =document.body.offsetHeight;
  },
  watch: {
    //路由切换动效
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if(toDepth > fromDepth){
        this.transitionName = 'slide-right'
      }else if (toDepth < fromDepth) {
        this.transitionName = 'slide-left'
      }else{
        this.transitionName = 'jjj'
      }
    }
  },
  mounted() {
    $plus.plusReady(()=>{
      //使iphone输入框能够自动获取焦点
      $plus.inputAutofocus()
      plus.webview.currentWebview().setStyle({
          softinputMode: "adjustPan"  // 弹出软键盘时自动改变webview的高度
      });
      plus.screen.lockOrientation("portrait-primary")  //锁定竖屏
      plus.navigator.setStatusBarBackground('#a3935e') //设置状态栏背景色
      plus.navigator.setStatusBarStyle('dark') //状态栏字体颜色
      this.addEventListenerBackbutton()
      this.setPagePosition()
      this.scheme()
      this.prefetchURL()
    })

  },
  methods: {

    //预加载网络页面
    prefetchURL(){
      let urls = [
        `${settings.defaultUrl}/ucenter/extension?isApp=1`,
      ]
      plus.webview.prefetchURL(urls);
    },
    //超链接打开app

    scheme(){
      // 判断启动方式
      let checkArguments=()=>{
          // console.log("plus.runtime.launcher: "+plus.runtime.launcher);
          var args= plus.runtime.arguments;
          if(args){
              // 处理args参数，如打开新页面等
              // alert('app'+args)
            let orderNo = args.split('_')[2];
            if(orderNo)this.$router.replace(`/ucenter/orderdetail/${orderNo}`)
          }else{
            
          }
      }
      checkArguments()
      // 处理从后台恢复
      document.addEventListener('newintent',function(){
          checkArguments();
      },false);
    },

    // 监听“返回”按钮事件
    addEventListenerBackbutton() {
      plus.key.addEventListener("backbutton",()=>{
        if(this.$route.path.indexOf('win_a') !== -1 || this.$route.path.indexOf('login') !== -1){
          Dialog.confirm({title: '提示',message: '退出程序？'}).then(() => {plus.runtime.quit()}).catch(() => {});
        }else{
          this.$router.go(-1)
        }
      })
    },
    //设置页面周围padding和系统类型
    setPagePosition(){
      let safeArea=$plus.safeArea()
      let systemType=$plus.systemType()
      let content = {systemType,safeArea}
      this.$store.commit({type:'PHONECONFIG',content})
    },
    //检测登录状态
    checkLoginStatus(){
      if(!authorization.getSessionid()){
        return 
      }
      if(!authorization.getSecurityCookie()){
        return
      }
      if(authorization.checkLogonExpires()){
        this.$store.dispatch({type:"autoLogin"})
      }else{
        this.$message.error('登录状态已过期！');
      }
    }
  }
}
</script>
<style scoped src="@/huizhongtangWebStatic/css/base.css">

</style>
<style lang="scss" scoped>

#middlemain{
  width: 100%;
  height: 100%;
        position: fixed;
    top:0;
    left: 0;
}

</style>
<style lang="less" >
  @import './css/base.css';
  @import './font/iconfont.css';
  html{
    height: 100%;
    background-color: #fff;
    overflow: hidden;

  }
  body{
    height: 100%;
    font-size: 16px;
    margin: 0 auto;
    overflow: hidden;
  }
  #app{
    height: 100%;
    overflow: hidden;

  }



.slide-right-enter-active{
transition: all .4s;
position: absolute;
top:0;
left:0;
opacity: .8;
}
.slide-right-leave-active {
 transition: all .4s;
 position: absolute;
 top:0;
 left:0;
 opacity: .8;
}
.slide-right-enter{
top:0;
left:0;
 transition: all .4s;
 transform: translate3d(100%, 0, 0);
 opacity: .8;
}
.slide-right-leave-to {
top:0;
left:0;
 transition: all .4s;
 transform: translate3d(-100%, 0, 0);
 opacity: .8;
}
.slide-left-enter-active{
transition: all .4s;
position: absolute;
top:0;
left:0;
opacity: .8;
}
.slide-left-leave-active {
 transition: all .4s;
 position: absolute;
 top:0;
 left:0;
 opacity: .8;
}
.slide-left-enter{
top:0;
left:0;
 transition: all .4s;
 transform: translate3d(-100%, 0, 0);
 opacity: .8;
}
.slide-left-leave-to {
top:0;
left:0;
 transition: all .4s;
 transform: translate3d(100%, 0, 0);
 opacity: .8;
}

.el-loading-mask {
  background-color: rgba(255, 255, 255, 0)!important;
}
// 解决苹果手机div滚动问题的
div{
  -webkit-overflow-scrolling : touch;
}
.van-cell .iconfont{
  font-size: 18px!important;
}
.van-cell {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
}


</style>
