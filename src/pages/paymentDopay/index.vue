<template>
  <div class="zhifuzhong">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="支付中"
        @click-left="$router.go(-3)"
        left-arrow
      />
    </div>
    <div class="content" ref="doPay">
      调起支付页面。。
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import authorization from '@/common/authorization'
import settings from '@/settings';
import axios from 'axios';
import $plus from '@/common/plus'
import { log } from 'util';
export default {
  props:["query"],
  data () {
    return {
      
    }
  },
  created(){

  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
    ...mapState({
      phoneParams:"phoneParams"
    })
  },
  mounted() {
    console.log(this.query.order_id)
    //console.log(sessionid);
    
    $plus.plusReady(()=>{
      setTimeout(this.showView,400)
      // if(($plus.systemType()=='Android') && (this.query.payment_id == 2)){
      //   //app接口支付
      //   // this.appInterfacePayment()
      //   //let is_app = 1;//后台判断是否来自app
      //   let sessionid = authorization.getSessionid()
      //   plus.runtime.openURL(`${settings.defaultUrl}/payment/doPay/app_session_id/${sessionid}/payment_id/${this.query.payment_id}/order_id/${this.query.order_id}`)

         
      // }else{
      //   setTimeout(this.showView,400)
      // }
    })
    // this.axiosGet()
  },
  methods:{
    //app接口支付    
    // appInterfacePayment(){


    //   let successCallback = data =>{
    //     console.log(data)
    //   }
    //   let params = { 
    //     payment_id: 2,
    //     order_id: this.query.order_id
    //   }

    //   this.$store.dispatch({type:"appInterfacePayment",params,successCallback})


    // return false 



    //   let channel=null;

      

    //   var ALIPAYSERVER='http://demo.dcloud.net.cn/helloh5/payment/alipay.php?total=';
    //   var WXPAYSERVER='http://demo.dcloud.net.cn/helloh5/payment/wxpay.php?total=';
    //   // 2. 发起支付请求
    //   function pay(id){
    //       // 从服务器请求支付订单
    //       var PAYSERVER='';
    //       if(id=='alipay'){
    //           PAYSERVER=ALIPAYSERVER;
    //       }else if(id=='wxpay'){
    //           PAYSERVER=WXPAYSERVER;
    //       }else{
    //           plus.nativeUI.alert("不支持此支付通道！",null,"捐赠");
    //           return;
    //       }

    //       var xhr=new XMLHttpRequest();
          
    //       xhr.onreadystatechange=function(){
    //           switch(xhr.readyState){
    //               case 4:
    //                 if(xhr.status==200){
                        
    //                     plus.payment.request(channel,xhr.responseText,function(result){
    //                         plus.nativeUI.alert("支付成功！",function(){
    //                             back();
    //                         });
    //                     },function(error){
    //                         plus.nativeUI.alert("支付失败：" + error.code);
    //                     });
    //                 }else{
    //                     alert("获取订单信息失败！");
    //                 }
    //               break;
    //               default:
    //               break;
    //           }
    //       }
    //       xhr.open('GET',PAYSERVER);
    //       xhr.send();
    //   }

    //   // 1. 获取支付通道
    //   plus.payment.getChannels(function(channels){
    //       console.log('获取支付通道成功',JSON.stringify(channels))
    //       channel=channels[0]
    //       pay(channel.id)
    //   },function(e){
    //       alert("获取支付通道失败："+e.message)
    //   });




    // },






    //h5支付
    showView(){
      if(window.plus){
        let url='pay/index.html'
        let id = "zhifuzhong"
        //let id = ""
        let top = this.phoneParams.safeArea.top+46+'px'
        // let height = this.$refs.doPay.clientHeight + 'px'

        let sessionid = authorization.getSessionid()

        let additionalHttpHeaders={
          'SESSION-ID':sessionid,
          'Referer':settings.defaultUrl
        }
          
        let styles = {top,additionalHttpHeaders}

        let extras = {
          ...this.query,
          // postUrl:`${settings.defaultUrl}/payment/dopay/app_session_id/${sessionid}`,
          //getUrl:"www.baidu.com",
          getUrl:`${settings.defaultUrl}/payment/dopay/app_session_id/${sessionid}/payment_id/${this.query.payment_id}/order_id/${this.query.order_id}/is_app/1`,
          Referer:`www.huizhongtang.com://fromWX_orderno_${this.query.order_id}`
        }

        let w = plus.webview.create( url, id, styles, extras);
        //console.log(JSON.stringify(w))
        //plus.webview.open( url, id, styles, extras);
        w.show()//显示窗口
      }
    },

    axiosGet(){

      // axios.interceptors.request.use(
      //     config => {
      //       config.headers['Referer'] = `www.aifengji178.com://fromWX_orderno_${this.query.order_id}`
      //       return config;
      //     },
      //     err => {
      //         return Promise.reject(err);
      //     }
      // )

      let sessionid = authorization.getSessionid()
      let urlString = `${settings.defaultUrl}/payment/dopay/app_session_id/${sessionid}/payment_id/${this.query.payment_id}/order_id/${this.query.order_id}?is_app=1`
      axios.get(urlString, 
        {
          headers: {
            abcedfg:'99999'
          },
        }
      )
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err)
      })

    }
  },
  destroyed(){
    if(window.plus){
      plus.webview.close('zhifuzhong');
    }
  }
}
</script>

<style lang="scss" scoped>
.zhifuzhong{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #eeeeee;
}
.header{
  flex-shrink: 0;
  border-bottom: 1px solid #dcdee3;
  background: #fff;
}
.content{
  flex-grow:1;
  overflow-y: auto;
  text-align: center;
}
.bottom{
  flex-shrink: 0;
}
</style>
