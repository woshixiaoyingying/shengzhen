<template>
  <div class="flowRecord">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        :title="title"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <el-table
      :data="_flowRecordData"
      style="width: 100%"
      size="mini"
      >

      <el-table-column
        prop="amount"
        label="金额(元)"
        >
      </el-table-column>
      <el-table-column
        prop="ori_amount"
        label="原始金额(元)"
        >
      </el-table-column>
      <el-table-column
        prop="tax"
        label="税(元)"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        width="120px"
        label="来源用户"
        >
      </el-table-column>
      <el-table-column
        prop="created_at"
        width="140px"
        label="时间"
        >
      </el-table-column>
      
      </el-table>
    </div>
    <div class="bottom" :style="fitPhoneBottom">
      <van-pagination
        v-if="total>0"
        v-model="page"
        :total-items="total"
        :items-per-page="pageSize"
      />
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import {parseTime,number_format} from '@/common/common'

export default {
  data(){

    return{
      page:1,	//int	false	-	页码	1
      pageSize:10,	//int	false	-	每页显示数量	10
    
      flowRecordData:[],
  
      number_format,
      total:0,
    }
  },
  computed:{
    _flowRecordData(){
      return this.flowRecordData.map(item=>{
        return {
          ...item,
          created_at:parseTime(item.created_at)
        }
      })
    },
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
    type(){
      return this.$route.params.type
    },
    title(){
      let title=''
      switch (this.type) {
        case 'rec':
          title = '会员奖流水'
          break;
        case 'league':
          title = '运营奖流水'
          break;
        case 'king':
          title = '合伙人奖流水'
          break;
        case 'arhat':
          title = '18罗汉奖流水'
          break;
      
        default:
          break;
      }
      return title
    }
  },
  watch:{
    page:function(newPage,oldPage){
      this.getData()
    }
  },
  created(){

    
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData(){
      let {page,pageSize,type} = this
      let params = {page,pageSize,type}
      let successCallback = data => {
        this.flowRecordData = data.data
        this.total=Number(data.page.total)
      } 
      this.$store.dispatch({type:'getflowRecordData',params,successCallback})
    }
  }
}
</script>
<style lang="scss" scoped>
.flowRecord{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #eeeeee;
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
