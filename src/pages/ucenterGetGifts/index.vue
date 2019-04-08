<template>
      <div class="header" :style="fitPhoneTop">
        <van-nav-bar
          title="接收礼物"
          @click-left="$router.go(-1)"
          left-arrow
        />
      <div class="get_content">
        <v-content :giftAccept="giftAccept"></v-content>
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
import {mapState,mapGetters} from 'vuex';
import VContent from './VContent';
export default {
  
    components:{
      VContent
    },
    data(){
      return {
        page:1,
        count:0,
        pageSize:10,
        giftAccept:[]
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
      let successCallback = data => {
        console.log(data)
        this.count = Number(data.total.num);
        this.giftAccept = data.data;
      }
      let params = {p:this.page}
      this.$store.dispatch({type:'GiftAcceptList',params,successCallback})
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

