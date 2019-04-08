<template>
<div class="viewport main-viewport" style="font-size:15px">
<div class="ma20 clearfix" style="position: relative;">

        <div class="bg-white">
        <h1 class="title pt20 tc"><span>安全中心</span></h1>
        <ul class="address-list bg-white m20">
            <li class="page-list cell-2">
                <ul class="bg-title-0">
                <li class="caption"><i class="verified"></i>登录密码</li>
                <li><a 
                  @click="$router.push({
                    path: '////verificationCode',
                    query: { redirect: '/ucenter/check_identity/obj/password' }
                  })"
                >修改</a></li>
                </ul>
            </li>
            <li class="p20">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</li>
            <li class="page-list cell-2">
                <ul class="bg-title-0">
                    <li class="caption"><i></i>支付密码</li>
                    <li>
                      <a 
                        v-if="userInfo.pay_password_open=='1'" 
                        @click="$router.push({
                          path: '////verificationCode',
                          query: { redirect: '/ucenter/update_obj/r/paypassword'}
                        })"
                      >
                        修改
                      </a>
                      <a 
                        v-else 
                        @click="$router.push('/ucenter/update_obj/r/paypassword')"
                      >
                        设置支付密码
                      </a>
                    </li>
                    

                </ul>
            </li>
            <li class="p20">您购买商品使用余额支付时，所需要的支付密码，提高资金的安全性。</li>
            <!-- <li class="page-list cell-2">
                <ul class="bg-title-0">
                <li class="caption"><i class="verified"></i>手机号</li>
                <li><a 
                  @click="$router.push({
                    path: '////verificationCode',
                    query: { redirect: '///ucenter/rebindmobile' }
                  })"
                >修改绑定手机</a></li>
                </ul>
            </li> -->
            
          </ul>
    </div>
</div>

</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      
    }
  },
  created () {
    this.getData()
  },
  computed:{
    ...mapState({
      userInfo:"userInfo"
    })
  },
  methods:{
    getData(){
      let successCallback = data=>{
        
      }
      this.$store.dispatch({type:'getUcenterSafety',successCallback})
    },
  }
}
</script>
<style lang="scss" scoped src="../../delirenWebStatic/css/common.scss"></style>
<style lang="scss" scoped src="../../delirenWebStatic/css/ucenter.css"></style>

<style scoped>

</style>