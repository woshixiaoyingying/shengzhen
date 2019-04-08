import authorization from '@/common/authorization'
import http from '@/common/http'
import settings from '@/settings'
import {dealElement} from '@/common/common'
import vm from '@/main';
import axios from 'axios'




let loading=content=>{
  if(content){
    vm.$store.commit({type:'MIDDLEMAINLOADING',content:{loading:true,text:content}})
  }else{
    vm.$store.commit({type:'MIDDLEMAINLOADING',content:{loading:false,text:'加载中'}})
  }
}



export default {

  //用户登录
  userLogin({commit},{params,loginCallback}){
     http.post(`${settings.defaultUrl}/simpleApi/login`,params)
     .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
        loginCallback(false)         
      }else{
        authorization.setSecurityCookie(res.data.message.securityCookie)
        
        // vm.$message({
        //   message: '登录成功！',
        //   type: 'success'
        // });
        loginCallback(true)  
      }
     })
  },

  //打开app自动登录
  autoLogin({commit},payload){
    let params = {securityCookie:authorization.getSecurityCookie()}
    http.post(`${settings.defaultUrl}/simpleApi/auto_login`,params)
     .then(res=>{
       
      if(res.data.error){
        vm.$message.error(res.data.message);
        // 清除登录信息
        authorization.clearLoginStatus()
        if(payload.from=='sessionidError'){
          vm.$router.replace('/login')
          return
        }
      }else{
        authorization.setSecurityCookie(res.data.message.securityCookie)
        // vm.$message({
        //   message: '登录成功！',
        //   type: 'success'
        // });
        if(payload.from=='sessionidError'){
          return
        }
        vm.$router.push('/')
      }
     
     })
  },


  //获取我的页信息
  getMinePageData({commit},{successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/index`)
    .then(res=>{
     if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
    
  },

  // 获取首页信息
  getHomePageData({commit},{successCallback}){
    http.get(`${settings.defaultUrl}/indexApi/index`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })

  },


  //获取首页热销商品
  getHomePageHotGoodsData({commit},{params,successCallback}){
     http.get(`${settings.defaultUrl}/goodsApi/index/sort/1`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //获取产品页数据
  getProductData({commit},{successCallback,params}){
    http.get(`${settings.defaultUrl}/goodsApi/product/id/${params.id}`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },
  //获取文章列表
  getArtList({commit},{successCallback,params}){
    http.get(`${settings.defaultUrl}/indexApi/notice/category_id/${params.category_id}`)
    .then(res =>{
      if(res.data.error){
        vm.$message.error(res.data.message)
      }else{
        successCallback(res.data.message)
      }
    })
  },
  //获取文章内容
  getArtContent({commit},{successCallback,params}){
    http.get(`${settings.defaultUrl}/indexApi/notice_content/id/${params.id}`)
    .then(res =>{
      if(res.data.error){
        vm.$message.error(res.data.message)
      }else{
        successCallback(res.data.message)
      }
    })
  },
  //获取收益页数据
  getprofitPageData({commit},{successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/income`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //添加商品到购物车
  addToShopCart({commit},{params,successCallback}){
     http.post(`${settings.defaultUrl}/indexApi/cart_add `,params)
     .then(res=>{

      if(res.data.error){
        vm.$message.error(res.data.message);
        
      }else{
        successCallback(res.data.message)
      }
     
     })
  },

  //获取购物车商品
  getShopCartData({commit},{successCallback}){
    http.get(`${settings.defaultUrl}/indexApi/cart_get`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //删除购物车商品
  delShopCartItem({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/indexApi/cart_del`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //修改购物车商品数量
  changeShopCartGoodsNum({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/indexApi/cart_num`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //获取结算页数据
  getSimpleOrderData({commit},{successCallback}){
    http.get(`${settings.defaultUrl}/simpleApi/order`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //提交订单
  simpleOrderAact({commit},{params,successCallback}){
    loading('正在提交')
    http.post(`${settings.defaultUrl}/simpleApi/order_act`,params)
    .then(res=>{
      loading()
      if(res.data.error){
        vm.$message.error(res.data.message.msg)
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //获取我的订单
  getUcenterOrder({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/order`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //确认收货
  confirmationOfReceipt({commit},{params,successCallback}){
     http.post(`${settings.defaultUrl}/ucenter/order_sign`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //加关注
  addAttention({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/indexApi/attention`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
        return
      }

      let {status}=res.data.message

      if(status==2){
        vm.$message({
          message: '取消关注成功！',
          type: 'success'
        });
        successCallback()
      } else if(status==1) {
        vm.$message({
          message: '成功关注了该商品！',
          type: 'success'
        });
        successCallback()
      }else{
        vm.$message.error('你还没有登录！');
      } 
      
    })

  },


  //获取关注商品列表
  getUcenterAttention({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/attention`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //获取团队会员
  getUcenterTeam({commit},{params,successCallback}){
     http.get(`${settings.defaultUrl}/ucenterApi/team`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },

  //获取安全中心配置
  getUcenterSafety({commit},{successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/safety`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        commit({type:"USERINFO",content:res.data.message.userInfo})
        successCallback(res.data.message)
      }
    })
  },

  //修改密码
  rePayPassword({commit},{params,successCallback}){
    params=dealElement(params)
    http.post(`${settings.defaultUrl}/ucenterApi/update_obj_act`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        vm.$message({
          message: '操作成功！',
          type: 'success'
        });
        successCallback()
      }
    })
  },

  //获取收货地址
  getUcenterAddress({commit}){
    http.get(`${settings.defaultUrl}/ucenterApi/address`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let content = res.data.message
        commit({type:'ADDRESSDATA',content})
      }
    })
  },

  //获取地区数据
  getAreaData({commit}){
    http.get(`${settings.defaultUrl}/ajaxApi/area_data`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let content = res.data.message
        commit({type:'AREADATA',content})
      }
    })
  },

  //添加和修改收货地址
  changeAddress({commit},{params,successCallback}){
    params=dealElement(params)
    http.post(`${settings.defaultUrl}/simpleApi/address_from_ucenter`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        vm.$message({
          message: '操作成功！',
          type: 'success'
        });
        successCallback()
      }
    })
  },

  //删除收货地址
  ucenterAddressDel({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/address_del/id/${params.id}`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        vm.$message({
          message,
          type: 'success'
        });
        successCallback(message)
        
      }
    })
  },

  //获取银行卡信息
  getUcenterBankData({commit},{params,successCallback}){
     http.get(`${settings.defaultUrl}/ucenterApi/bank`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //提交银行卡信息
  postUcenterBankData({commit},{params,successCallback}){
    params=dealElement(params)
    http.post(`${settings.defaultUrl}/ucenterApi/bank_save`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        vm.$message({
          message: '操作成功！',
          type: 'success'
        });
        successCallback()
      }
    })
  },

  //设置页数据
  getUcenterInfo({commit},{successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/info`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //‘设置’页的数据提交
  changeUcenterInfo({commit},{params,successCallback}){
    params=dealElement(params)
    http.post(`${settings.defaultUrl}/ucenterApi/info_save`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        vm.$message({
          message: '操作成功！',
          type: 'success'
        });
        successCallback()
      }
    })
  },


  //获取运费
  getFreight({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/simpleApi/fareCalculate`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  // 订单提交成功页面
  getsimpleOrderStatus({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/simpleApi/order_status/order_id/${params.order_id}`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  // //支付
  // postPaymentDoPay({commit},{params,successCallback}){
  //   params=dealElement(params)
  //   http.post(`${settings.defaultUrl}/payment/dopay`,params)
  //   .then(res=>{
  //     if(res.data.error){
  //       vm.$message.error(res.data.message);
  //     }else{
  //       vm.$message({
  //         message: '操作成功！',
  //         type: 'success'
  //       });
  //       successCallback()
  //     }
  //   })
  // }
  
  //获取订单详情
  ucenterOrderDetail({commit},{params,successCallback}){
     http.get(`${settings.defaultUrl}/ucenterApi/order_detail/id/${params.id}`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //获取分类产品列表
  getcateData({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/indexApi/category`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //获取商品评论
  getProductComment({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/indexApi/get_review`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //获取商品详细介绍
  getProductDiscription({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/indexApi/product_discription`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  // //获取注册协议
  getSimpleReg({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/simpleApi/reg_protocol`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //注册会员
  postSimpleRegAct({commit},{params,successCallback}){
    params=dealElement(params)
    http.post(`${settings.defaultUrl}/simpleApi/reg_act`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        vm.$message({
          message: '注册成功！',
          type: 'success'
        });
        successCallback()
      }
    })
  },

  //流水记录
  getflowRecordData({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/bonus_list`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //获取账余额
  getAccountBalance({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/account`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //提现
  postPutForward({commit},{params,successCallback}){
    params=dealElement(params)
    http.post(`${settings.defaultUrl}/ucenterApi/withdraw`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        vm.$message({
          message: res.data.message,
          type: 'success'
        });
        successCallback()
      }
    })
  },

  // 交易记录
  getTransactionRecord({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/bonus_record`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //转账
  postTransferAccounts({commit},{params,successCallback}){
    params=dealElement(params)
    http.post(`${settings.defaultUrl}/ucenterApi/transfer_save`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        vm.$message({
          message: res.data.message,
          type: 'success'
        });
        successCallback()
      }
    })
  },

  //奖转余额
  ucenterTranscoin({commit},{params,successCallback}){
    params=dealElement(params)
    http.post(`${settings.defaultUrl}/ucenterApi/transcoin_save`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        vm.$message({
          message: res.data.message,
          type: 'success'
        });
        successCallback()
      }
    })
  },

  //获取首页三个广告图
  getHomePageAdvData({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/indexApi/index_ad`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //搜索商品
  searchGoodsList({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/indexApi/search`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //发送验证码
  postUcenterSendCode({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/ucenterApi/send_code`,params)
    .then(res=>{

      successCallback(res.data)

    })
  },

  //提交验证码
  postUcenterVerified({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/ucenterApi/verified`,params)
    .then(res=>{
      // if(res.data.error){
      //   vm.$message.error(res.data.message.msg);
      // }else{
      //   let message = res.data.message
        successCallback(res.data)
      // }
    })
  },

 //修改头像
 updataImg({commit},{params,successCallback}){
  let config = {
    onUploadProgress: (progressEvent) => {
      // let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      // // this.uploadPercentage = percentCompleted + '%'
      // console.log(percentCompleted)
    }
  }
  let formData = new FormData();
  formData.append(params.name,params.file);
  //允许跨域请求
  const instance=axios.create({
      withCredentials: true
     }) 
  instance.post(`${settings.defaultUrl}/ucenterApi/upload_head_mobile`,formData,config)
  .then(res=>{
    console.log(res);
    if(res.data.error){
      vm.$message.error(res.data.message);
     }else{
       let message = res.data.message
      successCallback(message)
     }
  })
},
  //找回密码发送验证码
  simpleApiSendCode({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/simpleApi/send_code`,params)
    .then(res=>{
        successCallback(res.data)
    })
  },

  //找回密码验证短信验证码
  postSimpleApiForget({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/simpleApi/forget`,params)
    .then(res=>{
        successCallback(res.data)
    })
  },

  //找回密码设置新密码
  postSimpleApiResetPassword({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/simpleApi/reset_password`,params)
    .then(res=>{
        successCallback(res.data)
    })
  },

  //获取商品分类列表
  getGoodsCategroy({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/goodsApi/goods_category`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //请求hbuilder支付接口需要的订单信息
  appInterfacePayment({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/paymentApi/doPay`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //获取商品咨询数据
  ucenterGetConsult({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/get_consult`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //商品评价
  ucenterApiGetReview({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/get_review`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //提交评价页的商品信息
  indexApiReview({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/indexApi/review`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //提交商品评价
  indexApiReviewAct({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/indexApi/review_act`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message)
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //验证二级密码
  ucenterApiVerifiedPaypwd({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/verifiedPaypwd`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message.msg);
        successCallback(false)
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //我的消息列表
  ucenterApiGetMessage({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/get_message`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },
  //我的收益
  getProfit({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/income`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },
  //删除消息
  ucenterApiMessageDel({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/message_del`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },
  //标记为已读
  ucenterApiMessageRead({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/message_read`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //获取酒米记录列表
  getWinericeData({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/winerice`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //酒米抛售页数据
  ucenterApiSellrice({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/sellrice`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //提交酒米抛售
  ucenterApiSellriceSave({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/ucenterApi/sellrice_save`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message)
      }else{
        let message = res.data.message
        vm.$message({
          message,
          type: 'success'
        })
        successCallback(message)
      }
    })
  },


  // 酒米兑换数据接口
  ucenterApiExchange({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/exchange`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },

  //酒米兑换保存接口
  ucenterApiExchange_save({commit},{params,successCallback}){
    http.post(`${settings.defaultUrl}/ucenterApi/exchange_save`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message)
      }else{
        let message = res.data.message
        vm.$message({
          message,
          type: 'success'
        })
        successCallback(message)
      }
    })
  },

  // 获取推广数据
  getUcenterApiExtension({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/extension`,{params})
    .then(res=>{
      successCallback(res.data)
    })
  },
  //重新生成海报
  ucenterApiPhoto_make({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/photo_make`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },
  //获取注册页面是否需要短信验证码开关
  simpleApiRegSmsopen({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/simpleApi/reg_sms_open`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },
  //礼物订单列表
  // 需要传参 
	//  p (当前页数)
  getGiftOrdersList({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/gift_list`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },
  //订单详情页
  // 需要传参 
	//  id(订单id)
  getGiftOrderDetail({commit},{params,successCallback}){
    // http.get(`${settings.defaultUrl}/ucenterApi/gift_detail`,{params})
    http.get(`${settings.defaultUrl}/ucenterApi/gift_detail?id=200`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  },
  ///礼物首页
  // 需要传参 
	//   product_id (即礼物订单中的product_id)  
	//   product_num(礼物订单中的商品数)
  getGiftHome({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/indexApi/gift_index`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },
  /**
   * 接收礼物
   * 参数:id (订单id）; user_id (送礼物人id)
   */
  GiftAccept({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/indexApi/gift_accept`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message)
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },
  /**
   * 接收礼物分页展示
   * 参数: p (页码)
   */
  GiftAcceptList({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/get_gift_list`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message)
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  }, 
  /**
   * 我的会员相关
   */
  GetMember({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/partner`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message)
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  }, 
  //我的会员相关信息
  getMemberInfo({commit},{params,successCallback}){
    http.get(`${settings.defaultUrl}/ucenterApi/partner`,{params})
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        let message = res.data.message
        successCallback(message)
      }
    })
  },
  //生成礼物订单
  // 需要传参 
	//   wishes (祝福语)
	//   product_id 
	//   product_num 
	//   product_price （商品单价）
  giftMaking({commit},{params,successCallback}){
    // http.post(`${settings.defaultUrl}/indexApi/gift_save`,params)
    http.post(`http://www.shengzhen.vip/indexApi/gift_save`,params)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message)
      }else{
        let message = res.data.message
        // vm.$message({
        //   message,
        //   type: 'success'
        // })
        successCallback(message)
      }
    })
  },

  //获取微信config信息
  getWXConfigInfo({commit},{params,successCallback}){
    // http.get(`${settings.defaultUrl}/ucenterApi/gift_detail`,{params})
    http.get(`http://www.shengzhen.vip/ucenterApi/gift_detail?id=200`)
    .then(res=>{
      if(res.data.error){
        vm.$message.error(res.data.message);
      }else{
        successCallback(res.data.message)
      }
    })
  }

}
