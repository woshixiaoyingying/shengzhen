<template>
  <div class="shengchenglibao">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title='制作礼物红包'
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content :id="id" :gift_num="gift_num" :gift_price="gift_price"></v-content>
    </div>
    <div class="bottom" :style="fitPhoneBottom">
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import VContent from './GiftMake'
export default {
  data(){
    return {
    }
  },
  components:{
    VContent
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
    id(){
      return this.$route.query.id
    },
    gift_num(){
      return this.$route.query.gift_num
    },
    gift_price(){
      return this.$route.query.gift_price
    }
  }
}
</script>
<style scoped src="@/huizhongtangWebStatic/css/base.css"></style>
<style lang="scss" scoped>
.shengchenglibao{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.header{
  flex-shrink: 0;
  border-bottom: 1px solid #dcdee3;
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
