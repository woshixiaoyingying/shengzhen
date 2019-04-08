<template>
  <div class="tixian">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="申请提现"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content v-if="accountBalance.totals" :accountBalance="accountBalance"></v-content>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import VContent from './VContent'
export default {
  components:{
    VContent
  },
  data () {
    return {
      accountBalance:{}
    }
  },
  created(){
    this.getData()
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),

  },
  methods:{
    getData(){
      let successCallback = data=>{
        this.accountBalance = data
      }
      let params={}
      this.$store.dispatch({type:'getAccountBalance',params,successCallback})
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.tixian{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.header{
  flex-shrink: 0;
  background: #fff;
}
.content{
  flex-grow:1;
  overflow-y: auto;
}
.bottom{
  flex-shrink: 0;
}
</style>
