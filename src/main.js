import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import Cube from 'cube-ui'
import FastClick from 'fastclick'
import ElementUI from 'element-ui'
import './assets/css/home.css'
import '../theme/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import './huizhongtangWebStatic/css/base.css'
import VConsole from 'vconsole'

import Promise from 'promise'
import touch from 'vue-directive-touch'
import VueClipboards from 'vue-clipboards'
import { Loadmore,Button } from 'mint-ui'
Vue.component(Button.name, Button);

Vue.component(Loadmore.name, Loadmore)
import 'mint-ui/lib/style.css'
// import VueTouch from 'vue-touch'

// import VueLazyLoad from 'vue-lazyload'
// import VConsole from 'vconsole/dist/vconsole.min.js'

//前端调试工具，解决真机测试不便的问题可以像chrome控制台一样输出json数据
new VConsole()

//封装了hammer.js的vue插件。
// Vue.use(VueTouch, {name: 'v-touch'})

Vue.use(touch);
Vue.use(Vant)
Vue.use(VueClipboards)
if (!window.Promise) {
  window.Promise = Promise
}

// import  { LoadingPlugin,DatetimePlugin,ToastPlugin, ConfirmPlugin } from 'vux'

// Vue.use(ConfirmPlugin)

// 默认参数
// Vue.use(ToastPlugin, {position: 'top'})
// 图片懒加载
// Vue.use(VueLazyLoad,{
//     error:require('./images/jiazaishibai.png'),
//     loading:require('./images/jiazaizhong.jpg')
// })

// Vue.use(DatetimePlugin)
// Vue.use(LoadingPlugin)
Vue.use(ElementUI)

FastClick.attach(document.body) // 解决点击延时

// Vue.use(Cube)
Vue.config.productionTip = false

if (document.documentElement.clientWidth >= 750) {
  document.documentElement.style.fontSize = '100px'
} else {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
} // rem布局

var instance = axios.create({
  baseURL:'',
  timeout:5000,
  headers:{"Content-Type":"multipart/form-data"}
});
 
Vue.prototype.axios = axios;
Vue.prototype.instance=instance;

/* eslint-disable no-new */
let vm = new Vue({
  // el: '#app',
  store,
  router,
  // template: '<App/>',
  components: {
    App
  },
  render: h => h(App)
}).$mount('#app')

export default vm
