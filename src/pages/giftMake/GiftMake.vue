<template>
  <div class="shengchenglibao">
    <div class="pb20 bg-white">
      <div class="mobile-top">
        <div class="top-info">
            <h3>送礼新方式</h3>
            <p>琞珍商城送礼，对方填地址，礼物送上门</p>
        </div>
      </div>
      <div class="mobile-link">
          <div class="mobile-like-all">
          <div class="link-left"><img :src="imgSrc" alt="" /></div>
          <div class="link-right">
              <a @click="$router.push('//gift/list')">
              <h3>开始挑选礼物</h3>
              <p>点击这里，挑选喜欢的礼物</p>
              <div class="link-san"><img src="static/images/san.png" alt=""></div> 
              </a>
          </div>
              <div class="product-img">
                <img class="giftImage" :src='giftImage' alt="" />
                <b v-if="this.id">商品名：{{this.productInfo.name}}</b><br>
                <b v-if="this.id">数量：{{this.gift_num}}</b>
              </div>
          </div>
            <div class="clear"></div>
      </div>
      <div class="mobile-gift">
        <div class="mcon">
            <div class="login-form-licai">
                <form method="post" id="form"  callback="checkReadme" novalidate="true">
                    <dl class="clearfix">
                        <dt>传达心意，写祝福语</dt>
                        <dd>
                            <input class="input" type="text" 
                            name="wishes" id="wishes" pattern="required" placeholder="写祝福语" 
                           inform="0"
                            v-model='massage'>
                        </dd>
                    </dl>
                    <input type="hidden" id="g_id" name="product_id" v-model="id">
                    <input type="hidden" name="product_num" v-model="gift_num">
                    <input type="hidden" name="product_price" v-model='gift_price'>
                </form>
                <div v-if="this.id" class="price-gift">
                    ￥: {{gift_price}}            </div>
                    <div class="price-gift" v-else>￥: 0.00</div>
              <div class="real-name-hm"> <input type="submit" 
              class="btn btn-mains real-name-zm" id="real-name-zms" 
              @click="giftMaking"
              value="生成礼物红包"></div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import settings from '@/settings';
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      massage:"",
      productInfo:{},//商品信息
      giftImage:'',//商品图片
      product_price:0,//商品价格
      beforeChoose:true,
      imgSrc:""
    }
  },
  props:['id','gift_num','gift_price'],
  created() {
    if(this.id && this.gift_num)this.beforeChoose = false;
    this.getData();
    this.imgSrc = `${settings.imgBaseUrl}`+ 'themes/mobile/images/liwu.png';
  },
  methods:{
    giftMaking(){
      //增加判断id是否为空,显示提示框
      if ( !this.id ) {
          this.$message.error('还未挑选礼物')
      }else{
        //增加判断祝福语是否为空,显示提示框
        if ( !this.massage ) {
          this.$message.error('请输入祝福语')
        }else{
          let successCallback = data=>{
            console.log('liwu',data)
            this.$router.push({
              path:'//gift/detail/' + data.order_no,
              query:data
            })
          }
          let params = {
            wishes:this.massage,
            product_id:this.id,
            product_num:this.gift_num,
            product_price:this.gift_price
          }
          this.$store.dispatch({type:'giftMaking',params,successCallback})
        }
      }
    },
    getData(){
      if( !this.beforeChoose ){//选中商品跳转才进行数据请求
        if( !this.id && this.beforeChoose ){
          this.$message.error('请先挑选礼物')
        }
        let successCallback = data=>{
          //获取图片并展示
          this.giftImage = settings.imgBaseUrl + data.goods.img;
          this.productInfo = data.goods;
        }
        let params = {
          id:this.id
        }
        this.$store.dispatch({type:'getProductData',params,successCallback})
      }

    },
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    })
  }
}
</script>

<style lang="scss" scoped src="../../huizhongtangWebStatic/css/common.scss"></style>
<style lang="scss" scoped src="../../delirenWebStatic/css/ucenter.css"></style>

<style scoped>
.libaoshangpin{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.mobile-top {
    padding: 0.1rem 15px 1.6rem;
    background: -webkit-linear-gradient(#e6293b, #e73541, #eb543f, #eb543f);
    background: -o-linear-gradient(#e6293b, #e73541, #eb543f, #eb543f);
    background: -moz-linear-gradient(#e6293b, #e73541, #eb543f, #eb543f);
    background: linear-gradient(#e6293b, #e73541, #eb543f, #eb543f);
}
.mobile-top h3 {
    font-size: 16pt;
    padding: 0.4rem 0;
    font-weight: normal;
    color: #fff;
}
.mobile-top p {
    font-size: 12pt;
    font-weight: normal;
    color: #ddd;
}
.mobile-link {
    width: 96%;
    margin: -10% auto .5rem;
    height:auto!important;
    border-radius: 10px;
    background: linear-gradient(to right, #f9ece4 , #fdf9f6, #fcefe9);
}
.mobile-like-all {
    padding: 10px;
}
.mobile-like-all .link-left {
    width: 20%;
    float: left;
}
.link-left img{
  width: 100%;
  height: auto;
}
.mobile-like-all .link-right {
    width: 75%;
    float: right;
    position: relative;
}
.link-right .link-san{
  position: absolute;
  right: 10px;
  top: 35%;
  width: 15px;
}
.mobile-like-all .link-right h3 {
    font-size: 14pt;
    color: #b5ab90;
    font-weight: normal;
    padding-bottom: 5px;
}
.mobile-like-all .link-right p {
    font-size: 11pt;
    font-weight: normal;
    line-height: 24px;
}
.mobile-gift {
  margin-top:10px; 
  padding: 10px;
}
.login-form-licai{    
  margin: 10px auto;
    background: none;
}
.login-form-licai form {
    margin-bottom: 10px;
    margin-top: 10px;
    border-radius: 8px;
}
.login-form-licai form dd input {
    border: 1px #ddd solid;
    padding: 0 2%;
    height: 50px;
    line-height: 50px;
    width: 100%;
    border-radius: 10px;
}
.login-form-licai form dt {
    width: 100%;
    position: relative;
    line-height: 26px;
    font-size: 14pt;
    padding-left: 15px;
}
.clearfix:after {
    clear: both;
    content: "...";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
}
.price-gift {
    font-size: 28pt;
    padding: 10px 0;
    text-align: center;
}
input.btn {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
}
.real-name-zm {
    background: #d22636;
    color: #fff;
    border-radius: 5px;
}
.giftImage {
    width: 100%;
    margin-bottom: 10px;
}
.product-img {
    text-align: center;
    float:left;
}
.product-img b{
  line-height: 0.5rem;
}
.mobile-like-all:after {
    content: '';
    display: table;
    clear: both;
}
.mobile-gift {
    padding: 10px;
}
.real-name-hm {
    width: 80%!important;
    display: block;
    margin: 20px auto 0;
}
.price-gift {
    font-size: 28pt;
    padding: 10px 0;
    text-align: center;
}
.clear {
  clear: both;
}
</style>