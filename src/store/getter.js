let getters = {
  //适配手机的paddingTop
  fitPhoneTop: state => {
    // return {paddingTop:40 + 'px'}
    return state.phoneParams.safeArea
    ? {paddingTop:state.phoneParams.safeArea.top + 'px'}
    :null
  },
  //适配手机的paddingBottom
  fitPhoneBottom: state => {
    // return {paddingBottom:20 + 'px'}

    return state.phoneParams.safeArea
    ? {paddingBottom:state.phoneParams.safeArea.bottom + 'px'}
    : null
  },
  //手机的状态栏高度纯数字
  safeAreaTop: state => {
    // return 40
    return state.phoneParams.safeArea
    ? state.phoneParams.safeArea.top
    : 0
  },
  //iphonex底部padding纯数字
  safeAreaButtom: state => {
    // return 20
    return state.phoneParams.safeArea
    ? state.phoneParams.safeArea.bottom
    : 0
  }
}
export default getters
