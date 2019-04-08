<template>
  <div class="wodezixun">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="商品咨询"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <van-tabs v-model="activeTab">
        <van-tab title="已答复">
          <consult-y></consult-y>
        </van-tab>
        <van-tab title="未答复">
          <consult-n></consult-n>          
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import ConsultY from './ConsultY'
import ConsultN from './ConsultN'

export default {
  components:{
    ConsultY,
    ConsultN
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
