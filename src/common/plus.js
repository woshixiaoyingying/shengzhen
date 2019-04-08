let $plus = {
  //plusReady事件
  plusReady(ready){
    if(window.plus){
      ready();
    }else{
      document.addEventListener( "plusready", ready, false );
    }
  },
  //使输入框能够自动获取焦点
  inputAutofocus(){
    if(this.systemType()==='iOS'){
      var webView = plus.webview.currentWebview().nativeInstanceObject();
       webView.plusCallMethod({"setKeyboardDisplayRequiresUserAction":false});
    }
  },
  //判断是否iphonex
  isIphoneX(){
    // console.log(plus.device.model)
    // alert(plus.device.model)
    if(window.innerWidth === 375 && window.innerHeight === 812 && window.devicePixelRatio === 3){
      return true
    }
    return false
  },
  //判断状态栏和底部的padding
  safeArea(){
    //判断系统和状态栏高度star
    let isIphoneX=this.isIphoneX()
    let top = plus.navigator.getStatusbarHeight()
    let bottom = 0
    if(isIphoneX){
      top = top-10
      bottom = 25
    }
     //判断是否iPhone XS Max
     console.log('判断是否iPhone XS Max',plus.device.model);
    if(plus.device.model == 'iPhoneXSMax'){
      bottom = 25
    }
    return {
      top,
      bottom,
    }
  },
  //判断系统类型
  systemType(){
    let type
    switch ( plus.os.name ) {
        case "Android":
          // Android平台: plus.android.*
          type =  'Android'
          break;
        case "iOS":
          // iOS平台: plus.ios.*
          type = 'iOS'
          break;
        default:
          // 其它平台
          type = 'other'
          break;
    }
    return type
  },
  // 图片预览
  previewImage(urls){
    if(!window.plus){return false}
  	plus.nativeUI.previewImage(urls);
  },
  // 获取网络类型
  getNetworkType(){
    var types = {}
    types[plus.networkinfo.CONNECTION_UNKNOW] = "Unknown connection"
    types[plus.networkinfo.CONNECTION_NONE] = "None connection"
    types[plus.networkinfo.CONNECTION_ETHERNET] = "Ethernet connection"
    types[plus.networkinfo.CONNECTION_WIFI] = "WiFi"
    types[plus.networkinfo.CONNECTION_CELL2G] = "2G"
    types[plus.networkinfo.CONNECTION_CELL3G] = "3G"
    types[plus.networkinfo.CONNECTION_CELL4G] = "4G"
    return types[plus.networkinfo.getCurrentType()] 
  },
  //获取系统类型，系统版本，网络类型，设备UUID
  getDeviceInfo(){
    let System = plus.device.model
    let Version = plus.os.version
    let NetworkType = this.getNetworkType()
    let UUID = plus.device.uuid
    return `System:${System}; Version:${Version}; NetworkType:${NetworkType}; UUID:${UUID}`
  }
}

export default $plus





