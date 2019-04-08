<template>
  <div class="viewport main-viewport index-review" style="font-size:10px;">
    <div class="ma20 p20 bg-white">
      <div class="layout-2 mt10 line-b">
        <div>
          <a @click="$router.push(`///product/${goodsData.goods_id}`)">
            <img :src="`${settings.imgBaseUrl}${goodsData.img}`">
          </a>
        </div>
        <div style="height:6em">
          <a  @click="$router.push(`///product/${goodsData.goods_id}`)">{{goodsData.name}}</a>
          <p>销售价：
            <b class="red">￥{{goodsData.sell_price}}</b>
          </p>
        </div>
      </div>
      <form>
        <div class="van-rate">
          <van-rate v-model="point" /> 
        </div>
        <div class="van-rate-text" v-if="point">
          {{point}}分
        </div>
        <div style="margin-top:1em;">
          <textarea class="textarea" v-model="content" style="height: 140px; width:100%" inform="0"></textarea>
        </div>
        <div class="mt20">
          <input type="button" @click="indexApiReviewAct" value="提交评价" class="btn">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import settings from '@/settings'
export default {
  data(){
    return {
      goodsData:{},
      settings,
      point:0,
      content:"",
    }
  },
  created(){
    this.getGoodsData()
  },
  methods:{
    getGoodsData(){
      let successCallback = data => {
        this.goodsData=data
      }
      let params ={
        id:this.$route.params.id
      }
      this.$store.dispatch({type:"indexApiReview",params,successCallback})
    },
    //提交评价
    indexApiReviewAct(){
      if(this.point==0){
        this.$message.error('请先评分')
        return 
      }
      let successCallback = data => {
        this.$router.go(-1)
      }
      let params = {
        id:this.$route.params.id,
        point:this.point,
        content:this.content
      }

      this.$store.dispatch({type:"indexApiReviewAct",params,successCallback})
    }
    
  }
};
</script>

<style scoped lang="scss" src="@/huizhongtangWebStatic/css/common.scss">
</style>
<style lang="scss">
.index-review{
  .van-rate{
    float: left;
    padding-bottom:1em;

  }
  .van-rate-text{
    float: left;
    padding-left:1em;
    height: 1.5em;
    line-height:1.5em;
    font-size:1.5em;
  }
}
</style>
