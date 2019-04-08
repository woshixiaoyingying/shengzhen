<template>
         <div class="TabContent">
            <div id="myTab2_Content1" class="none">
              <div class="bg-white login clearfix simple-box ma20 p20">
                <div class="login-form login-form-list">
                  <!---->
                  <dl class="clearfix">
                    <dd>
                      <input class="input" type="text" v-model="ruleForm.name" placeholder="账号">
                    </dd>
                  </dl>
                  <dl class="clearfix">
                    <dd>
                      <input
                        type="text"
                        class="input"
                        v-model="ruleForm.real_name"
                        placeholder="真实姓名"
                      >
                    </dd>
                  </dl>
                  <!-- 地址选择 开始-->
                  <dl class="clearfix">
                    <dd id="areas" class="h-box">
                      <input type="text" class="input" placeholder="请选择地址" @click="selectAdd()" ref="addressInput">
                      <van-popup v-model="show" position="bottom" :overlay="true" @click-overlay="onCancel">
                        <van-area
                          :area-list="areaList"
                          value="110101"
                          @confirm="onConfirm"
                          ref="vantAddress"
                          @cancel="onCancel"
                        />
                      </van-popup>
                    </dd>
                  </dl>
                  <!-- 地址选择结束 -->
                  <dl class="clearfix">
                    <dd :error="accountError">
                      <input type="text" class="input" v-model="ruleForm.mobile" placeholder="手机号">
                    </dd>
                  </dl>
                  <dl class="clearfix">
                    <dd>
                      <input
                        type="password"
                        class="input"
                        v-model="ruleForm.password"
                        placeholder="密码"
                      >
                    </dd>
                  </dl>
                  <dl class="clearfix">
                    <dd>
                      <input
                        type="password"
                        class="input"
                        v-model="ruleForm.repassword"
                        placeholder="确认密码"
                      >
                    </dd>
                  </dl>
                  <dl class="clearfix">
                    <dd>
                      <input
                        class="input"
                        v-model="ruleForm.rec_name"
                        type="text"
                        placeholder="推荐人账号"
                      >
                    </dd>
                  </dl>

                  <dl class="clearfix">
                    <dd>
                      <input
                        type="text"
                        class="input small"
                        v-model="ruleForm.mobile_code"
                        placeholder="短信验证码"
                      >
                    </dd>
                  </dl>
                  <dl class="clearfix">
                    <dd>
                      <input
                        v-if="!isSend"
                        @click="sendSmsCode"
                        type="button"
                        class="btn btn-gray"
                        value="获取短信验证码"
                      >
                      <input
                        v-else
                        type="button"
                        class="btn btn-gray"
                        :value="time"
                      >
                    </dd>
                  </dl>
                  <dl class="clearfix">
                    <dd class="agree_box">
                      <input v-model="readme" type="checkbox" class="agree">
                      <label>
                        我已阅读并同意《
                        <a
                          class="red"
                          @click="dialogVisible=true"
                          href="javascript:;"
                        >琞珍商城用户注册协议</a>》
                      </label>
                    </dd>
                  </dl>
                  <dl class="clearfix mb20">
                    <dd>
                      <input
                        type="submit"
                        class="btn btn-mains"
                        @click="submitForm('ruleForm')"
                        value="同意协议，立即注册"
                      >
                    </dd>
                  </dl>
                  <dl class="clearfix">
                    <dd>
                      <input
                        type="button"
                        class="btn btn-gray"
                        value="已注册,立即登录"
                        @click="$router.replace('/login')"
                      >
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

</template>

<script>
export default {
props:["agreement"],
data() {
   let testNewPassWord = (rule, value, callback)=>{
      if(this.ruleForm.password!==value){
        return callback(new Error('两次输入密码不一致'));
      }
      callback()
    }
  return {
    dialogVisible:false,
    readme:false,
    ruleForm: {
      name: '',
      mobile: '',
      password: '',
      repassword: '',
      rec_name: ''
    },
    rules: {
      name: [
        { required: true, message: '请填写账号', trigger: 'blur' },
      ],
      mobile: [
        { required: true, message: '请填写正确的手机号码', max:11, min:11, trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请填写密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
      ],
      repassword: [
        { required: true, message: '请填写确认密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        { validator: testNewPassWord, trigger: 'blur'},
      ],
      rec_name: [
        { required: true, message: '请填写推荐人', trigger: 'blur' }
      ]
    }
  };
},
methods: {
  agreementAgreement(){
    this.dialogVisible=false
    this.readme=true
  },
  submitForm(formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        let successCallback=data=>{
          this.$router.replace('/login')
        }
        let params={
          ...this.ruleForm
        }
        this.$store.dispatch({type:"postSimpleRegAct",params,successCallback})
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}

}
</script>

<style lang="scss" scoped src="../../delirenWebStatic/css/common.scss"></style>
<style lang="scss" scoped src="../../delirenWebStatic/form/style.css"></style>




<style lang="scss" scoped>
.el-form-item{
  margin-bottom: 0;
  margin-top: 15px;
}
</style>

<style>
.simple-reg .el-input__inner{
  background: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px #3c3b39 solid;
  height: 25px;
  padding-left: 8px;
}
.simple-reg .el-form-item.is-success .el-input__inner{
  border: 1px #06AC87 solid;
}
.simple-reg ::-webkit-input-placeholder {  
  color: #6a6a6a;     
}
</style>

