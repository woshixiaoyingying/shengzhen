<template>
  <div class="shop-cart" >
    <div class="header" :style="fitPhoneTop">
      <p>购物车</p>
      <p class="guanli" v-if="totalNum!=0" @click="showDelbutton=!showDelbutton">{{showDelbutton ? '取消':'管理'}}</p>
    </div>
    <div class="content" v-if="totalNum!=0">
      <ul>
        <li class="list" v-for="(item,key) in shopCartData" :key="key">
          <!-- <div class="dian">
            <img v-if="item==1" src="./images/xuanzhong_03.jpg" alt="">
            <img v-else src="./images/weixuanzhong_03.jpg" alt="">
          </div> -->
          <div class="tu">
            <img :src="`${settings.imgBaseUrl}${item.img}`" alt="">
          </div>
          <div class="right">
            <p class="title">{{item.name}}</p>
            <div class="model" v-if="haveSpec(item)">
              <span v-for="(specItem,key) in item.spec" :key="key">
                {{`${specItem.value[2]};`}}
              </span>
            </div>
            <div class="price">
              <span class="biao">￥</span>
              {{item.price}}
            </div>
            <div class="zengjian">
              <div @click="changeNum(item.id,(item.num-1))" class="jian">-</div>
              <div class="num">{{item.num}}</div>
              <div @click="changeNum(item.id,(item.num+1))" class="jia">+</div>
            </div>
          </div>
          <button v-if="showDelbutton" class="delete-item"  @click="deleteItem(item)">删除</button>
        </li>
      </ul>
    </div>
    <no-goods v-else></no-goods>
    <div class="bottom" v-if="totalNum!=0">
      <!-- <div class="quanxuan">
        <img v-if="true" src="./images/weixuanzhong_03.jpg" alt="">
        <img v-else src="./images/xuanzhong_03.jpg" alt="">
        全选
      </div> -->
      <div class="heji">
        合计(不含运费)：
        <span class="biao"></span>
        <span class="jia">￥{{totalPrice}}</span>
      </div>
      <div class="gong">
        共{{totalNum}}件
      </div>
      <div class="but" @click="$router.push('//simple/order')">
        立即结算
      </div>
    </div>
    <div v-else></div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import {number_format} from '@/common/common'
