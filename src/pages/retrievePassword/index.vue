<template>
  <div class="zhaohuimima">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="找回密码"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <el-form ref="form" class="el-form"  label-width="60px">

        <el-form-item label="手机号:" :error="accountError">
          <span v-if="isSend">{{account}}</span>
          <el-input v-else  placeholder="绑定的手机号" v-model="account"> </el-input>
        </el-form-item>

        <el-form-item label="验证码:" :error="errorMsg">
          <el-input placeholder="验证码" v-model="verifyCode">
            <template slot="append">
              <el-button v-if="!isSend" @click="sendSmsCode">获取验证码</el-button>
              <el-button v-else>{{time}}</el-button>

            </template>
          </el-input>
        </el-form-item>

        <el-form-item >
          <el-button type="success" :disabled="!verifyCode" @click="nextStep">下一步</el-button>
        </el-form-item>

      </el-form>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
export default {
  data () {
    return {
      account:'',
      verifyCode:'',
      errorMsg:'',
      accountError:'',
      isSend:false,
      time:120
      
    }
  },
  created(){

  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),

  },
  methods:{

    sendSmsCode(){
      if(this.account.length!=11){
        this.accountError='请填写11位手机号！'
        return 
      }
      let params={
        account:this.account
      }
      let successCallback=data=>{
        if(!data.error){
          this.isSend=true
          this.accountError=''
          this.$message({
            message: '发送成功',
            type: 'success'
          })
          this.sendCompletion()
        }else{
          this.accountError=data.message
        }
      }
      this.$store.dispatch({type:"simpleApiSendCode",params,successCallback})
    },
        //发送完成
    sendCompletion(){
      this.time = this.time - 1
      setTimeout(()=>{
        if(this.time == 0 || this.time < 0){
          this.time=120
          this.isSend=false
        }else{
          this.sendCompletion()
        }

      },1000)

    },

    nextStep(){
       this.postUcenterVerified()
    },

    postUcenterVerified(){
      let successCallback=data=>{
          if(data.error){
            this.errorMsg = data.message
          }else{
            this.$router.replace({
              path:'//simpleApiResetPassword',
              query: { safecode: this.verifyCode }
            })
          }
      }
      let params = {
        account:this.account,
        safecode:this.verifyCode
      }
      this.$store.dispatch({type:"postSimpleApiForget",params,successCallback})

    },
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.zhaohuimima{
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
