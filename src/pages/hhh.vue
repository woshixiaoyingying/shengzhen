<template>
  <div class="qianbao">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="钱包"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">

    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
export default {
  data () {
    return {
      valletData:{}
    }
  },
  created(){
    this.getData()
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),

  },
  methods:{
    getData(){
      let successCallback = data=>{
        this.valletData = data
      }
      let params ={}
      this.$store.dispatch({type:'getValletData',params,successCallback})
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.qianbao{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #eeeeee;
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
