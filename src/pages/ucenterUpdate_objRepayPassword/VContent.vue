<template>

<div> 
 
   <re-password type="paypwd" @submitForm="submitForm"></re-password>
      
</div> 
</template>

<script>
import RePassword from '../components/RePassword'
export default {
  components:{
    RePassword
  },
  methods:{
    submitForm(content){
      // paypwd  支付密码
      // password  密码
      
      let params = content
      let successCallback = () =>{
        this.$router.go(-1)
      }
      this.$store.dispatch({type:'rePayPassword',params,successCallback})
    }
  }

}
</script>

<style lang="scss" scoped src="../../delirenWebStatic/css/common.scss"></style>
<style lang="scss" scoped src="../../delirenWebStatic/css/ucenter.css"></style>
<style scoped>

</style>