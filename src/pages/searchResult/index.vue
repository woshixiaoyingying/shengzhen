<template>
  <div class="searchList">
    <div class="header" :style="fitPhoneTop">
      <!-- 在 van-search 外层增加 form 标签，并且 action 不为空，即可在 IOS 弹出的输入法中显示搜索按钮 -->
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入商品名称"
          show-action
          background="#FFF"
          ref="searchInput"
          autofocus
          @search="onSearch"
          @cancel="onCancel"
        />
      </form>
    </div>
    <div class="content">
      <div v-if="goodsListData&&goodsListData.length>0">
        <div class="search-tit">为您找到<span class="num">{{count}}</span>条结果</div>
        <ul class="clearfix"  >
          <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
          >
            <goods-item v-for="(item,index) in goodsListData" :key="index" :item="item"></goods-item>
          </van-list>
        </ul>
        <div class="" style="height:30px;">
        </div>
        <!-- <van-pagination
          v-model="page"
          :total-items="count"
          :items-per-page="pageSize"
        /> -->
      </div>
      <div class="no-result" v-else-if="goodsListData">
        <div class="m-exception  m-no-result">
          <!-- <div class="e-img" :style="{backgroundImage: 'url(static/images/no_result.72acf161.png)'}"></div> -->
          <p class="e-info">抱歉，暂无任何商品</p>
        </div>
        <div style="margin-top: 21px;">
          <a class="m-btn-sm m-btns" @click="$router.replace('/')" style="width: 109px;">继续逛</a>
        </div>
      </div>
      <div class="" v-else>
        请输入关键词
      </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import GoodsItem from '@/pages/components/goodsItem'
export default {
  components:{
    GoodsItem
  },
  data(){
    return {
      value:"",
      goodsListData:[],
      page:1,
      pageSize:5,
      count:0,
      loading:false,
      finished:false,
    }
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    })
  },
  methods: {
    onLoad(){
      this.page=this.page+1
      this.getList()
    },
    onSearch() {
      this.getList()
    },
    onCancel(){
      this.$router.go(-1)
    },

    getList() {
      let params={
        keyWord:this.value,
        page:this.page,
        pageSize:this.pageSize
      }
      let successCallback = data=>{ 
        let goodsListData = [...this.goodsListData,...data.goods.data]
        this.goodsListData = goodsListData 
        this.loading=false
        if(goodsListData.length >= Number(data.goods.page.total)){
          this.finished=true
        }
        this.count=Number(data.goods.page.total)
      }
      this.$store.dispatch({type:"searchGoodsList",params,successCallback})
    }
  },
  mounted(){
    this.$refs.searchInput.$el.querySelector("input").focus()
  }
}
</script>
<style lang="scss" scoped>
.searchList{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.header{
  flex-shrink: 0;
  background-color:#fff;
}
.content{
  flex-grow:1;
  overflow-y: auto;
  padding: 0.2rem 0rem 1rem 0rem;
}


.m-exception {
    text-align: center;
}
.m-exception .e-img {
    width: 153px;
    height: 132px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-origin: center center;
    background-size: 100%;
}
.m-exception .e-info {
    margin-top: 24px;
    color: #333;
}
.m-btn-sm {
    display: inline-block;
    border-radius: 2px;
    text-align: center;
    color: #666;
    border: 1px solid #666;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 6px;
    -webkit-transition: all .5s cubic-bezier(0, 1, .5, 1);
    -o-transition: all .5s cubic-bezier(0, 1, .5, 1);
    transition: all .5s cubic-bezier(0, 1, .5, 1);
    display: block;
    margin: 0 auto;
    min-width: 110px;
    height: 36px;
    line-height: 34px;
    font-size: 16px;
}
</style>
<style >
  .searchList .van-cell.van-field.van-field--has-icon{
    background: rgb(250,250,250);
  }
  .searchList .van-cell.van-field.van-field--has-icon input{
    background: none;
  }
  .searchList .van-search__action .van-search__cancel{
    color:#000;
  }
</style>
