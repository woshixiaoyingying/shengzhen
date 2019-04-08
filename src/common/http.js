import axios from 'axios';
import authorization from '@/common/authorization';
import createSignature from './createSignature';
import vm from '@/main'

let autoLoginLock = 0

axios.defaults.withCredentials = true

axios.interceptors.request.use(
    config => {
        let params = null
        
        switch(config.method){
          case 'get':
            params=config.params
            break
          case 'post':
            params=config.data
            break
        }

        if(params === null || typeof params === 'undefined'){
          params = {}
        }
        config.headers['AUTH-TOKEN'] = createSignature(params)


        config.transformRequest = [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]

        if(authorization.getSessionid()){
          config.headers['SESSION-ID'] = authorization.getSessionid()
        }
        
        // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

        return config;

    },
    err => {
        return Promise.reject(err);
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.error==2){

          if(response.data.type=='login'&&autoLoginLock<2){
            autoLoginLock+=1
            vm.$store.dispatch({type:"autoLogin",from:'sessionidError'})
            return 
          }

          authorization.clearLoginStatus()
          vm.$router.replace('/login')
          return response

        }else{
          return response;
        }
    },
    error => {
      // alert(error)
        if (error.response) {
           
            return Promise.reject(error.response);
        }else{
            return Promise.reject(error);

        }
    }
)
export default axios;
