<template>
  <div class="mine-navbar" :style="fitPhoneTop">
    <div class="mine-navbar-left">
      <!-- <img src="static/images/sao.png" @touchstart="goToBarcode"> -->
    </div>
    <div class="mine-navbar-center">
      <img src="static/images/logo.png">
    </div>
    <div class="mine-navbar-right">
      <router-link :to="{path:'//article/list',query:{category_id:header_category_id}}">
          <img src="static/images/xinxin.png">
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomeHeader",
  props:["header_category_id"],
  data() {
    return {
      visible: true
    };
  },
  computed:{
...mapGetters({
      fitPhoneTop: "fitPhoneTop"
    })
  },
  methods: {

    goToBarcode() {
      this.$router.push("/barCode");
    }
  }
};
</script>

<style lang="scss" scoped>
.mine-navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color:transparent;

  &-left {
    margin-left: 10px;

    ~ .mine-navbar-right {
      position: static;
    }
  }

  &-right {
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: 100%;
   
  }
}
.icon{
  color:#fff;
}
.mine-navbar-center{
  display: flex;
  align-items: center;
}
.mine-navbar-center img{
  width: 40%;
  margin: 0 auto;
}
.mine-navbar-left img,.mine-navbar-right img{
  width: 60%;
}
</style>
