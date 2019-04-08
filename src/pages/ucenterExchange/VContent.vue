<template>
  <div class="viewport main-viewport" style="font-size:10px">
    <div class="p20 bg-title-0 fz36">剩余酒米：
      <b class="red">{{ucenterApiExchangeData.winerice_num}}</b>
    </div>
    <div class="tab bg-white">
      <div class="tab-body ma20">
        <form class="simple">
          <dl>
            <dd class="h-box">
              兑换商品：
              <select id="goods_id" v-model="goods_id" class="selectpicker" styls="display:inherit">
                <option value="0">请选择兑换商品</option>
                <option :value="item.id" v-for="(item,index) in ucenterApiExchangeData.goodslist" :key="index">{{item.name}}</option>
              </select>
            </dd>
            <dd>
              <input type="button" class="btn" @click="submit" value="确认兑换">
            </dd>
            <input
              type="hidden"

            >
          </dl>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ucenterApiExchangeData: {},
      goods_id:'0'
    };
  },
  watch: {

  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let successCallback = data => {
        this.ucenterApiExchangeData = data;
      };
      let params = {};
      this.$store.dispatch({
        type: "ucenterApiExchange",
        params,
        successCallback
      });
    },
    submit() {
      if(this.goods_id=='0'){
        this.$message.error('请选择兑换商品')
        return false
      }

      let successCallback = data => {
        this.$router.go(-1)
      };
      let params = {
        goods_id: this.goods_id
      };
      this.$store.dispatch({
        type: "ucenterApiExchange_save",
        params,
        successCallback
      });
    }
  }
};
</script>

<style lang="scss" scoped src="../../huizhongtangWebStatic/css/common.scss">
</style>

<style scoped>
</style>