<template>
  <div class="slider-wapper">
    <van-swipe @change="onChange" :autoplay="3000">
      <van-swipe-item v-for="(item, index) in ads" :key="index">
        <img :src="item.cacheImg" class="bannerImg">
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">
        <i class="indicator_item" v-for="(item,index) in ads" :dataNum="index" :key="index"></i>
      </div>
    </van-swipe>
  </div>
</template>

<script>
import settings from "@/settings";
export default {
  name: "HomeSlider",
  data() {
    return {
      dataNum: 0,
      current: 0,
      settings,
    };
  },
  props: {
    ads: {
      type: Array,
      required: true
    }
  },
  mounted(){
    console.log('幻灯',this.ads)
  },
  methods: {
    onChange(index) {
      let active_i = document.getElementsByClassName("indicator_item");
      for (let i = 0; i < active_i.length; i++) {
        active_i[i].classList.remove("active");
      }
      active_i[index].classList.add("active");
    }
  }
};
</script>

<style scoped lang='scss'>
.slider-wapper {
  width: 100%;
  background-color: #fff;
}
.van-swipe {
  height: 100%;
}
.bannerImg {
width: 100%;
}
.van-swipe__indicators {
  width: 20px;
  height: 20px;
  background-color: #fff;
}
.custom-indicator {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
  display: flex;
  justify-items: center;
}

</style>