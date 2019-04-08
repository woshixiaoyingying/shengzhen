<template>
<div>
  <re-password v-if="userInfo.pay_password_open=='1'" type="password" @submitForm="submitForm" ></re-password>
  <p v-else>请先设置支付密码</p>
</div>
</template>

<script>
import {mapState} from 'vuex'
import RePassword from '../components/RePassword'
export default {
  components: {
    RePassword
  },
  computed:{
    ...mapState({
      userInfo:"userInfo"
    })
  },
  methods:{
    submitForm(content){
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