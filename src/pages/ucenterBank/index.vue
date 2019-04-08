<template>
  <div class="yinhangkaguanli">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="银行卡管理"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content-isset v-if="type=='isset'"></v-content-isset>
      <v-content :type="type" v-else></v-content>

    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import VContent from './VContent'
import VContentIsset from './VContentIsset'
export default {
  components:{
    VContent,
    VContentIsset
  },
  data () {
    return {
     
    }
  },

  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
    type(){
      return this.$route.params.type
    }
  },
  methods:{
    getSafety(){
      let successCallback = data=>{
        
      }
      this.$store.dispatch({type:'getUcenterSafety',successCallback})
    }
  },
  mounted() {
    //获取安全中心配置
    this.getSafety()
  }
}
</script>
<style scoped src="@/huizhongtangWebStatic/css/base.css"></style>
<style lang="scss" scoped>
.yinhangkaguanli{
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
  padding-top: 0.1rem;
}
.bottom{
  flex-shrink: 0;
}
</style>
