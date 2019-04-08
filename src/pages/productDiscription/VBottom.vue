<template>
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
</template>

<script>
export default {
  props: ["productData"],

  methods: {
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
        this.$emit("getData");
      };
      let params = { goods_id: this.productData.id };
      this.$store.dispatch({ type: "addAttention", params, successCallback });
    },

    addToShopCart() {
      this.$message({
        message: "请选择商品规格和数量",
        type: "warning"
      });
      this.$router.replace(`///product/${this.productData.id}`);
    }
  }
};
</script>
<style lang="scss" scoped src="@/huizhongtangWebStatic/css/common.scss">
</style>


<style lang="scss" scoped>
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
.bottom-btn {
  padding-top: 0;
  padding-bottom: 0;
  background-color: #fff;
}
</style>
