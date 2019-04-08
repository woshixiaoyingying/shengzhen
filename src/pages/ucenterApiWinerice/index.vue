<template>
  <div class="jiumijilu">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="金豆记录"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <el-table
      :data="_winericeData"
      style="width: 100%"
      size="mini"
      >

      <el-table-column
        prop="fname"
        label="用户来源"
        >
      </el-table-column>
      <el-table-column
        prop="value"
        label="金豆"
        >
      </el-table-column>
      <el-table-column
        prop="point"
        label="总金豆"
        >
      </el-table-column>
      <el-table-column
        prop="note"
        width="180px"
        label="备注"
        >
      </el-table-column>
      <el-table-column
        prop="create_time"
        width="140px"
        label="时间"
        >
      </el-table-column>
      
      </el-table>
      <div class="buttons">
        <el-button type="primary" @click="$router.push('///ucenter/sellrice')">抛售</el-button>
        <el-button type="primary" @click="$router.push('///ucenter/exchange')">兑换</el-button>
      </div>

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
  data () {
    return {
      winericeData:{},
      page:1,	//int	false	-	页码	1
      pageSize:10,	//int	false	-	每页显示数量	10
      number_format,
      total:0,
    }
  },
  created(){
    this.getData()
  },
  watch:{
    page:function(newPage,oldPage){
      this.getData()
    }
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
    _winericeData(){
      if(!this.winericeData.list){
        return []
      }
      return this.winericeData.list.data.map(item=>{
        return {
          ...item,
        }
      })

    }
  },
  methods:{
    getData(){
      let successCallback = data=>{
        console.log(data)
        this.winericeData = data
        this.total = Number(data.list.page.total)
      }
      let params = {
        page:this.page,
        pageSize:this.pageSize
      }
      this.$store.dispatch({type:'getWinericeData',params,successCallback})
    }
  },
  mounted() {

  }
}
</script>
<style scoped src="@/huizhongtangWebStatic/css/base.css"></style>
<style lang="scss" scoped>
.jiumijilu{
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
  padding-bottom: 30px;
}
.bottom{
  flex-shrink: 0;
}
.buttons{
  display: none;
  padding-top: 20px;
  justify-content: space-around;
  
}
</style>
