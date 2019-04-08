<template>
  <div class="wodedingdan">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        :title="title"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <ucenter-order :orderList="orderList" @getData="getData"></ucenter-order>
    </div>
    <div class="bottom" :style="fitPhoneBottom">
      <van-pagination
        v-if="count>0"
        v-model="page"
        :total-items="count*1"
        :items-per-page="pageSize"
      />
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import UcenterOrder from './UcenterOrder'
export default {
  components:{
    UcenterOrder
  },
  data(){
    return {
      orderList:[],
      page:1,
      pageSize:6,
      count:0,
    }
  },
  watch:{
    page(){
      this.getData()
    }
  },  
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
    type(){
      return this.$route.params.type
    },
    title(){
      switch (this.type) {
        case '0':
          return '全部订单'
          break;
        case '1':
          return '待付款'
          break; 
        case '2':
          return '待发货'
          break; 
        case '3':
          return '待收货'
          break;
        case '4':
          return '退款/售后'
          break;
        default:
          break;
      }
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      let successCallback = data=>{
        console.log('全部订单',data)
        this.orderList = data.data
        this.count = Number(data.page.total)
      }
      let {page,pageSize,type} = this
      let params = {page,pageSize,type}
      this.$store.dispatch({type:'getUcenterOrder',params,successCallback})
    },
  }
}
</script>
<style scoped src="@/huizhongtangWebStatic/css/base.css"></style>
<style lang="scss" scoped>
.wodedingdan{
  width: 100%;
  height: 100%;
  display:flex;
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
