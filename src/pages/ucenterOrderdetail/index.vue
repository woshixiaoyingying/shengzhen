<template>
  <div class="diangdanxiangqing">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="订单详情"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content :orderDetails="orderDetails"></v-content>
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
      orderDetails:{}
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
        this.orderDetails = data
      }
      let params = {id:this.$route.params.id}
      this.$store.dispatch({type:'ucenterOrderDetail',params,successCallback})
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.diangdanxiangqing{
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
