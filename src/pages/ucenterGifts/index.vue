<template>
  <div class="wodedingdan">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="送出礼物"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <ucenter-order :giftOrderList="giftOrderList" @getData="getData"></ucenter-order>
    </div>
    <div class="bottom" :style="fitPhoneBottom">
      <van-pagination
        v-if="page>1"
        v-model="page"
        :total-items="count*1"
        :items-per-page="pageSize"
      />
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import UcenterOrder from './UcenterGifts'
export default {
  components:{
    UcenterOrder
  },
  data(){
    return {
      giftOrderList:[],
      page:1,
      pageSize:10,
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
    })
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      let successCallback = data=>{
        this.giftOrderList = data.data
        this.count = Number(data.total.num)
      }
      let {page,pageSize} = this
      let params = {'p':this.page}
      console.log(params)
      this.$store.dispatch({type:'getGiftOrdersList',params,successCallback})
    }
  }
}
</script>

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
