<template>


<div class="viewport main-viewport ucenter-bank" style="font-size:10px">
<div class="p20 bg-white">


  <el-form  class="simple login-form "  :model="ruleForm" :rules="rules" ref="ruleForm" >
		
        <p class="real_name" v-if="type='firstSet'">真实姓名：{{real_name}}</p>

        <el-form-item  prop="w_name" label="账户名/开户名">
          <el-input v-model="ruleForm.w_name" type="text" placeholder="账户名/开户名" alt="账户名/开户名" ></el-input>
        </el-form-item>

        <el-form-item  prop="w_type_name" label="名称/开户行">
          <el-input v-model="ruleForm.w_type_name" type="text" name="w_type_name" placeholder="名称/开户行" alt="账号/卡号" ></el-input>
        </el-form-item>

        <el-form-item prop="w_account" label="账号/卡号">
       
          <el-input v-model="ruleForm.w_account" type="text" name="w_account" placeholder="账号/卡号" alt="账号/卡号" ></el-input>
        </el-form-item>

        <el-form-item  prop="idcard" label="身份证号">
          <el-input v-model="ruleForm.idcard" type="text" name="idcard" placeholder="身份证号" alt="身份证号" ></el-input>
        </el-form-item>

        <input type="button"  @click="submitForm('ruleForm')" value="提交" class="btn">

  </el-form>

</div>
</div>


</template>
<script>

export default {
  props:[
    "type"
  ],
  data () {
    return {
      ruleForm: {
          w_name: '',
          w_type_name:'',
          w_account:'',
          idcard:'',
        },
        rules: {
          w_name: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          w_type_name:[
            { required: true, message: '请输入', trigger: 'blur' },
          ],
          w_account:[
            { required: true, message: '请输入正确的银行卡号', max:19, min:16, trigger: 'blur' },
          ],
           idcard:[
            { required: true, message: '请输入正确的身份证号',  max:18, min:18, trigger: 'blur' },
          ],
          
        },
        real_name:''
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      let successCallback = data=>{
        if(data.bankinfo){
          this.ruleForm={...this.ruleForm,...data.bankinfo}
        }
        console.log(data)
        if(data.real_name){
          this.real_name=data.real_name
        }
      }
      let params = {
        type:0
      }
      this.$store.dispatch({type:'getUcenterBankData',params,successCallback})
    },
    postUcenterBankData(){
      let successCallback = data=>{
        this.$router.go(-1)
      }
      let params = {...this.ruleForm}
      this.$store.dispatch({type:'postUcenterBankData',params,successCallback})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postUcenterBankData()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped src="../../huizhongtangWebStatic/css/common.scss"></style>

<style lang="scss" >
.ucenter-bank {
  .el-form-item__error {
      left: auto;
      top: 16px;
      right: 2px;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .login-form .btn{
    margin-top: 15px;
  }
  .real_name{
    font-size: 0.28rem;

  }
}
</style>
