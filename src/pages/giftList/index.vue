<template>
  <div class="libaoliebiao">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="礼物列表"
        @click-left="$router.go(-1)"
        left-arrow
      />
      
    </div>
    <div class="content">
        
      <div class="tcon">
        <img alt="" :src="`${settings.imgBaseUrl}themes/mobile/images/guan.png`"/>
        <h3>每日新品</h3>
        <span>NEW ARRIVAL</span>
      </div>
      
      <div class="list-box">
      
        <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
          >
          <goods-item v-for="(item,index) in cateData" :key='index' :item="item"></goods-item>
        </van-list>
      </div>  
    </div>
    <div class="bottom">
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import settings from '@/settings'
import GoodsItem from '@/pages/components/giftsItem'
export default {
  components:{
    GoodsItem
  },
  data () {
    return {
      settings,
      cateData:[],
      page:1,
      pageSize:5,
      count:0,
      loading: false,
      finished: false,
    }
  },
  // created(){
  //   this.getData()
  // },
  watch:{
    '$route'(){
      this.page=1
      this.finished=false
      this.getData()
    }
  }, 
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),

  },
  methods:{
    onLoad(){
      this.page=this.page+1
      this.getData()
    },

    getData(){
      let successCallback = data=>{
        let cateData = [...this.cateData,...data.goods.data]
        // 加载状态结束
        this.loading = false;
        if(cateData.length==data.goods.page.total){
          this.finished=true
        }

        this.cateData = cateData
      }
      let params = {
        cid:5,
        page:this.page,
        sort:5,
        pageSize:this.pageSize
      }
      this.$store.dispatch({type:'getcateData',params,successCallback})
    },
  }
}
</script>



<style lang="scss" scoped>
.tcon {
    padding: 10px;
}
.tcon img {
    width: 25px;
    height: 25px;
    display: block;
    margin: 0 auto;
}
.tcon h3:before {
    content: '';
    position: absolute;
    right: 5%;
    top: 23px;
    width: 30%;
    height: 2px;
    background: #bab598;
}
.tcon h3 {
    color: #c5b18e;
    font-size: 13pt;
    text-align: center;
    line-height: 46px;
    font-weight: normal;
    position: relative;
}
.tcon h3:after {
    content: '';
    position: absolute;
    left: 5%;
    top: 23px;
    width: 30%;
    height: 2px;
    background: #bab598;
}
.tcon span {
    text-align: center;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    color: #ababab;
    font-size: 10pt;
    display: block;
}
.list-box{
  flex-grow: 1;
  overflow-y: auto;
}
.libaoliebiao{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.header{
  flex-shrink: 0;
  // border-bottom: 1px solid #dcdee3;
  background: #fff;
}
.content{
  flex-grow:1;
  overflow-y: auto;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  position: relative;
}
.bottom{
  flex-shrink: 0;
}
</style>
