<template>
  <div class="libaoshangpin">
    <!-- Start 图片展示 --> 
    <div class="ma20 pb20 bg-white">

    <p class="fanhuianniu" :style="{top:`${safeAreaTop+10}px`}" @click="$router.go(-1)">
      <img  src="./images/fanhuianniu_03.png" alt="">
    </p>
    <p class="huishouye" :style="{top:`${safeAreaTop+10}px`}" @click="$router.replace('/win_a/home')">
      <img  src="./images/2222.png" alt="">
    </p>

      <div>
        <div class="product-img">
            <img :src="`${settings.imgBaseUrl}${img}`">
        </div>
      </div>
      <!-- End 图片展示 -->
      <div class="product-info">
        <h1 class="pro-name">{{name}}</h1>
        <dl class="col-2">
            <dt class="product-price">赠品数：</dt>
            <dd>
              <span id="sell_price"  class="price">
                {{productdata.presents_num}}
              </span>
              <span class="price" style="font-size: 1em;color: #ccc;"></span>
            </dd>
        </dl>

        <div class="spec-info">

            <dl class="col-2 spec-item clearfix">

                <dd>

                </dd>
            </dl>

            <dl class="col-2 spec-item clearfix">
                <dt>数量：</dt>
                <dd class="buy-num" id="buy-num-bar">
                  <a @click="reduce">
                  -
                  </a>
                  <input id="buy-num" name="buy_num" v-model="num"  type="text"  maxlength=5>
                  <a @click="plus">
                  +
                  </a>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="vm">可购数量：
                    <b id="store_nums" class="red">
                      {{store_nums}}
                    </b>
                  </span>
                </dd>
            </dl>
            <dl id="spec-msg" class="spec-item clearfix" style="display: none;">
                <dt></dt>
                <dd ><p class="msg"><i class="icon icon-alert"></i><span >请选择您要购买的商品规格</span></p>
                </dd>
            </dl>

        </div>
      </div>
      <div class="box">
          <ul class="list-nav product-detial">

              <li class="item">
                  <a class="m10 more" @click="showGoodDetailInfo"><span>商品详细介绍</span></a>
              </li>
          </ul>
      </div>
      <div class="btn-bar ">

          <div class="col-2-1">
            <a href="javascript:void(0);" @click="sendGiftInfo" id="add-cart" class="btn">
              送礼物</a>
          </div>
      </div>
    </div> 
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import settings from '@/settings'
export default {
  components:{
  },
  props:['id'],
  data () {
    return {
      productdata:{},   //产品信息
      comment:{},   //评论
      num:1,   //购买数量
      settings,
      img:'',
      name:'',
      store_nums:0
    }
  },
  watch:{
    '$route'(){
    }
  }, 
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom",
      safeAreaTop:"safeAreaTop"
    })
  },
  created(){
    this.getData()
  },
  methods:{
    onLoad(){
    },
    getData() {
      let successCallback = data => {
        this.productdata = data;
        this.img = this.productdata.goods.img;
        this.name = this.productdata.goods.name;
        this.store_nums = this.productdata.goods.store_nums;
        
      };
      let params = { id: this.id };
      this.$store.dispatch({ type: "getProductData", successCallback, params });
    },
    plus(){
      if(this.num >= this.productdata.presents_num){
        this.$message.error('赠送数量不能大于拥有赠品数')
      }else{
      this.num ++ ;
      }
      return;
    },
    reduce(){
      if( this.num > 0 )this.num -- ;
      return;
    },
    sendGiftInfo(){
      let params = {
        id:this.id,
        gift_num:this.num,
        gift_price:this.productdata.goods.sell_price
      }
      this.$router.push({
        path:'//gift/make',
        query:params
      })
    },
    showGoodDetailInfo(){
      let path = `//gift/infoDetail/${this.productdata.goods.goods_id}`;
      let query = {
        info:{
          name:this.name,
          no:this.productdata.goods.goods_no,
          weight:this.productdata.goods.weight,
          create_time:this.productdata.goods.create_time
        },
        protect:{
          sale_protection:this.productdata.sale_protection
        }
      }
      this.$router.push({
        path:path,
        query:query
      });
    }
  }
}
</script>



