<template>
  <div class="welcome" :style="fitPhoneBottom">
   <van-swipe :show-indicators="false" :loop="false">
      <van-swipe-item><img src="static/images/1.jpg" alt="" class="item_img"></van-swipe-item>
      <van-swipe-item><img src="static/images/2.jpg" alt="" class="item_img"></van-swipe-item>
      <van-swipe-item><img src="static/images/3.jpg" alt="" class="item_img"></van-swipe-item>
      <van-swipe-item><img src="static/images/4.jpg" alt="" class="item_img"><img src="static/images/OpenHealth.jpg" alt="" class="openHealth" @click="$router.push(`/win_a/home`)"></van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      phoneParams: "phoneParams"
    }),
    ...mapGetters({
      fitPhoneBottom: "fitPhoneBottom"
    })
  }
};
</script>
<style lang="scss" scoped>
.welcome{
    background-color:#fff;
    position: relative;
    width: 100%;
    height: 100%;
}
.van-swipe-item{
    position: relative;

}
.van-swipe {
  height: 100%;
}

.item_img {
  bottom: 0;
  max-height: 100%;
  max-width: 100%;
  display: block;
  position: absolute;
  left: 50%;
  transform: translate(-50%,0);
}
.van-swipe-item{
  position: relative;
}
.openHealth{
    width: 30%;
    position: absolute;
    bottom: 11%;
    left: 50%;
    transform: translate(-50%,0)
}
</style>