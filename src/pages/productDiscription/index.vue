<template>
  <div class="xiangxi">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="图文详情"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content :discriptionData="discriptionData"></v-content>
    </div>
    <div class="bottom" :style="fitPhoneBottom">
      <v-bottom :productData="discriptionData" @getData="getData"></v-bottom>
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import VContent from './VContent'
import VBottom from './VBottom'
export default {
  components:{
    VContent,
    VBottom
  },
  data(){
    return {
      discriptionData:{}
    }
  },
  computed:{
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
      let successCallback = data=>{
        this.discriptionData = data
      }
      let params = {
        gid:this.$route.params.gid
      }
      this.$store.dispatch({type:'getProductDiscription',params,successCallback})
    }
  },
}
</script>
<style lang="scss" scoped>
.xiangxi{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.header{
  flex-shrink: 0;
  // border-bottom: 1px solid #dcdee3;
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
