<template>
<div class="tab  bg-white tixian-content" index="0" style="font-size:10px">
  <dd class="yue">可用金额：<label class="f18 red">￥{{accountBalance.totals}}</label><span class="shouxufei">提现手续费为{{accountBalance.fund_wdrate}}%</span></dd>
	<div class="tab-body">
		<div id="withdraw-dialog" class="" style="display: block;">


      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <dl>
          
          <el-form-item prop="amount">
             <van-row type="flex" justify="space-around">
                <van-col span="7">提现金额:</van-col>
                <van-col span="17">
                   <input type="text" class="input" placeholder="金额" v-model="ruleForm.amount">
                </van-col>
              </van-row>
           
          </el-form-item>
          <!-- <el-form-item prop="name">
            <input type="text" class="input" placeholder="账户名/开户名" v-model="ruleForm.name">
          </el-form-item>
          <el-form-item prop="type_name">
            <input type="text" class="input" placeholder="名称/开户行：" v-model="ruleForm.type_name">            
          </el-form-item>
          <el-form-item prop="account">
            <input type="text" class="input" placeholder="账号/卡号" v-model="ruleForm.account">            
          </el-form-item> -->
  				<dd><input type="button" class="btn btn_red"  @click="confirmRevise('ruleForm')" value="申请提现"></dd>
  				<dd><input type="button" class="btn btn_red" @click="$router.push('///transactionRecord/1')" value="查看交易记录"></dd>

        </dl>

      </el-form>

    
		</div>
	</div>
</div>
</template>

<script>
export default {
  props:["accountBalance"],
  data(){
    let testAmount = (rule, value, callback)=>{
      value=Number(value)
      if( value > Number(this.accountBalance.totals) || value<1) {
        return callback(new Error(`允许提现金额(1 - ${this.accountBalance.totals})`));
      }
      callback()
    }
    return {
      ruleForm:{
        amount:"",
        name:"",
        type_name:"",
        account:"",
        idcard:""
      },
      rules:{
        amount:[
          { required: true, message: '请输入提现金额',trigger: 'blur'},
          { validator: testAmount, trigger: 'blur'}
        ],
        name: [
          { required: true, message: '请输入账户名/开户名' ,trigger: 'blur'},
        ],
        type_name: [
          { required: true, message: '请输入名称/开户行', trigger: 'blur'},
        ],
        account: [
          { required: true, message: '请输入账号/卡号', trigger: 'blur'},
        ],

      }
    }
  },
  mounted(){
    this.setDefaultValue()
  },
  methods:{
    //确认提现
    confirmRevise(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let successCallBack=()=>{
            this.$router.replace('///transactionRecord/1')
          }
          let params = {...this.ruleForm}
          this.$store.dispatch({type:"postPutForward",params,successCallBack})
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    setDefaultValue(){
      let {w_account,w_name,w_type_name,idcard} = this.accountBalance.bank
      this.ruleForm.account=w_account
      this.ruleForm.name=w_name
      this.ruleForm.type_name=w_type_name
      this.ruleForm.idcard=idcard
    }
  }

}
</script>
<style lang="scss" scoped src="@/delirenWebStatic/css/common.scss"></style>
<style lang="scss" scoped src="../../delirenWebStatic/form/style.css"></style>

<style lang="scss" scoped >
.tixian-content {
  .el-form-item {
    margin-bottom: 0;
     border-bottom: 1px solid #ebedf0;
  line-height: 60px;
  height: 60px;
    display: flex;
  align-items: center;
  }
}
.el-form-item__content,.el-form-item__content .input {
  font-size: 14px;
  line-height: 30px;
}
.tab-body .van-col input {
  border: none;
  font-size: 13pt;
}
.van-col,
.yue {
  color: #000;
  font-size: 13pt;
}
.tixian-content .yue {
  height: 60px;
  line-height: 60px;
font-size: 13pt;
  padding: 0 20px;
  position: relative;
}
.van-row{
  position: relative;
}
.yue::after{
    content: ' ';
    position: absolute;
    pointer-events: none;
    box-sizing: border-box;
    width: calc(100% - 40px);
    left: 20px;
    bottom: 0%;

    transform: scaleY(.5);
    border: 1px solid #ebedf0;
}
.btn_red.btn{
   margin: 0 auto;
    border: 1px solid #ff6633;
    color: #ff6633;
    text-align: center;
    border-radius: 4px;
    background-color: #fff;
    line-height: 40px;
}
.shouxufei{
  position: absolute;
  right: 20px;
}
</style>
