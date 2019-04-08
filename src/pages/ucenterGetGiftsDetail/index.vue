<template>
  <div class="liwudiangdanxiangqing">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="礼物订单详情"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content :id="id"></v-content>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import VContent from './getGiftOrderDetail'
export default {
  components:{
    VContent
  },
  data () {
    return {
    }
  },
  created(){
    // console.log(this.id)
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
    id(){
      return this.$route.query.id
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.liwudiangdanxiangqing{
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
