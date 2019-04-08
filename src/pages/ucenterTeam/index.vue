<template>
  <div class="tuanduihuiyuan">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="团队会员"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <v-content :ucenterTeamList="ucenterTeamList" :grade="grade"></v-content>
    </div>
    <div class="bottom" :style="fitPhoneBottom">
      <van-pagination
        v-if="page>1"
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
  data(){
    return {
      ucenterTeamList:[],
      page:1,
      pageSize:10,
      count:0,
      grade:{}
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
        
        this.ucenterTeamList = data.list.data
        this.count = Number(data.list.page.total)
        this.grade = data.grade
      }
      let {page,pageSize} = this
      let params = {page,pageSize}
      this.$store.dispatch({type:'getUcenterTeam',params,successCallback})
    },
  }
}
</script>
<style lang="scss" scoped>
.tuanduihuiyuan{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #f5f5f5;
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
