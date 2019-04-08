<template>
  <div class="pinglun">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="评论"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content :commentData="commentData" :score.sync="score"></v-content>
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
  components:{
    VContent
  },
  data () {
    return {
      commentData:[],
      score:'a',
      page:1,
      pageSize:10,
      count:0,
    }
  },
  created(){
    this.getData()
  },
  watch:{
    page(){
      this.getData()
    },
    score(){
      if(this.page==1){
        this.getData()
      }else{
        this.page=1
      }
    }
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
        this.commentData = data.data
        this.count = data.page.total
      }
      let params = {
        page:this.page,
        pageSize:this.pageSize,
        id:this.$route.params.gid,
        score:this.score,
      }
      this.$store.dispatch({type:'getProductComment',params,successCallback})
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.pinglun{
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
