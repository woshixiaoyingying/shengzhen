const type ={
  PHONECONFIG:"PHONECONFIG",  //手机参数
  ISLOGIN:"ISLOGIN",           //登录状态
  USERINFO:"USERINFO",         //用户信息
  AREADATA:"AREADATA",         //地区数据
  ADDRESSDATA:"ADDRESSDATA",   //收货地址列表
  MIDDLEMAINLOADING:"MIDDLEMAINLOADING",//loading
}

export default {
  [type.PHONECONFIG](state,{content}){
    state.phoneParams=content
  },
  [type.ISLOGIN](state,{content}){
    state.isLogin=content
  },
  [type.USERINFO](state,{content}){
    state.userInfo=content
  },
  [type.AREADATA](state,{content}){
    state.areaData=content
  },
  [type.ADDRESSDATA](state,{content}){
    state.addressData=content
  },
  [type.MIDDLEMAINLOADING](state,{content}){
    state.middlemainLoading=content
  },
  
}
