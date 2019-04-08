<template>
  <div class="shouhuodizhi">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="收货地址"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content :addressData="addressData"></v-content>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import VContent from './VContent'
export default {
  data(){
    return {
   
    }
  },
  components:{
    VContent
  },
  computed:{
    ...mapState({
      addressData:"addressData"
    }),
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      this.$store.dispatch({type:'getUcenterAddress'})
    }
  }
}
</script>
<style scoped src="@/huizhongtangWebStatic/css/base.css"></style>
<style lang="scss" scoped>
.shouhuodizhi{
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
