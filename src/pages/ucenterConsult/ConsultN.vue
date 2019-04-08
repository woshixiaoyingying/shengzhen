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
          <div class="item" v-for="(item,index) in listData" :key="index">
            <div class="layout-2 mt10 line-b">
              <div>
                <a @click="$router.push(`///product/${item.goods_id}`)" >
                  <img
                    :src="`${settings.imgBaseUrl}${item.img}`"
                  >
                </a>
              </div>
              <div style="height:6em">
                <p style="overflow;hidden">
                  <a @click="$router.push(`///product/${item.goods_id}`)" >{{item.name}}</a>
                </p>
                <p>价格：
                  <b class="red">￥{{item.sell_price}}</b>
                </p>
              </div>
            </div>
            <div class="mt20 mb20">
              <div class>
                <span class="bg-title-1" style="padding:0.1em;margin-right:0.5em;">问</span>{{item.question}}
              </div>
              <p class="tr gray">咨询时间：{{item.ask_time}}</p>
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
      pageSize: 6,
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
      };
      this.$store.dispatch({
        type: "ucenterGetConsult",
        params,
        successCallback
      });
      this.page+=1
    }
  }
};
</script>

<style lang="scss" >
</style>
