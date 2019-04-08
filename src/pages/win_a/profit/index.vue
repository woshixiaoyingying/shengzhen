<template>
  <div class="profit" :style="fitPhoneTop">
          <van-nav-bar
        title="我的收益"
        @click-left="$router.go(-1)"
        left-arrow
      />
      <v-content></v-content>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VContent from './VContent'
  export default {
    components:{VContent},
     computed:{
...mapGetters({
      fitPhoneTop: "fitPhoneTop"
    })
  }
  }
</script>

<style scoped>
.profit{
   width: 100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
</style>