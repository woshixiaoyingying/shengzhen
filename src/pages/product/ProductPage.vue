<template>
  <div class="content">
    <p class="fanhuianniu" :style="{top:`${safeAreaTop+10}px`}" @touchstart="$router.go(-1)">
      <img src="./images/fanhuianniu_03.png" alt>
    </p>
    <p
      class="huishouye"
      :style="{top:`${safeAreaTop+10}px`}"
      @touchstart="$router.replace('/win_a/home')"
    >
      <img src="./images/2222.png" alt>
    </p>
    <p class="share" :style="{top:`${safeAreaTop+10}px`}">
      <img src="./images/share.png" @click="Share">
    </p>
    <!-- Start 图片展示 -->
    <div class="content1" ref="content1" v-touch:up="contentTouchUp" style="overflow:scroll">
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottomDistance="40"
        ref="loadmore"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
      >
        <div class="inner-content" :style="{minHeight:`${innerContentHeight}px`}">
          <div>
            <div class="product-img">
              <img :src="`${settings.imgBaseUrl}${goods.img}`">
            </div>
          </div>
          <!-- End 图片展示 -->
          <h1 class="pro-name">{{goods.name}}</h1>
          <div class="jiage">
            <div class="xiaoshoujia">销售价：</div>
            <div class="jiagein">
              <span class="renminbi">￥</span>
              {{sell_price}}
            </div>
            <div class="jifen">(返{{point}}金豆)</div>
          </div>
          <div class="guige clearfix">
            <div class="guige1 clearfix" v-for="(value,key) in specs" :key="key">
              <div class="guigeming">{{value.name}}：</div>
              <ul class="spec-values">
                <li
                  :class="specItemClassName(key,`${value.id}:${val.id}`)"
                  v-for="(val,ke) in value.value"
                  :key="ke"
                  @click="specClick(key,`${value.id}:${val.id}`)"
                >
                  <span>{{val.name}}</span>
                </li>
              </ul>
            </div>

            <div class="shuliang clearfix">
              <div class="guigeming goumaishuliang">购买数量：</div>
              <div class="buy-num">
                <p class="buyNumber">
                  <a @click="changeBuyNums(-1)">-</a>
                  <span>
                    {{num}}
                    <!-- <input  name="buy_num" v-model='num' type="number" maxlength="5"> -->
                  </span>
                  <a @click="changeBuyNums(+1)">+</a>
                </p>
                <p class="storage">
                  库存：
                  <b id="store_nums" class="red">{{store_nums}}</b>
                </p>
              </div>
            </div>
            <div class="spec-item clearfix" v-if="showSpecMsg">
              <div>
                <p class="msg">
                  <i class="icon icon-alert"></i>
                  <span>{{showSpecMsg}}</span>
                </p>
              </div>
            </div>
          </div>
          <ul class="box1">
            <li class="item item1" @click="$router.push(`////product_comment/${goods.id}`)">
              <p class="name">用户评价：</p>
              <!-- <span class="score fl">
                <i :style="commentStar"></i>
              </span>-->
              <p class="right">
                共有({{comment.total}}) 人参与评价 
                <span>》</span>
              </p>
            </li>
          </ul>
          <p class="shanglaxiangqing">上拉查看图文详情</p>
        </div>
      </mt-loadmore>
    </div>

    <div class="btn-bar bottom-btn">
      <div class="col-2-1">
        <a id="attention" class="btn-white">
          <i class="icon-shou-1" @click="attentionClick" ref="icon_shou"></i>
          收藏
        </a>
      </div>
      <div class="col-2-1">
        <a @click="addToShopCart" id="add-cart" class="btn">
          <i class="iconfont icon-gouwuche"></i> 加入购物车
        </a>
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <v-share @sharePeng="sharePeng" @pengyouquan="pengyouquan"></v-share>
    </van-popup>
  </div>
</template>

