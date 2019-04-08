<template>
  <div class="gaimima">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="修改密码"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <el-form label-width="100px"  inline :model="ruleForm" :rules="rules" ref="ruleForm">

        <el-form-item label="新密码" prop="password">
          <el-input type="password" placeholder="请输入新密码" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item label="确认新密码" prop="repassword">
          <el-input type="password" placeholder="再次输入新密码" v-model="ruleForm.repassword"></el-input>
        </el-form-item>
        
        <el-form-item label=" ">
          <el-button type="primary" @click="confirmRevise('ruleForm')">提交</el-button>
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
  props:["safecode"],
  data () {
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
  created(){
  
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),

  },
  methods:{
        //确认修改
    confirmRevise(formName){

      this.$refs[formName].validate((valid) => {
        if (valid) {

          

          let {password,repassword,oldpassword}=this.ruleForm

          let successCallback=data=>{
            if(!data.error){
              this.$refs[formName].resetFields();
              this.$message({
                  message: '密码重置成功！',
                  type: 'success'
              })
              this.$router.replace('/login')
            }else{
              this.$message.error(data.message);
            }
          }
          let params={
            safecode:this.safecode,
            password,
            repassword
          }

          this.$store.dispatch({type:"postSimpleApiResetPassword",params,successCallback})


        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.gaimima{
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
  padding-top: 0.5rem;
}
.bottom{
  flex-shrink: 0;
}
</style>
