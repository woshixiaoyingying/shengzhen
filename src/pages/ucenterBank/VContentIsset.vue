<template>
  <div class="p20 bg-white" style="font-size:10px;">
    <dl class="clearfix bank-card">
      <dl>
        <dd style="display: inline-block;font-size: 18pt;padding-right: 10px;">主账号</dd>
        <dd style="display: inline-block">{{bankInfo.idcard}}</dd>
      </dl>
      <dl>
        <dd style="display: inline-block;padding-right: 10px;color: #b1e8e0">{{bankInfo.w_name}}</dd>
        <dd style="display: inline-block;color: #b1e8e0">{{bankInfo.w_type_name}}</dd>
      </dl>
      <dd style="padding-top: 15px;font-size: 14pt;">{{bankInfo.w_account}}</dd>
    </dl>
    <dl class="clearfix">
      <el-button class="rebankinfo" type="primary" @click="handleClick">修改银行卡</el-button>
    </dl>
  </div>
</template>

<script>
export default {
  data(){
    return {
      bankInfo:{}
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      let successCallback = data=>{
        if(data.bankinfo){
          this.bankInfo=data.bankinfo
          return 
        }
        this.$router.replace({
        path: '//ucenter/bank/firstSet',
      })
      }
      let params = {
        type:1
      }
      this.$store.dispatch({type:'getUcenterBankData',params,successCallback})
    },
    handleClick(){
      this.$router.push({
        path: '////verificationCode',
        query: { redirect: '//ucenter/bank/unset' }
      })
    }
  },
};
</script>

<style lang="scss" scoped src="@/huizhongtangWebStatic/css/common.scss">

</style>
<style lang="scss" scoped >
	.bank-card{
    padding:25px 20px;font-size: 12pt;
		line-height: 2;
		border-radius: 5px;color: #fff;
  }
  .rebankinfo{
    padding:15px 40px;
    display:block;
    margin:20px auto;
    font-size:16px;
  }
</style>
