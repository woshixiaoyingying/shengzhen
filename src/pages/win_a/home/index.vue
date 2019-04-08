<template>
  <div class="home">
    <header class="g-header-container">
      <home-header :header_category_id="notice_category_id"></home-header>
    </header>
    <home-slider :ads="ads" v-if="ads.length>0"></home-slider>
    <!-- <img src="http://szsctest.ys.wangqi.vc/data/uploads/2019/03/25/eebea54d8dad51c89d4c9e42790c4167.png" alt="" class="bannerImg"> -->
    <home-nav :navInfo="navInfo"></home-nav>
    <home-notice :cate_name="cate_name" :notice_category_id="notice_category_id"></home-notice>
    <home-content :goodsInfo="goodsInfo"/>
    <home-footer :healthInfo="healthInfo" :footer_category_id="footer_category_id"/>
  </div>
</template>

<script>
import settings from "@/settings";
import imgCache from "@/common/imgCache";
import { mapGetters } from "vuex";
//组件
import HomeHeader from "./header";
import HomeSlider from "./slider";
import HomeNav from "./nav";
import HomeNotice from "./notice";
import HomeFooter from "./footer";
import HomeContent from "./content";
export default {
  components: {
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeNotice,
    HomeFooter,
    HomeContent
  },
  data() {
    return {
      hotGoodsData: [],
      settings,
      arts: [],
      cate_name: '',//公告标题
      notice_category_id:'1',//公告的文章列表category_id
      footer_category_id:'3',//养生中心文章列表
      ads: [],//广播轮播
      navInfo: [],//hoem-nav当中传的数据
      goodsInfo: [],//中间主内容
      healthInfo:[],//养生中心
      recImg: null,
      newImg1: null,
      newImg2: null,
      hotGoodsPage: 1,
      hotGoodsPageSize: 5,
      loading: false,
      finished: false,
      low_price: null,
      main_push: null,
      ztt: null
    };
  },
  computed: {
    ...mapGetters({
      fitPhoneTop: "fitPhoneTop"
    })
  },
  created() {
    this.getCache();
    this.getData();
    this.getAdvData();
  },
  methods: {
    onLoad() {
      this.hotGoodsPage = this.hotGoodsPage + 1;
    },
    //点击分类商品
    categroyClick(item) {
      let arr = item.link.split("/");
      let id = arr[arr.length - 1];
      let cate = arr[arr.length - 2];
      if (cate == "id") {
        this.$router.push(`///product/${id}`);
      } else if (cate == "cid") {
        this.$router.push(`/category/${id}/${item.name}`);
      }
    },
    // 设置缓存
    setCache(type) {
      let successCallback = () => {
        let data = {
          navInfo: this.navInfo,
          ads: this.ads,
          goodsInfo:this.goodsInfo,
          healthInfo:this.healthInfo,
          recImg: this.recImg,
          newImg1: this.newImg1,
          newImg2: this.newImg2
          // hotGoodsData:this.hotGoodsData
        };
        localStorage.setItem("homePageData", JSON.stringify(data));
      };
      this.cacheImg(type, successCallback);
    },
    //缓存图片
    cacheImg(type, successCallback) {
      switch (type) {
        case "navInfo":
         this.navInfo.map((item, index) => {
            imgCache(`${settings.imgBaseUrl}${item.img}`).then(res => {
              this.$set(this.navInfo, index, { ...this.navInfo[index], cacheImg: res });
              successCallback();
            });
          });;
          break;
        case "ads":
          this.ads.map((item, index) => {
            imgCache(`${settings.imgBaseUrl}${item.path}`).then(res => {
              this.$set(this.ads, index, { ...this.ads[index], cacheImg: res });
              successCallback();
            });
          });
          break;
        case "rec":
          let arr = ["recImg", "newImg1", "newImg2"];
          arr.map((item, index) => {
            // (item=>{
            if (!this[item]) {
              return;
            }
            imgCache(`${settings.imgBaseUrl}${this[item].path}`).then(res => {
              this.$set(this[item], "cacheImg", res);
              successCallback();
            });
            // })(item)
          });
          break;
        case "goodsInfo":
            this.goodsInfo.map((item, index) => {
            imgCache(`${settings.imgBaseUrl}${item.img}`).then(res => {
              this.$set(this.goodsInfo, index, { ...this.goodsInfo[index], cacheImg: res });
              this.$set(this.goodsInfo, index, { ...this.goodsInfo[index], titleImg: `static/images/pro-title0${index+1}.png` });
              successCallback();
            });
          });
          break;
        case "healthInfo":
         this.healthInfo.map((item, index) => {
            imgCache(`${settings.imgBaseUrl}${item.img}`).then(res => {
              this.$set(this.healthInfo, index, { ...this.healthInfo[index], cacheImg: res });
              successCallback();
            });
          });
          break;
        default:
          break;
      }
    },
    //获取缓存
    getCache() {
      let data = JSON.parse(localStorage.getItem("homePageData"));
      console.log('获取缓存数据',data)
      if (!data) {
        return;
      }
      for (let key in data) {
        this[key] = data[key];
      }
    },
    //获取三个广告位
    getAdvData() {
      let successCallback = data => {
        this.recImg = data.recImg;
        this.newImg1 = data.newImg[0];
        this.newImg2 = data.newImg[1];
        this.setCache("rec");
      };
      let params = {};
      this.$store.dispatch({
        type: "getHomePageAdvData",
        params,
        successCallback
      });
    },
    getData() {
      let successCallback = data => {
        let {goods_info, ads, low_price, main_push, ztt,cate_name,com_art} = data;
        let item;
        this.navInfo = [];//清空缓存当中的信息
        for(let i in com_art["2"]){
          item = com_art["2"][i];
          this.navInfo.push(item);
        }
        this.goodsInfo = goods_info;
        this.ads = ads;
        this.cate_name = cate_name
        this.low_price = low_price;
        this.main_push = main_push;
        this.ztt = ztt;
        this.healthInfo = [];//清空缓存当中的信息
        for(let i in com_art["3"]){
          item = com_art["3"][i];
          this.healthInfo.push(item);
        }
        this.setCache("ads");
        this.setCache("goodsInfo");
        this.setCache("healthInfo");
        this.setCache("navInfo")
      };

      this.$store.dispatch({ type: "getHomePageData", successCallback });
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  overflow: auto;
  position: relative;
  background-color: #f4f4f4;
}
.bannerImg {
  width: 100%;
  max-height: 488px;
}
</style>