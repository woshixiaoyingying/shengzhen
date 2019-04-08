<template>
<div class="viewport main-viewport" style="font-size:10px">

<div class="ma20 bg-white">
	<!--S 商品评价-->
                <div class="comment-list">
                    <div>
                        <ul class="tab-head" >
                            <li 
                            v-for="(item,index) in headerData" 
                            :key="index" 
                            @click="changeScore(item.id)" 
                            :class="score==item.id?'current':''" 
                            >
                              <p class="henhao">
                                {{item.text}}
                              </p>
                              <div class="tiao"></div>
                              
                            </li>
                        </ul>

                        <div class="product-comment">
                          <ul>
                            <li class="comment-item" v-for="(item,index) in commentData" :key="index">
                              <div class="top clearfix">
                                <img class="header-img" :src="`${settings.imgBaseUrl}${item.head_pic}`">
                                <p class="user-name">{{item.uname}}</p>
                                <div class="xingxing">
                                  <div :style="{width:item.point+'%'}">
                                    <img src="./images/xingxing_03.jpg" alt="">
                                  </div>
                                </div>
                              </div>
                              <div class="content">
                                {{item.content}}
                              </div>
                              <div class="bottom clearfix">
                                <p class="shop-time">
                                  购买时间：{{item.comment_time}}
                                </p>
                              </div>
                            </li>
                          </ul>

                        </div>


                        <!-- <div class="tab-body p20">
                            <div id="comment-a" style="display: block;">
                                <div class="page-content list-nav">
                                    <div class="item mt20 comment-item clearfix" v-for="(item,index) in commentData" :key="index">
                                    	<div class="layout-2 line-b ">
                                    		<div>
                                          <img :src="`${settings.imgBaseUrl}${item.head_pic}`" style="height:4em;width:4em;">
                                                </div>
                                    		<div style="height:4.5em;">
                                          <div><span class="score "><i :style="{width:item.point+'%'}"></i></span></div>
                                          <div><span>{{item.uname}}</span> <span class="fr gray">{{item.comment_time}}</span></div>
                                    		</div>
                                    	</div>
                                    	<div class="p20">{{item.content}}</div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
                <!--E 商品评价-->
</div>

</div>
</template>

<script>
import settings from '@/settings'
export default {
  props:["commentData",'score'],
  data(){
    return {
      settings,
      headerData:[
        {text:'很好',id:'a'},
        {text:'较好',id:'b'},
        {text:'一般',id:'c'},
      ]
    }
  },
  methods:{
    changeScore(id){
      this.$emit('update:score',id)
    }
  }

}
</script>
<style lang="scss" scoped>
.tab-head{
    width: 7rem;
    height: 1rem;
    margin: 0 auto;
    border-radius: 0.02rem;
    margin-top: 0.2rem;
    box-shadow: 0 0 0.5rem 0.1rem #f4f4f4;
    display: flex;
    li{
      width: 33.3%;
      padding-top: 0.36rem;
      p{
        height: 0.28rem;
        line-height: 0.28rem;
        font-size: 0.28rem;
        text-align: center;
      }
      p.henhao{
        border-right: 1px solid #f4f4f4;
      }
      .tiao{
        margin: 0 auto;
        width: 0;
        height: 0.06rem;
        background-color: #008030;
        border-radius: 0.3rem;
        margin-top: 0.12rem;
        transition: all 0.3s;
      }
    }
    .current{
      .tiao{
        width: 0.8rem;
      }
    }
  }
  .product-comment{
    width: 7.5rem;
    margin-top: 0.3rem;
    .comment-item{
      border-bottom: 1px solid #f3f3f3;
      padding: 0.3rem;
      .top{
        .header-img{
          display: block;
          float: left;
          border-radius: 50%;
          width: 0.72rem;
          height: 0.72rem;
        }
        .user-name{
          height: 0.72rem;
          line-height: 0.72rem;
          float: left;
          padding-left: 0.2rem;
          font-size: 0.26rem;
          width: 3.2rem;
          overflow: hidden;
        }
        .xingxing{
          width: 2.6rem;
          height: 0.45rem;
          margin-top: 0.15rem;
          float: right;
          div{
            height: 0.45rem;
            overflow: hidden;
            img{
              display: block;
              width: 2.6rem;
              height: 0.45rem;
            }
          }
        }
      }
      .content{
        font-size: 0.3rem;
        line-height: 0.35rem;
        padding: 0.3rem 0;
      }
      .bottom{
        .shop-time{
          color:#959595;
          width: 3.3rem;
          float: right;
          font-size: 0.24rem;
          text-align: right;
          height: 0.24rem;
          line-height: 0.24rem;
        }
      }
    }
  }

</style>

<style scoped>
</style>