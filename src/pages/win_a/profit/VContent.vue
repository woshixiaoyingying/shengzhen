<template>
  <div class="profit" >
        <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="我的收益"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>

   <div class="list-block customer-login  customer-register" align="center">
      <div class="Profit-all" :style="fitPhoneTop">
        <div class="Cumulative-income">
          <div class="profit-img">
            <img src="./images/leijishouyi_04.png" alt="">
            <div class="cumulative-intro">
              <h4>累计收益</h4>
              <h2>￥{{totalBonus}}</h2>
            </div>
          </div>
          <div class="account-balance">账户余额: <span>￥{{customer.balance}}</span></div>
          <div class="btn-bar" style="background: none;">
            <div class="col-3-1"><a class="btn" @click="$router.push('///putForward')">提现</a></div>
            <div class="col-3-1"><a class="btn" @click="$router.push('///transferAccounts')">奖金转账</a></div>
            <div class="col-3-1"><a class="btn" @click="$router.push('///awardTransferBalance')">奖转余额</a></div>
          </div>
        </div>
        <div class="Profit-list">
          <ol>
            <li>
              <h4>今日收益</h4>
              <h2>￥{{todayTotals}}</h2>
            </li>
            <li>
              <h4>我的直推</h4>
              <h2>{{mydirect}}人</h2>
            </li>

          </ol>
        </div>
      </div>
      <div class="profit-xj">
        <ol>
           <li class="item-content item-link item-one" @click="$router.push(`//ucenter/winerice`)">
            <div class="item-media"><i class="iconfont icon-redpacket"></i></div>
            <div class="item-inner">
              <div class="item-title">
                <a >金豆记录</a>
              </div>
              <span>赚{{bonus['point']}}酒米</span>
            </div>
          </li>

          <li class="item-content item-link item-one" @click="$router.push(`/ucenter/bonus_list/rec`)">
            <div class="item-media"><i class="iconfont icon-redpacket"></i></div>
            <div class="item-inner">
              <div class="item-title">
                <a >会员奖流水</a>
              </div>
              <span>赚{{bonus['bonus_rec']}}元</span>
            </div>
          </li>
          <li class="item-content item-link item-one" @click="$router.push(`/ucenter/bonus_list/share`)">
            <div class="item-media"><i class="iconfont icon-redpacket"></i></div>
            <div class="item-inner">
              <div class="item-title">
                <a >运营奖流水</a>
              </div>
              <span>赚{{bonus['bonus_share']}}元</span>
            </div>
          </li>
          <li class="item-content item-link item-one" @click="$router.push(`/ucenter/bonus_list/league`)">
            <div class="item-media"><i class="iconfont icon-redpacket"></i></div>
            <div class="item-inner">
              <div class="item-title">
                <a >合伙人奖流水</a>
              </div>
              <span>赚{{bonus['bonus_league']}}元</span>
            </div>
          </li>
          <li class="item-content item-link item-three">
            <div class="item-media"><i class="iconfont icon-addressbook"></i></div>
            <div class="item-inner">
              <div class="item-title">
                <a >本月个人业绩</a>
              </div>
              <span>{{perf}}元</span>
            </div>
          </li>
          <li class="item-content item-link item-three">
            <div class="item-media"><i class="iconfont icon-addressbook"></i></div>
            <div class="item-inner">
              <div class="item-title">
                <a >剩余收益</a>
              </div>
              <span>{{customer['totals']}}元</span>
            </div>
          </li>

        </ol>
      </div>
    </div>
    <van-dialog
    v-model="showInputPassword"
    title="提示"
    :before-close="dialogBeforeClose"
    :showCancelButton="true"
    >
          <van-field
            v-model="paypassword"
            type="password"
            placeholder="请在此输入二级密码"
          />
    </van-dialog>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex'
import settings from '@/settings'


export default {
  data(){
    return {
      customer:{},
      bonus:{},
      todayTotals:'',
      totalBonus:'',
      mydirect:'',
      perf:'',
      settings,
      showInputPassword:true,
      paypassword:'',
    }
  },
  computed:{
    ...mapState({
      phoneParams:"phoneParams",
      userAccount:"userAccount"
    }),
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop"
    })
  },
  created(){
    if(sessionStorage.getItem('isinputpaypassword')=='1'){
      this.getData()
      this.showInputPassword=false
    }
  },
  methods: {
    getData(){
      let successCallback = data=>{
        this.customer={...data.customer}
        this.bonus={...data.data.bonus}
        this.todayTotals=data.data.todayTotals
        this.totalBonus=data.data.totalBonus
        this.mydirect=data.data.mydirect
        this.perf=data.data.perf

      }
      this.$store.dispatch({type:'getprofitPageData',successCallback})
    },
    dialogBeforeClose(action, done) {
      if (action === 'confirm') {
      
        let successCallback = data=>{
          if(data){
            done()
            this.getData()
            sessionStorage.setItem('isinputpaypassword','1')
          }else{
            done(false)
          }
        }
        let params={
          paypassword:this.paypassword
        }
        this.$store.dispatch({type:"ucenterApiVerifiedPaypwd",params,successCallback})
      }else{
        this.$router.replace('/win_a/home')
      }
    }
  },
}
</script>
<style scoped src="@/huizhongtangWebStatic/css/fonts/iconfont.css"></style>
<style scoped lang="scss" src="../../../delirenWebStatic/css/common.scss"></style>

<style scoped lang="scss">
.profit{
  flex-grow: 1;
  // background-color: #f6f6f6;
  flex-direction: column;
  overflow-y: auto;
  font-family:  "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  position: relative;
  .profit-img{
    .cumulative-intro {
      h2{
        font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
        // color: #f35000;
        font-size: 0.38rem;
      }
      // h4{
      //   // color: #f35000;
      // }

    }
    .account-balance span{
      font-family:  "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    }
  }
  .Profit-list{
    h2{
      // color: #974112;
      font-family:  "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    }
  }
  .Profit-all{
    background-image: url('./images/header_bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .item-content.item-link{
    // i{
    //   // color: #fe9c00;
    // }
    span{
      // color: #fe9c00;
      font-family:  "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    }
  }
  .btn-bar .btn{
    background-color: #ff3535;
    border: 1px solid #ff3535;
    color: #fff;
    border-radius: 0;
  }
}
.profit{
    width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
</style>

