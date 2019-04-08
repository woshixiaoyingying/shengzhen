<template>
  <div class="g-tabbar" :style="fitPhoneBottom">
    <router-link to="/win_a/home" class="g-tabbar-item">
      <i class="icon iconfonts icon-home"></i> 首页
    </router-link>
    <router-link to="/win_a/extension" class="g-tabbar-item">
      <i class="icon iconfonts icon-tui"></i> 推广
    </router-link>
    <router-link to="/win_a/shopcart" class="g-tabbar-item">
      <i class="icon iconfonts icon-cart"></i> 购物车
    </router-link>
    <router-link to="/win_a/mine" class="g-tabbar-item">
      <i class="icon iconfonts icon-personal"></i> 个人中心
    </router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "CTabbar",
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

<style scoped lang='scss'>
.g-tabbar {
  display: flex;
  width: 100%;
  &-item {
    flex: 1;
    display: flex;
    font-size: 10pt;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .iconfont {
      margin-bottom: 4px;
      font-size: 0.5rem;
    }
  }
}

.router-link-active {
  color: #ff6633;
}
.iconfonts {
  margin-bottom: 5px;
}
</style>