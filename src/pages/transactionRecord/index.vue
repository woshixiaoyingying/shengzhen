<template>
  <div class="tixian">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        :title="title"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content :transactionRecord="transactionRecord" :type="type"></v-content>
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
import VContent from './VContent'
export default {
  components:{
    VContent
  },
  data () {
    return {
      transactionRecord:[],
      count:0,
      pageSize:10,
      page:1,
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
    type(){
      return this.$route.params.type
    },
    title(){
      let title=""
      switch (this.$route.params.type) {
        case '1':
          title='提现记录'
          break;
        case '2':
          title='转账记录'
          break;
        case '3':
          title='转换记录'
          break;
      
        default:
          break;
      }
      return title
    }
  },
  watch:{
    page(){
      this.getData()
    }
  },
  methods:{
    getData(){
      let successCallback = data=>{
        this.transactionRecord = data.data
        this.count = data.page.total
      }
      let {type,page,pageSize} = this
      let params = {type,page,pageSize}

      this.$store.dispatch({type:'getTransactionRecord',params,successCallback})
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
