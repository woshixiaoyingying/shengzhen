import axios from 'axios'
const TOKEN_EXPIRE_IN_DIFF = 100;
const TOKEN_STORAGE_KEY = 'huizhongtang';
import vm from '../main'
import settings from '@/settings'
import http from './http'

const expiryTime = 100  //登录过期时间（单位：天）
export default {
    key: function(key){
        return TOKEN_STORAGE_KEY + '_' + key
    },
    // //获取token 如果过期返回false
    // get: function(key){
    //     let json = JSON.parse(localStorage.getItem(this.key(key)));
    //     if(!json){
    //         return false
    //     }
    //     let expire = json.expire_in,
    //         curTime = new Date().getTime() / 1000
    //     if(curTime <= expire){
    //         return json.value
    //     }
    //     return false
    // },
    // // 在localStorage里设置token
    // set: function(value){
    //     let accessTokenExpire = parseInt(value.unixtime) + parseInt(value.expires_in) - TOKEN_EXPIRE_IN_DIFF,   //token到期时间
    //         refreshTokenExpire = parseInt(value.unixtime) + parseInt(value.refresh_expires_in) - TOKEN_EXPIRE_IN_DIFF    //刷新token到期时间
    //     localStorage.setItem(this.key('access_token'), JSON.stringify({
    //         value: value.access_token,
    //         expire_in: accessTokenExpire
    //     }))
    //     localStorage.setItem(this.key('refresh_token'), JSON.stringify({
    //         value: value.refresh_token,
    //         expire_in: refreshTokenExpire
    //     }))
    // },
    // //获取没过期的token过期返回false
    // accessToken: function(){
    //     return this.get('access_token')
    // },
    // //获取没过期的refreshToken过期返回false
    // refreshToken: function(){
    //     return this.get('refresh_token')
    // },
    // //清除localstorage存的accessToken和refreshToken
    // clean: function(){
    //     localStorage.removeItem(this.key('access_token'))
    //     localStorage.removeItem(this.key('refresh_token'))
    // },
    // //检测token和刷新token是否可用
    // checkAccessToken(){

    //     let token = this.accessToken()
    //     if(!token){     //token不存在或者过期
    //         let refreshToken = this.refreshToken()
    //         if(!refreshToken){  //刷新token不存在或者过期
    //             return Promise.reject({         //返回rej
    //                 error:1,
    //                 message:'refresh token expired  刷新token已经过期或不存在'
    //             })
    //         }
    //         let params = {
    //             'token': refreshToken
    //         }
    //         return axios.get(`${settings.defaultUrl}/user/refresh-token`, {  //去刷新,成功返回res错误返回rej
    //             params: params
    //         }).then((res) => {
    //           this.set(res.data.data.message)  //刷新成功设置token
    //         })
    //     }
    //     return Promise.resolve({   //token存在并且没过期直接返回res
    //         error:0,
    //         message:'refresh token loaded',
    //         token: token
    //     });
    // },
    // login:function(){
    //   this.clean()
    //   vm.$router.replace('/login')
    // },

    getSessionid(){
      let json = localStorage.getItem(this.key('SESSION-ID'))
      if(!json){
          return false
      }
      return json 
    },

    setSessionid(value){
      localStorage.setItem(this.key('SESSION-ID'),value)
    },


    checkSessionid(){
      let sessionid = this.getSessionid()
        if(!sessionid){ 
            
            return http.get(`${settings.defaultUrl}/indexApi/sessionId`)
            .then((res) => {
              let value = res.data.message
               this.setSessionid(value)
            })
        }
        return Promise.resolve({  
            error:0
        });
    },


    setSecurityCookie(value){
      localStorage.setItem(this.key('securityCookie'), value)
      vm.$store.commit({type:'ISLOGIN',content:true})
    },

    getSecurityCookie(){
      return localStorage.getItem(this.key('securityCookie'))
    },


    setLastLoginTime(){
      let time = new Date().getTime()
      localStorage.setItem(this.key('lasLoginTime'), time)
    },


    getLastLoginTime(){
      return localStorage.getItem(this.key('lasLoginTime'))*1
    },

    //清除登录状态
    clearLoginStatus(){
      localStorage.removeItem(this.key('lasLoginTime'))
      localStorage.removeItem(this.key('securityCookie'))
      localStorage.removeItem(this.key('SESSION-ID'))
      vm.$store.commit({type:'ISLOGIN',content:false})
    },

    // 检查登录过期
    checkLogonExpires(){
      
      let nowTime = new Date().getTime()

      if((this.getLastLoginTime() + expiryTime*86400000) > nowTime){
        return true
      }else{
        this.clearLoginStatus()
        return false
      }

    },



}
