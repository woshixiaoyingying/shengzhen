<template>
  <div class="qianbao">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="短信验证"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">

      <el-form ref="form" class="el-form"  label-width="60px">
        <el-form-item label="手机号:" >
          <span>{{userInfo.mobile}}</span>
        </el-form-item>

        <el-form-item label="验证码:" :error="errorMsg">
          <el-input placeholder="验证码" v-model="code">
            <template slot="append">
              <el-button v-if="!isSend" @click="sendSmsCode">获取验证码</el-button>
              <el-button v-else>{{time}}</el-button>

            </template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-button type="success" :disabled="!code" @click="nextStep">下一步</el-button>
        </el-form-item>

      </el-form>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import { setInterval, clearInterval, setTimeout } from 'timers';
export default {
  props:[
    'redirect'
  ],
  data () {
    return {
      code:"",
      isSend:false,
      time:120,
      errorMsg:''
    }
  },
  watch:{
    code(){
      this.errorMsg=''
    }
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
    ...mapState({
      userInfo:"userInfo"
    }),
    obj(){
      let obj = ''
      switch (this.redirect) {
        case '/ucenter/update_obj/r/paypassword':
          obj="paypwd"
          break;
        case '/ucenter/check_identity/obj/password':
          obj="password"
          break;
        case '//ucenter/bank/unset':
          obj="bank"
          break;

        default:
          break;
      }
      return obj
    }

  },
  methods:{
    sendSmsCode(){
      let successCallback = data=>{
        if(data.error){
          this.$message.error(data.message.msg)
          if(!this.isSend){
            this.time=data.message.haveTime
            this.sendCompletion()
          }
        }else{
          this.$message({
            message: '发送成功',
            type: 'success'
          })
          this.sendCompletion()
        }
      }
      let params = {
        type:'mobile',
        obj:this.obj,
      }
      this.$store.dispatch({type:'postUcenterSendCode',params,successCallback})
    },
    postUcenterVerified(){
      let successCallback=data=>{
          if(data.error){
            this.errorMsg = data.message.msg
          }else{
            this.$router.replace(this.redirect)
          }
      }
      let params = {
        obj:this.obj,
        type:"mobile",
        code:this.code
      }
      this.$store.dispatch({type:"postUcenterVerified",params,successCallback})

    },

    nextStep(){
      this.postUcenterVerified()
    },


    //发送完成
    sendCompletion(){
      this.isSend=true
      this.time = this.time - 1

      setTimeout(()=>{

        if(this.time == 0 || this.time < 0){
          this.time=120
          this.isSend=false
        }else{
          this.sendCompletion()
        }

      },1000)

    }


  }
}
</script>
<style lang="scss" scoped>
.qianbao{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.header{
  flex-shrink: 0;
  border-bottom: 1px solid #dcdee3;
  background: #fff;
}
.content{
  flex-grow:1;
  overflow-y: auto;
  .el-form{
    padding: 0.5rem;
  }
}
.bottom{
  flex-shrink: 0;
}
</style>