<script>
import { Dialog } from "vant";
import settings from "@/settings";
import { mapGetters } from "vuex";
import VShare from "@/pages/components/share";
export default {
  props: ["id"],
  data() {
    return {
      isAutoFill: false,
      allLoaded: false,
      settings,
      guanzhu: true,
      productData: {},
      // 选中的规格代号
      selectedSpec: {},

      //商品有几种规格需要去选的
      allSpecName: {},

      //购买数量
      num: 1,

      //提示选择规格
      showSpecMsg: "",

      //提示添加成功
      showIsAdd: false,

      comment: {}, //评论

      innerContentHeight: 0,
      show: false
    };
  },
  components: {
    VShare
  },
  computed: {
    ...mapGetters({
      fitPhoneTop: "fitPhoneTop",
      fitPhoneBottom: "fitPhoneBottom",
      safeAreaTop: "safeAreaTop"
    }),
    goods() {
      return this.productData.goods || {};
    },
    //分类
    specs() {
      if (Array.isArray(this.goods.specs) && this.goods.specs.length == 0) {
        return {};
      }
      for (let key in this.goods.specs) {
        this.$set(this.allSpecName, key, "");
      }
      return this.goods.specs;
    },

    // 各种规格组合的唯一的sku
    skumap() {
      return this.productData.skumap || {};
    },

    //选中的sku
    selectedSku() {
      return this.skumap[this.getSkuKey()] || {};
    },

    //要显示的库存数量
    store_nums() {
      if (this.ckeckIsSelectAllspec()) {
        if (this.selectedSku.store_nums < 1) {
          this.num = 0;
        }
        return this.selectedSku.store_nums;
      }
      return this.goods.store_nums;
    },

    //要显示的价格
    sell_price() {
      if (this.ckeckIsSelectAllspec()) {
        if (this.productData.isFansLevelUpper == 1) {
          return this.selectedSku.sell_price;
        } else {
          return this.selectedSku.market_price;
        }
      }
      return this.goods.cost_price;
    },

    //要显示的积分
    point() {
      //  if(this.ckeckIsSelectAllspec()){
      //   if(this.productData.isFansLevelUpper==1){
      //     return this.selectedSku.point
      //   }else{
      //     return this.selectedSku.market_point
      //   }
      // }
      return this.goods.point;
    },

    // 评论星星
    commentStar() {
      return this.comment.a ? { width: this.comment.a.percent + "%" } : {};
    }
  },
  created() {
    this.getData();
  },
  methods: {
    loadBottom() {
      this.allLoaded = true; // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
      this.$router.push(`////productDiscription/${this.goods.id}`);
    },
    onBottomLoaded() {
      console.log("onbottomloaded");
    },
    getInnerContentHeight() {
      let height = this.$refs.content1.offsetHeight;
      this.innerContentHeight = height + 20;
    },

    contentTouchUp(e) {
      // console.log(e)
      this.$router.push(`////productDiscription/${this.goods.id}`);
    },

    getData() {
      let successCallback = data => {
        this.productData = data;
        this.comment = data.comment;
      };
      let params = { id: this.id };
      this.$store.dispatch({ type: "getProductData", successCallback, params });
    },

    //商品规格的class名
    specItemClassName(key, value) {
      if (this.allSpecName[key] == value) {
        return ["selected"];
      }
      return "";
    },

    //选择规格
    specClick(key, value) {
      this.$set(this.allSpecName, key, value);
    },

    // 检测是不是每个规格是不是都选择了属性
    ckeckIsSelectAllspec() {
      for (let key in this.allSpecName) {
        if (this.allSpecName[key] == "") {
          return false;
        }
      }
      return true;
    },

    // 获取skukey
    getSkuKey() {
      let arr = [];
      for (let key in this.allSpecName) {
        arr.push(this.allSpecName[key]);
      }
      if (arr.length < 1) {
        return "";
      }
      let str = `;${arr.join(";")};`;
      console.log(str);
      return str;
    },

    //选择数量
    changeBuyNums(num) {
      this.num = this.num + num;
      if (this.num > this.store_nums) {
        this.num = this.store_nums;
      }
      if (this.num < 0) {
        this.num = 0;
      }
    },

    // 加入购物车
    addToShopCart() {
      let successCallback = data => {
        Dialog.confirm({
          title: "标题",
          message: "商品已加入购物车是否去结算"
        })
          .then(() => {
            // on confirm
            this.$router.push("/win_a/shopcart");
          })
          .catch(() => {
            // on cancel
          });
      };

      if (!this.ckeckIsSelectAllspec()) {
        this.showSpecMsg = "请选择商品规格";
        return;
      }

      if (this.num == 0) {
        this.showSpecMsg = "请选择商品数量";
        return;
      }

      this.showSpecMsg = "";

      let params = { id: this.selectedSku.id, num: this.num };
      this.$store.dispatch({ type: "addToShopCart", successCallback, params });
    },

    // 加关注
    attentionClick() {
      let icon_shou = this.$refs.icon_shou;
      if (this.guanzhu) {
        icon_shou.classList.add("icon-shou");
        icon_shou.classList.remove("icon-shou-1");
        this.guanzhu = false;
      } else {
        icon_shou.classList.remove("icon-shou");
        icon_shou.classList.add("icon-shou-1");
        this.guanzhu = true;
      }

      let successCallback = data => {
        this.getData();
      };
      let params = { goods_id: this.goods.id };
      this.$store.dispatch({ type: "addAttention", params, successCallback });
    },
    //分享
    Share() {
      this.show = !this.show;
    },
    //分享给微信朋友
    sharePenguin(){
      
    },
    //分享到朋友圈
    pengyouquan(){

    }
  },
  mounted() {
    this.getInnerContentHeight();
  }
};
</script>
<style lang="scss" scoped src="@/huizhongtangWebStatic/css/common.scss">
</style>

