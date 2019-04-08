<template>
 <!-- <li class="clearfix"  @click="productClick(item.id)">
    <div class="left">
      <img :src="`${settings.imgBaseUrl}${item.img}`" alt="">
    </div>
    <div class="right">
      <p class="title">
        {{item.name}}
      </p>
      <div class="price">
        <span class="huiyuan">会员价：</span>
        <span class="fuhao">￥</span>
        <span class="huiyuanjia">{{item.sell_price}}</span>
      </div>
      <div class="bottom">
        <p class="haoping">积分:{{item.point}}</p>
        <p class="yuexiao">月销{{item.sell_num}}件</p>
      </div>
    </div>
  </li> -->
  <li @click="productClick(item.id)">
    <img class="tupian" :src="`${settings.imgBaseUrl}${item.icon_app||item.img}`" alt="">
    <p class="title">{{item.name}}</p>
    <div class="price">
      <span class="huiyuan">会员价:</span>
      <span class="fuhao">￥</span>
      <span class="huiyuanjia">{{item.sell_price}}</span>
    </div>
    <p v-if="item.sell_num" class="yuexiao">月销{{item.sell_num}}件</p>
    <p class="jifen">积分:{{item.point}}</p>
  </li>
</template>

<script>
import settings from '@/settings'
export default {
  data(){
    return {
      settings
    }
  },
  props:["item"],
  methods:{
    //点击热销商品
    productClick(id){
      this.$router.push(`///product/${id}`)
    }
  }

}
</script>

<style lang="scss" scoped>
li{
  list-style: none;
  border-top: 1px solid #f5f5f5;
  padding: 0.28rem;
  box-sizing: border-box;
  position: relative;
  .tupian{
    display: block;
    height: 3.17rem;
    width: 6.88rem;
    border-radius: 0.12rem;
  }
  .title{
    font-size: 0.28rem;
    height: 0.28rem;
    line-height: 0.28rem;
    padding-top: 0.22rem;
    box-sizing: content-box;
  }
  .price{
    .huiyuan{
      font-size: 0.18rem;
    }
    .fuhao{
      font-size: 0.2rem;
      color: #ed1945;
    }
    .huiyuanjia{
      font-size: 0.28rem;
      color: #ed1945;
      position: relative;
      right: 0.1rem;
    }
  }
  .yuexiao{
    position: absolute;
    width: 2rem;
    height: 0.2rem;
    line-height: 0.2rem;
    color: #959595;
    right: 0;
    top: 4.1rem;
    font-size: 0.18rem;
    right: 0.28rem;
    text-align: right;
  }
  .jifen{
    position: absolute;
    width: 2rem;
    height: 0.2rem;
    line-height: 0.2rem;
    color: #959595;
    right: 0;
    top: 3.73rem;
    font-size: 0.18rem;
    right: 0.28rem;
    text-align: right;
  }
}
// li{
  // height: 2.68rem;
//   .left{
//     float: left;
//     height: 2.68rem;
//     padding-left: 0.2rem;
//     img{
//       display: block;
//       margin-top: 0.28rem;
//       width: 2.21rem;
//       height: 2.21rem;
//     }
//   }
//   .right{
//     width: 4.78rem;
//     padding-right: 0.25rem;
//     box-sizing: border-box;
//     height: 2.68rem;
//     border-bottom: 1px solid #dfdfdf;
//     float: right;
//     position: relative;
//     .title{
//       font-size: 0.35rem;
//       line-height: 0.4rem;
//       padding-top: 0.24rem;
//     }
//     .price{
//       width: 100%;
//       height: 0.32rem;
//       position: absolute;
//       top: 1.57rem;
//       left: 0;
//       span{
  
//         position: relative;
//         bottom: 0;
//       }
//       .huiyuan{
//         color: #d3b544;
//         font-size:0.2rem;
//         // left: 0;
//       }
//       .fuhao{
//         font-size: 0.2rem;
//         color: #212121;
//         left: -0.12rem;
//       }
//       .huiyuanjia{
//         font-size: 0.3rem;
//         color: #212121;
//         left:-0.2rem;
//         bottom: 0.04rem;
//         height: 0.3rem;
//         line-height: 0.3rem;
//       }
//       .huaxianjia{
//         font-size: 0.2rem;
//         color: #979797;
//         text-decoration:line-through;
//         // left: 2.56rem;
//       }
//     }
//     .bottom{
//       height: 0.28rem;
//       line-height: 0.28rem;
//       position: absolute;
//       top:2.2rem;
//       width: 100%;
//       padding-right: 0.25rem;
//       box-sizing: border-box;
//       p{
//         font-size: 0.26rem;
//         line-height: 0.28rem;
//         color: #9b9b9b;
//         width: 2.2rem;
//       }
//       .haoping{
//         float: left;
//         text-align: left;
//       }
//       .yuexiao{
//         float: right;
//         text-align: right;
//       }
//     }
//   }
// }
</style>