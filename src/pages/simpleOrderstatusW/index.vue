<template>
  <div class="fukuan">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="支付完成"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content :simpleOrderStatus="simpleOrderStatus" :payment_list="payment_list"></v-content>
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
      simpleOrderStatus:{},
      payment_list:[]
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
        this.simpleOrderStatus = data.order
        this.payment_list = data.payment_list

        
      }
      let params = {
        order_id:this.$route.params.id
      }
      this.$store.dispatch({type:'getsimpleOrderStatus',params,successCallback})
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.fukuan{
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
}
.bottom{
  flex-shrink: 0;
}
</style>
