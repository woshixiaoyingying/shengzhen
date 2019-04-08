<template>
  <div class="shareCom">
    <van-row>
      <van-col span="6">
          <img src="static/images/weixin.png" @click="sharePeng">
          <p>微信好友</p>
      </van-col>
      <van-col span="6">
          <img src="static/images/pengyouquan.png" @click="pengyouquan">
          <p>朋友圈</p>
      </van-col>

    </van-row>
  </div>
</template>

<script>
export default {
  name: "VShare",
  methods:{
    sharePeng(){
this.$emit("sharePeng")
    },
    pengyouquan(){
      this.$emit("pengyouquan")
    }
  }
};
</script>

<style scoped>
.shareCom{
    width: 100%;
    padding: 20px;
}
.shareCom img{
    display: block;
    width: 40px;
    margin: 0 auto 10px;
}
.shareCom .van-col{
    justify-content: center;
    flex-direction: column;
}
.shareCom .van-col p{
    text-align: center;
}
</style>