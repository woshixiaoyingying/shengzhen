<template>
  <div class="wodeguanzhu">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="我的收藏"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content :attentionList="attentionList"></v-content>
    </div>
    <div class="bottom" :style="fitPhoneBottom">
      <van-pagination
        v-if="count>0"
        v-model="page"
        :total-items="count*1"
        :items-per-page="pageSize"
      />
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import VContent from './VContent'
export default {
  data(){
    return {
      attentionList:[],
      page:1,
      pageSize:5,
      count:0,
    }
  },
  watch:{
    page(){
      this.getData()
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
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      let successCallback=data=>{
        this.attentionList = data.data
        this.count = Number(data.page.total)
      }

      let {page,pageSize} = this
      let params = {page,pageSize}
      this.$store.dispatch({type:'getUcenterAttention',params,successCallback})
    }
  }
}
</script>
<style scoped src="@/huizhongtangWebStatic/css/base.css"></style>
<style lang="scss" scoped>
.wodeguanzhu{
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