<style lang="scss" scoped>
.content {
  font-family: "微软雅黑";
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  .fanhuianniu,
  .huishouye,
  .share {
    position: absolute;
    width: 0.6rem;
    z-index: 100;
    opacity: 0.4;
    img {
      width: 100%;
      display: block;
    }
  }
  .fanhuianniu {
    left: 0.18rem;
  }
  .share {
    right: 0.18rem;
  }
  .huishouye {
    right: 0.9rem;
  }
  .product-img {
    // padding:0.2rem 0.2rem 0 0.2rem;
    background-color: #fff;
    img {
      width: 100%;
      display: block;
      min-height: 4rem;
    }
  }
  .pro-name {
    background-color: #fff;
    line-height: 0.9rem;
    font-size: 0.4rem;
    padding-left: 0.2rem;
    box-sizing: border-box;
  }
  .jiage {
    height: 0.8rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    box-sizing: border-box;
    background-color: #fff;
    .xiaoshoujia {
      font-size: 0.3rem;
      color: #959595;
      height: 0.8rem;
      line-height: 0.8rem;
      width: 1.5rem;
      float: left;
    }
    .jiagein {
      .renminbi {
        font-family: "微软雅黑";
        font-size: 0.2rem;
        position: relative;
        left: 0.1rem;
      }
      color: #de0000;
      font-size: 0.45rem;
      line-height: 0.8rem;
      height: 0.8rem;
      float: left;
      width: 4rem;
    }
    .jifen {
      font-family: "微软雅黑";
      float: right;
      width: 1.5rem;
      text-align: right;
      font-size: 0.3rem;
      line-height: 0.8rem;
      color: #ccc;
    }
  }
  .guige {
    background-color: #fff;
    margin-top: 0.1rem;
    .guige1 {
      padding: 0 0.2rem;
      box-sizing: border-box;
      display: flex;
      .guigeming {
        line-height: 0.94rem;
        font-size: 0.3rem;
        line-height: 0.94rem;
        flex-grow: 0;
        text-align: left;
      }

      .spec-values {
        flex-grow: 1;
        width: 5.4rem;
        padding-top: 0.2rem;
        padding-bottom: 0.1rem;
        li {
          display: inline-block;
          margin-left: 0.2rem;
          line-height: 0.6rem;
          span {
            border: 1px solid #a9a9a9;
            font-size: 0.3rem;
            border-radius: 0.3rem;
            padding: 0.05rem 0.2rem;
            line-height: 0.3rem;
          }
        }
        .selected span {
          border: 1px solid #f07511;
        }
      }
    }
  }
  .shuliang {
    padding: 0 0.2rem;
    box-sizing: border-box;
    border-top: 1px solid #f7f7f7;
    .guigeming {
      line-height: 0.94rem;
      font-size: 0.3rem;
      line-height: 0.94rem;
      width: 1.8rem;
      text-align: left;
      float: left;
    }
    .buy-num {
      width: 5rem;
      height: 0.95rem;
      float: right;
      .buyNumber {
        font-family: "微软雅黑";
        margin-top: 0.23rem;
        width: 1.94rem;
        height: 0.5rem;
        border: 1px solid #a9a9a9;
        border-radius: 0.25rem;
        display: flex;
        justify-content: space-between;
        float: right;
        a {
          flex: 0 auto;
          width: 0.57rem;
          display: block;
          font-size: 0.5rem;
          line-height: 0.5rem;
          text-align: center;
        }
        span {
          display: block;
          flex-grow: 1;
          font-size: 0.3rem;
          text-align: center;
          line-height: 0.5rem;
          border-left: 1px solid #a9a9a9;
          border-right: 1px solid #a9a9a9;
        }
      }
      .storage {
        text-align: right;
        font-size: 0.3rem;
        color: #a9a9a9;
        float: right;
        line-height: 0.5rem;
        margin-top: 0.23rem;
        padding-right: 0.2rem;
      }
    }
  }
  .spec-item {
    padding-left: 0.2rem;
    .msg {
      color: #de0000;
      font-size: 0.1rem;
    }
  }
  .box1 {
    // width:7.1rem;
    // height: 2rem;
    border-radius: 0.09rem;
    background: #fff;
    margin: 0 auto;
    margin-top: 0.28rem;
    margin-bottom: 0.2rem;
    .item {
      padding: 0 0.21rem;
      height: 1rem;
      .name {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.3rem;
        text-align: left;
        width: 2.5rem;
        float: left;
      }
      .right {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.25rem;
        text-align: right;
        width: 3.5rem;
        float: right;
        color: #959595;
      }
    }
    .item1 {
      font-family: "微软雅黑";
      border-bottom: 1px solid #f7f7f7;
    }
  }
  .bottom-btn {
    padding-top: 0;
    padding-bottom: 0;
    background-color: #fff;
  }
}

.content1 {
  flex-grow: 1;
  overflow-y: auto;
  .shanglaxiangqing {
    text-align: center;
    color: #707070;
  }
}

.box2 {
  height: 0.98rem;
  flex-shrink: 0;
  .left,
  .right {
    width: 50%;
    text-align: center;
    font-size: 0.3rem;
    line-height: 0.98rem;
    float: left;
  }
  .left {
    background: #fff;
    display: flex;
    justify-content: center;
    height: 0.98rem;
    .kefu,
    .shoucang {
      color: #000;
      width: 1.4rem;
      height: 0.98rem;
      box-sizing: border-box;
      padding-top: 0.1rem;
      i,
      i::before {
        margin: 0 auto;
        display: block;
        width: 0.45rem;
        height: 0.45rem;
        font-size: 0.45rem;
        line-height: 0.45rem;
        display: block;
      }
      p {
        margin-top: 0.05rem;
        font-size: 0.25rem;
        line-height: 0.25rem;
        text-align: center;
      }
    }
  }
  .right {
    color: #fff;
    background: -webkit-linear-gradient(left, #008030, #008030);
  }
}
</style>