<style lang="scss" scoped>

.libaoshangpin{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.product-img {
    text-align: center;
    background: #FFF;
}
.product-img img {
    width: 100%;
}
.product-info {
    color: #979797;
}
.product-info .pro-name {
    background-color: #F1F1F1;
    font-size: 1.2em;
    margin-bottom: 8px;
    padding: 10px 0;
    text-align: center;
    width: 100%;
    color: #F7762E;
}
dl.col-2 {
    position: relative;
}
dl.col-2 dt, dl.col-2 dd {
    height: 1.6em;
    line-height: 1.6em;
    padding: 0.5em 0;
    display: block;
}
dl.col-2 dt {
    vertical-align: middle;
    text-align: right;
    padding: 0.5em 0.4em;
    width: 100px;
    color: #000;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
}
dl.col-2 dd {
    color: #999;
    margin-left: 100px;
}
.item a.more{background: url("./images/arrow.png") no-repeat scroll 100% 50% rgba(0, 0, 0, 0);
	background-size:  0.75em 1.0em;
    color: #51545a;
    display: block;
    height: 100%;
    font-size: 1.4em;
    padding: 0.4em 0px;
}
.buy-num a, .buy-num input {
    border: 1px solid #ddd;
    color: #5e5e5e;
    float: left;
    height: 1.6em;
    width: 1.5em;
    line-height: 1.6em;
    padding: 0 0.3em;
    overflow: hidden;
    text-align: center;
    vertical-align: middle;
}
.buy-num input {
    border-width: 1px 0;
    width: 3.2em;
}
.vm {
    vertical-align: middle;
}
.red {
    color: #c00;
}
.clearfix:after {
    clear: both;
    content: "...";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
}
.product-info .price {
    color: #ff0500;
    font-size: 1.4em;
    font-weight: normal;
    float: left;
}
.spec-info {
    height: auto;
    position: relative;
}
dl.col-2 {
    position: relative;
}
.spec-item {
    z-index: 5;
}
.box {
    background-color: #fff;
    border: #ababab 1px solid;
    border-radius: 0.5em;
    padding: 0;
    margin: 1.5em 1em;
}
.product-detial {
    background-color: #fff;
    margin: 0.5em 0;
    padding: 0 10px;
}
.list-nav .item:last-child {
    border-bottom: none;
}
.product-detial span {
    color: #7d7d7d;
    margin-top: 10px;
    height: 20px;
}
.btn-bar {
    background: #fff;
    z-index: 10;
    display: table;
    width: 100%;
    padding-bottom: 2em;
    padding-top: 1em;
}
.btn-bar .col-2-1 {
    text-align: center;
    width: 50%;
    display: table-cell;
    padding: 0.25em 0.5rem;
}
.btn-bar .iconfont {
    font-size: 11pt;
    color: #523b17;
    display: inline-block;
    text-align: center;
    padding-top: 0px;
}
.icon-gouwuche:before {
    content: "\e626";
}
.btn {
    background: none repeat scroll 0 0 #ff3535;
    border: 1px solid #ff3535;
    border-radius: 0px;
    color: #fff;
    cursor: pointer;
    display: block;
    overflow: hidden;
    text-align: center;
    line-height: 1em;
    -webkit-appearance: none;
    border-radius: 0em;
    border-style: solid;
    border-width: 1px;
    font-size: 16px;
    line-height: 45px;
    overflow: hidden;
    text-align: center;
    font-weight: normal;
}
.fanhuianniu, .huishouye{
    position: absolute;
    width: 0.6rem;
    z-index: 100;
    opacity: 0.4;
    img{
      width: 100%;
      display: block;
    }
  }
  .fanhuianniu{
    left: 0.18rem;
  }
  .huishouye{
    right: 0.18rem;
  }
</style>

