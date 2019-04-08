<template>
  <div class="zhanghuanquan">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="账户安全"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content></v-content>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import VContent from './VContent'
export default {
  components:{
    VContent
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
  },
}
</script>
<style lang="scss" scoped>
.zhanghuanquan{
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
