<template>
  <div>
    <el-form label-width="100px"  inline :model="ruleForm" :rules="rules" ref="ruleForm">

        <!-- <el-form-item label="支付密码" prop="oldpassword" v-if="userInfo.pay_password_open=='1'">
          <el-input type="oldpassword" placeholder="请输入支付密码" v-model="ruleForm.oldpassword"></el-input>
        </el-form-item> -->

        <el-form-item label="新密码" prop="password">
          <el-input type="password" placeholder="请输入新密码" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item label="确认新密码" prop="repassword">
          <el-input type="password" placeholder="再次输入新密码" v-model="ruleForm.repassword"></el-input>
        </el-form-item>
        
        <p style="text-align:center;">
          <el-button type="primary" @click="confirmRevise('ruleForm')">提交</el-button>
        </p>

      </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:["type"],
  computed:{
    ...mapState({
      userInfo:"userInfo"
    })
  },
  data(){
    let testNewPassWord = (rule, value, callback)=>{
      if(this.ruleForm.password!==value){
        return callback(new Error('两次输入密码不一致'));
      }
      callback()
    }

    let checkPassword = (rule, value, callback)=>{
      if(value.length>16||value.length<6){
        return callback(new Error('六到16位任意数字字母组合'))
      }
      callback()
    }
    return {

      ruleForm:{
        oldpassword:"",
        password:"",
        repassword:"",
      },

      rules: {
        oldpassword:[
          { required: true, message: '请输入旧密码' ,trigger: 'blur'},
          { validator: checkPassword, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码' ,trigger: 'blur'},
          { validator: checkPassword, trigger: 'blur'}
        ],
        repassword: [
          { required: true, message: '请确认密码', trigger: 'blur'},
          { validator: checkPassword, trigger: 'blur'},
          { validator: testNewPassWord, trigger: 'blur'},
        ]
      }
    }
  },
  methods:{
       //确认修改
    confirmRevise(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let successCallBack=()=>{
            this.$refs[formName].resetFields();
          }

          let {password,repassword,oldpassword}=this.ruleForm

          let content={password,repassword,oldpassword,obj:this.type}
         
          this.$emit('submitForm',content)
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
  }
};
</script>
<style scoped>
</style>