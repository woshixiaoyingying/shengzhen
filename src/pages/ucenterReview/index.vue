<template>
  <div class="wodezixun">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="商品评价"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <van-tabs v-model="activeTab">
        <van-tab title="待评价">
          <review-n></review-n>
        </van-tab>
        <van-tab title="已评价">
          <review-y></review-y>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import ReviewY from './ReviewY'
import ReviewN from './ReviewN'


export default {
  components:{
    ReviewY,
    ReviewN
  },
  data () {
    return {
      activeTab:0
    }
  },

  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
  }
}
</script>
<style lang="scss" scoped>
.wodezixun{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.header{
  flex-shrink: 0;
  background: #fff;
}
.content{
  flex-grow:1;
  overflow-y: auto;
}
.bottom{
  flex-shrink: 0;
}
</style>
