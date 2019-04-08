<template>
  <div class="tuiguang" ref="tuiguang">
    <div class="container clearfix" v-if="show">
      <!--{widget:name=sub_navs action=ucsidebar sidebar=$sidebar act=$actionId}-->
      <div class="islide gongkaike">
          <div class="containers">
            <div class="swiper-container gallery-top">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in extensionData" :key="index">
                  <div class="extension-one-img"></div>
                  <img :src="item" alt>
                  <div class="extension-intro"></div>
                </div>
              </div>
              <div class="swiper-button-next swiper-button-white"></div>
              <div class="swiper-button-prev swiper-button-white"></div>
            </div>

          </div>
        </div>
        <br>
        <div class="exbtn">
          <van-row type="flex" justify="space-between">
            <van-col span="7">
              <a
                class="btn btn_red"
                @click="ucenterApiPhoto_make"
              >刷新海报</a>
            </van-col>
            <van-col span="7">
              <a
                 class="btn btn_red"
                @success="copySuccess"
                @error="copyError"
                v-clipboard="share_url"
              >复制链接</a>
            </van-col>
            <van-col span="7">
              <a
                class="btn btn_red"
                v-if="extensionData.length>0"
                @click="savePicture"
                
              >保存图片</a>
            </van-col>
          </van-row>
        </div>
    </div>
    <div v-else class="errormessage">{{errorMessage}}</div>
  </div>
</template>

<script>
import settings from "@/settings";
import { mapGetters, mapState } from "vuex";
import { Dialog } from "vant";
import Swiper from "swiper";
// import 'swiper/dist/css/swiper.min.css';

import authorization from "@/common/authorization";
import { setTimeout } from "timers";
export default {
  props: ["headerHeight", "bottomHeight"],
  data() {
    return {
      show: false,
      errorMessage: "",
      extensionData: [],
      share_url: "",
      copyData: "copy data"
    };
  },
  computed: {
    ...mapGetters({
      fitPhoneTop: "fitPhoneTop",
      fitPhoneBottom: "fitPhoneBottom"
    })
  },
  created() {
    this.getUcenterApiExtension();
    if (localStorage.getItem("extensionData")) {
      let data = JSON.parse(localStorage.getItem("extensionData"));
      this.updateView(data);
    }
  },
  methods: {
    getUcenterApiExtension() {
      let successCallback = data => {
        console.log("tuig", data);
        if (data.error) {
          this.show = false;
          this.$message.error(data.message);
          this.errorMessage = data.message;
        } else {
          this.share_url = data.message.share_url;
          this.updateView(data.message.photoList);
        }
      };
      let params = {};
      this.$store.dispatch({
        type: "getUcenterApiExtension",
        params,
        successCallback
      });
    },

    //重新生成海报
    ucenterApiPhoto_make() {
      let successCallback = data => {
        this.updateView(data.photoList);
        this.$message({
          message: "重新生成海报成功",
          type: "success"
        });
      };
      let params = {};
      this.$store.dispatch({
        type: "ucenterApiPhoto_make",
        params,
        successCallback
      });
    },

    // 更新数据显示页面
    updateView(data) {
      this.show = true;
      localStorage.setItem("extensionData", JSON.stringify(data));
      let arr = [];
      for (let key in data) {
        arr.push(data[key]);
      }
      this.extensionData = arr;
      this.$nextTick(() => {
        // setTimeout(this.swiperCode,5000)
        this.swiperCode();
      });
    },

    swiperCode() {
      let showIndex = this.extensionData.length / 2;
      let galleryTop = new Swiper(".gallery-top", {
        spaceBetween: 10,
        initialSlide: showIndex,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev"
      });
    },
    savePicture() {
      let url = document.querySelector(".swiper-slide-active img").src;
      if (window.plus) {
        Dialog.confirm({
          title: "提示",
          message: "是否保存当前图片到相册？"
        })
          .then(() => {
            plus.gallery.save(url, () => {
              this.$message({
                message: "保存图片到相册成功",
                type: "success"
              });
            });
          })
          .catch(() => {});
      }
    },
    //复制分享地址
    copySuccess() {
      this.$toast("复制成功");
    },
    copyError(e) {
      console.log(e);
      this.$toast("不支持复制");
    }
  }
};
</script>
<style lang="scss" scoped src="../../huizhongtangWebStatic/css/common.scss">
</style>

<style lang="scss" scoped src="swiper/dist/css/swiper.min.css">
</style>
<style scoped lang="scss">
.tuiguang {
  flex-grow: 1;
  overflow-y: auto;
  background-color: #fff;
}
.header {
  display: block;
  position: relative;
  height: 0.85rem;
  flex-shrink: 0;
  box-sizing: content-box;
  background-color: #fff;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.85rem;
  color: #221122;
  border-bottom: 1px solid #dcdcdc;
  top:0;
}
.errormessage {
  text-align: center;
  font-size: 0.36rem;
  height: 0.85rem;
  line-height:0.85rem;
}
</style>

<style>
.tuiguang .swiper-slide img {
  width: 100%;
  height: auto;
  margin: auto 0;
  display: block;
}
.tuiguang .swiper-button-prev {
  left: 15px;
}
.tuiguang .swiper-button-next {
  right: 15px;
}
.tuiguang .swiper-slide {
  background-size: cover;
  background-position: center;
}
.tuiguang .gallery-top {
  height: 80%;
  width: 100%;
}
.tuiguang .gallery-thumbs {
  height: 18%;
  box-sizing: border-box;
  padding: 10px 0;
}
.tuiguang .gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 1;
}
.tuiguang .gallery-thumbs .swiper-slide-thumb-active {
  opacity: 1;
}
.textEx {
  display: none;
}
.shareUrl {
  font-size: 10px;
  color: #000;
  margin-right: 15px;
  display:flex;
  
  align-items: center;
}
.extension {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.exbtn{
  width: 100%;
  padding:20px;
}
.extension .copy-btn{
  background-color: #ddd;
  padding: 5px 10px;
  display: inline-block;
}
.btn_red.btn{
    margin: 0 auto;
    border: 1px solid #ff6633;
    color: #ff6633;
    text-align: center;
    border-radius: 4px;
    background-color: #fff;
    line-height: 40px;
}
.swiper-button-prev.swiper-button-white,.swiper-button-next.swiper-button-white{
  width: 20px;
  background-size: 15px;
}
</style>

