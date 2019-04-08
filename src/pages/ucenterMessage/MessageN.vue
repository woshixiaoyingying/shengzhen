<template>
  <div>
    <div class="clearfix" style="font-size:10px;">
      <div class="page-content list-nav">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="item m20" v-for="(item,index) in listData" :key="index">
            <h2>
              <span>{{item.title}}</span> 
              <span class="fr gray"></span>
            </h2>
            <div class="mt20">
                {{item.content}}
            </div>
            <div class="mt20 mb20 tr">
              <a class="btn btn-mini" @click="ucenterApiMessageRead(item.id,index)">标记已阅读</a>
            </div>			
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import settings from '@/settings'
export default {
  data() {
    return {
      page: 1,
      type: 2,
      status: "n",
      pageSize: 4,
      activeTab: 0,
      listData:[],
      settings,
      loading:false,
      finished:false
    };
  },
  methods: {
    onLoad(){
      this.getData()
    },
    getData() {
      let { page, type, status, pageSize } = this;
      let params = {
        page,
        type,
        status,
        pageSize
      };
      let successCallback = data => {
        let listData = [...this.listData,...data.data]
        if(listData.length >= Number(data.page.total)){
          this.finished=true
        }
        this.loading=false
        this.listData = listData
      }
      this.$store.dispatch({
        type: "ucenterApiGetMessage",
        params,
        successCallback
      });
      this.page+=1
    },

    ucenterApiMessageRead(id,index){
      let params = {
        id
      }
      let successCallback = data=>{
        this.listData.splice(index,1)
      }
      this.$store.dispatch({type:"ucenterApiMessageRead",params,successCallback})
    }

   
    
  }
};
</script>

<style scoped lang="scss" src="../../huizhongtangWebStatic/css/common.scss">
</style>
<style lang="scss" >
</style>
