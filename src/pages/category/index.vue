<template>
  <div class="fenlei">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        :title="$route.params.name"
        @click-left="showMenu=!showMenu"
      >
        <template slot="left">
          <i class="iconfont-wh icon-fenlei"></i>
        </template>
      </van-nav-bar>
    </div>
    <div class="content">

      <div class="left" :class="showMenu?'show':'hide'">
        <ul>
          <li v-for="item in goodsCateGory"
          :class="item.id===$route.params.cid?{active:true}:null"
          :key="item.id"
          @click="goodsCateClick(item)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="zhezhao" v-if="showMenu" @click="showMenu=false">

      </div>



      <ul class="select">
        <li 
        v-for="(item,index) in sortList" 
        :key="index" 
        :class="selectActive(item)" 
        @click="selectClick(item)"
        >
          <a>{{item.text}}</a>
          <p class="huang"></p>
        </li>
      </ul>

      <!-- <ul class="goods-list"> -->
        <!-- <li 
        class="clearfix" 
        v-for="(item,index) in cateData" 
        :key="index"
        @click="$router.push(`///product/${item.id}`)"
        >
            <div class="left">
              <img :src="`${settings.imgBaseUrl}${item.img}`" alt="">
            </div>
            <div class="right">
              <p class="title">
                {{item.name}}
              </p>
              <div class="price">
                <span class="huiyuan">会员价：</span>
                <span class="fuhao">￥</span>
                <span class="huiyuanjia">{{item['sell_price']}}</span> -->
                <!-- <span class="huaxianjia">￥324.00</span> -->
              <!-- </div>
              <div class="bottom">
                <p class="haoping">积分:{{item.point}}</p>
                <p class="yuexiao" v-if="item.sell_num">月销{{item.sell_num}}</p>
              </div>
            </div>
        </li> -->
      <!-- </ul> -->

      <div class="list-box">
        
        <van-list
            v-model="loading"
            :finished="finished"
            @load="onLoad"
          >
          <goods-item v-for="(item,index) in cateData" :key='index' :item="item"></goods-item>
        </van-list>
      </div>  

    </div>
    <div class="bottom">
       <v-footer parentPage="cate"></v-footer>
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import settings from '@/settings'
import GoodsItem from '@/pages/components/goodsItem'
import VFooter from '@/pages/win_a/footer'
export default {
  components:{
    GoodsItem,
    VFooter
  },
  data () {
    return {
      settings,
      cateData:[],
      sort:0,
      page:1,
      pageSize:5,
      count:0,
      sortList:[
        {text:'默认',id:0},
        {text:'销量',id:1},
        {text:'评论数',id:2},
        {text:'价格',id:3,id2:4},
        {text:'最新',id:5},
      ],
      loading: false,
      finished: false,
      goodsCateGory:[
        {name:'全部',id:'0'},
      ],
      showMenu:false,
    }
  },
  created(){
    this.getData()
    this.getGoodsCategroy()
  },
  watch:{
    sort(){
      this.cateData=[]
      if(this.page==1){
        this.getData()
      }else{
        this.page=1
        this.getData()
      }
    },
    '$route'(){
      this.cateData=[]
      this.page=1
      this.finished=false
      this.getData()
    }
  }, 
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),

  },
  methods:{
    onLoad(){
      this.page=this.page+1
      this.getData()
    },

    getGoodsCategroy(){
      let successCallback = data =>{
        this.goodsCateGory=[...this.goodsCateGory,...data]
      }
      let params= {}
      this.$store.dispatch({type:'getGoodsCategroy',successCallback,params})
    },

    goodsCateClick(item){
      this.showMenu=false
      this.$router.replace(`/category/${item.id}/${item.name}`)
    },

    getData(){
      let successCallback = data=>{
        let cateData = [...this.cateData,...data.goods.data]
        // 加载状态结束
        this.loading = false;
        if(cateData.length==data.goods.page.total){
          this.finished=true
        }

        this.cateData = cateData
      }
      let params = {
        cid:this.$route.params.cid,
        sort:this.sort,
        page:this.page,
        pageSize:this.pageSize
      }
      this.$store.dispatch({type:'getcateData',params,successCallback})
    },

    selectActive(item){
      if(item.id2==this.sort){
        return 'active_2'
      }
      return item.id==this.sort?'active':''
    },
    selectClick(item){
      if((this.sort==item.id)&&(item.id2==undefined)){
        return
      }
      this.cateData=[]

      this.finished=false
      if((this.sort==item.id)&&(item.id2!=undefined)){
        this.sort=item.id2
      }else if(this.sort==item.id2){
        this.sort=item.id
      }else{
        this.sort=item.id
      }
    }
  },
  mounted() {

  }
}
</script>