import settings from '@/settings'
import  NoGoods  from "./NoGoods";
export default {
  components:{
    NoGoods
  },
  data () {
    return {
      shopCartData:{},
      settings,
      showDelbutton:false
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
    // 总价
    totalPrice(){
      let price = 0
      for(let key in this.shopCartData){
        price+=(this.shopCartData[key].sell_total)
      }
      return number_format(price)
    },

    // 总件数
    totalNum(){
      let num = 0
      for(let key in this.shopCartData){
        num+=1
      }
      return num
    }
  },
  methods:{
    getData(){
      let successCallback = data=>{
        this.shopCartData = data
      }
      this.$store.dispatch({type:'getShopCartData',successCallback})
    },
    // 删除购物车商品
    deleteItem(item){
      let successCallback = data=>{
        this.getData()
      }
      let params = {id:item.id}
      this.$store.dispatch({type:'delShopCartItem',params,successCallback})
    },
    // 获取规格
    haveSpec(item){
      if(Array.isArray(item.spec)){
        return false
      }else{
        return true
      }
    },
    //修改购物车数量
    changeNum(id,num){
       let successCallback = data=>{
        this.shopCartData = data
      }
      let params={id,num}
      this.$store.dispatch({type:'changeShopCartGoodsNum',params,successCallback})
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.header::after{
  content: " ";
 border-bottom: 1px solid #dcdcdc;
 position: absolute;
 bottom: 0;
 width: 100%;
 left: 0;
 transform: scaleY(0.5)
}
.shop-cart{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #f7f7f7;
  flex-grow: 1;
  .header{
    position: relative;
    height: 0.85rem;
    flex-shrink:0;
    box-sizing: content-box;
    background-color: #fff;
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.85rem;
    color: #221122;
   
    .guanli{
      width: 1.25rem;
      height: 0.85rem;
      line-height: 0.85rem;
      text-align: center;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  .content{
    flex-grow:1;
    overflow-y: auto;
    ul{
      .list{
        height: 2.4rem;
        border-bottom: 1px solid #e4e4e4;
        background-color: #fff;
        padding: 0.20rem 0.34rem 0.41rem 0.18rem;
        box-sizing: border-box;
        position: relative;
        .dian{
          width: 0.4rem;
          height: 0.4rem;
          margin-top: 0.79rem;
          float: left;
          img{
            display: block;
            width: 100%;
          }
        }
        .tu{
          float: left;
          margin-left: 0.28rem;
          width: 1.8rem;
          height: 1.8rem;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .right{
          width: 4.3rem;
          float: right;
          height: 1.8rem;
          position: relative;
          .title{
            line-height: 0.25rem;
            font-size: 0.24rem;
            overflow: hidden;
            height: 0.25rem;
          }
          .model{
            height: 0.3rem;
            line-height: 0.3rem;
            color:#949494;
            font-size: 0.2rem;
            margin-top: 0.2rem;
          }
          .price{
            width: 2rem;
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: 0.24rem;
            line-height: 0.24rem;
            color: #ff6633;
            .biao{
              font-size: 0.2rem;
              position: relative;
              left: 0.08rem;
            }
          }
          .zengjian{
            overflow: hidden;
            width: 2.17rem;
            height: 0.57rem;
            border-radius: 0.3rem;
            border: 1px solid #dedede;
            display: flex;
            position: absolute;
            font-size: 0.3rem;
            line-height: 0.57rem;
            text-align: center;
            right: 0;
            bottom:0;
            justify-content:space-between;
            .jian,.jia{
              width: 0.62rem;
              flex-shrink: 0;
              align-items:stretch;
            }
            .disable{
              color: #dedede;
            }
            .num{
              flex-grow: 1;
              border-left: 1px solid #dedede;
              border-right: 1px solid #dedede;

            }
          }
        }
        .delete-item{
          position: absolute;
          display: block;
          width: 0.9rem;
          height: 0.4rem;
          text-align: center;
          line-height: 0.35rem;
          padding: none;
          background: #ff6633;
          border-radius: 0.2rem;
          font-size: 0.2rem;
          padding: none;
          right: 0.2rem;
          top: 0.4rem;
          color: #fff;
        }
      }
    }
  }
  .bottom{
    flex-shrink: 0;
    height: 1.99rem;
    background-color: #fff;
    position: relative;
  }
  .quanxuan{
    width: 1.34rem;
    height: 1.07rem;
    text-align: center;
    line-height: 1.07rem;
    font-size: 0.26rem;
    float: left;
    color: #909090;
    img{
      width: 0.4rem;
      position: relative;
      top: 0.35rem;
    }
  }
  .gong{
    width: 0.8rem;
    height: 1.07rem;
    text-align: center;
    line-height: 1.07rem;
    font-size: 0.24rem;
    float: left;
    margin-left: 0.5rem;
    color: #909090;
  }
  .heji{
    width: 4.8rem;
    float: right;
    line-height: 1.07rem;
    height: 1.07rem;
    text-align: right;
    padding-right: 0.2rem;
    .biao{
      color: #ff6633;
    }
    .jia{
      color: #ff6633;
      font-size: 0.31rem;
    }
  }
  .but{
    // background-image: url('./images/btnbeijing_28.jpg');
    color: #ff6633;
    background-color: #fff;
    border: 1px solid #ff6633;
    border-radius: 0.32rem;
    background-size: 100%;
    background-repeat: no-repeat;
    width: 2.84rem;
    height: 0.64rem;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.64rem;
    position: absolute;
    top: 1.07rem;
    left: 0;
    right: 0;
    margin: auto;
  }
}

</style>