<style lang="scss" scoped>
.list-box{
  flex-grow: 1;
  overflow-y: auto;
}
.fenlei{
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
  .van-nav-bar__left{
    i{
      font-size: 25px;
      height: 46px;
      width: 46px;
      line-height: 46px;
      display: block;
    }
  }
}
.content{
  flex-grow:1;
  overflow-y: auto;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  position: relative;
  .left{
    position: absolute;
    left: -3rem;
    top: 0;
    width: 3rem;
    height: 100%;
    overflow-y: auto;
    z-index: 100;
    background-color: #f9f9f9;
    transition: all 0.2s;
    ul li{
      height: 0.88rem;
      color: #000;
      font-size: 0.26rem;
      line-height: 0.88rem;
      text-align: center;
      overflow: hidden;
    }
  }
  .zhezhao{
    background-color: #212121;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.2;
    z-index: 1;
  }
  .left.show{
    left: 0;
  }
  .right{
    width: 7.5rem;
    overflow-y: auto;
    position: relative;
  }
  .left ul li.active{
    background:#008030;
    color: #fff;
  }

  .select{
    height: 0.8rem;
    flex-shrink: 0;
    border-bottom: 1px solid #dddddd;
    display: flex;
    justify-content: space-around;
    li{
      width:1.3rem;
      position: relative;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.26rem;
      .huang{
        position: absolute;
        bottom: 0;
        height: 4px;
        width: 100%;
      }
    }
    li.active{
      a:after {
        background: url('./images/sort_cur_desc.png') no-repeat scroll 0 0 rgba(0, 0, 0, 0);
        background-size: 0.25rem 0.25rem;
        content: " ";
        display: inline-block;
        height: 0.25rem;
        position: relative;
      
        width: 0.25rem;
      }
      .huang{
        background-color: #f5a900;
      }
    }
    li.active_2{
      a:after {
        background: url('./images/sort_cur_asc.png') no-repeat scroll 0 0 rgba(0, 0, 0, 0);
        background-size: 1em 1em;
        content: " ";
        display: inline-block;
        height: 1em;
        position: relative;
      
        width: 1em;
      }
      .huang{
        background-color: #f5a900;
      }
    }
  }
  .goods-list{
    flex-grow: 1;
    overflow-y: auto;
    li{
        border-bottom: 1px solid #dfdfdf;
        padding-bottom: 0.2rem;
        .left{
          float: left;
          height: 2.68rem;
          img{
            display: block;
            margin-top: 0.28rem;
            width: 2.21rem;
            height: 2.21rem;
          }
        }
        .right{
          width: 4.78rem;
          padding-right: 0.25rem;
          box-sizing: border-box;
          height: 2.68rem;
          float: right;
          position: relative;
          .title{
            font-size: 0.26rem;
            line-height: 0.4rem;
            padding-top: 0.18rem;
          }
          .price{
            width: 100%;
            height: 0.32rem;
            position: absolute;
            top: 1.57rem;
            left: 0;
            span{
       
              position: relative;
              bottom: 0;
            }
            .huiyuan{
              color: #d3b544;
              font-size:0.2rem;
              // left: 0;
            }
            .fuhao{
              font-size: 0.2rem;
              color: #212121;
              left: -0.12rem;
            }
            .huiyuanjia{
              font-size: 0.3rem;
              color: #212121;
              left:-0.2rem;
              bottom: 0.04rem;
              height: 0.3rem;
              line-height: 0.3rem;
            }
            .huaxianjia{
              font-size: 0.2rem;
              color: #979797;
              text-decoration:line-through;
              // left: 2.56rem;
            }
          }
          .bottom{
            height: 0.28rem;
            line-height: 0.28rem;
            position: absolute;
            top:2.2rem;
            width: 100%;
            padding-right: 0.25rem;
            box-sizing: border-box;
            p{
              font-size: 0.26rem;
              line-height: 0.28rem;
              color: #9b9b9b;
              width: 1.5rem;
            }
            .haoping{
              float: left;
              text-align: left;
            }
            .yuexiao{
              float: right;
              text-align: right;
            }
          }
        }
    }
  }
}
.bottom{
  flex-shrink: 0;
}
.van-hairline--bottom::after {
    border-bottom-width: 0;
}
</style>
