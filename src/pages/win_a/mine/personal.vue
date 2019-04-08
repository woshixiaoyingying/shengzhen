<template>
  <div class="personal">
    <div class="v1_personal" :style="fitPhoneTop">
      <div class="ser">
        <span class="teacher">我的导师:({{rec['real_name']||'无'}})</span>
        <img
          src="static/images/shezhi.png"
          alt
          class="shezhi"
          @click="$router.push('//ucenter/info')"
        >
      </div>
      <div class="info">
        <div class="touBox">
          <label for="in">
            <img :src="headerImg" class="tou" @click="$refs.headerImageInput.click()">
          </label>
          
          <input type="file" class="picImg" name="imgFile" ref="headerImageInput" value="修改头像" @change="changImg" id="in">
          <p class="customer_name">{{customer.real_name}}</p>
        </div>
        <div class="zhanghao">
          <p class="zhanghao_1">账号:{{user['name']}}</p>
          <p class="zhanghao_2">级别:{{level}}</p>
        </div>
      </div>
    </div>
    <div class="v2_personal">
      <div class="v2_top">
        <ul class="v2_top_left">
          <li>累计收益</li>
          <li>¥ {{totalBonus}}</li>
        </ul>
        <ul class="v2_top_right">
          <li>今日收益</li>
          <li>¥ {{todayTotals}}</li>
        </ul>
      </div>
      <div class="v2_bottom">
        <van-row>
          <van-col span="12">账户余额:{{customer.balance}}</van-col>
          <van-col span="12">金豆余额:{{customer.point}}</van-col>
        </van-row>
        <van-row>
          <van-col span="12">我的直推:{{direct_num}}人</van-col>
          <van-col span="12">我的间推:{{indetect_num}}人</van-col>
        </van-row>
      </div>
    </div>
    <div class="v3_personal">
      <van-row>
        <van-col span="6">
          <router-link to="/ucenter/order/0">
            <img src="static/images/dingdan.png" class="icon_i">我的订单
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="//ucenter/address">
            <img src="static/images/dizhi.png" class="icon_i">收货地址
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="//ucenter/consult">
            <img src="static/images/zixun.png" class="icon_i">商品咨询
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="//ucenter/review">
            <img src="static/images/pingjia.png" class="icon_i">商品评价
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div class="v4_personal">
      <h3 class="v4_personal_title">
        <p>相关收益</p>
      </h3>
      <div class="profit-xj">
        <van-row>
          <van-col span="3">
            <i class="iconfont icon-addressbook"></i>
          </van-col>
          <van-col span="12">本月个人业绩</van-col>
          <van-col span="9" class="beizhu">{{totalMoney}}元</van-col>
        </van-row>
        <div @click="$router.push(`/ucenter/bonus_list/rec`)">
          <van-row>
            <van-col span="3">
              <i class="iconfont icon-redpacket"></i>
            </van-col>
            <van-col span="12">会员奖流水</van-col>
            <van-col span="9" class="beizhu">赚{{bonus['bonus_rec']}}元</van-col>
          </van-row>
        </div>
        <div @click="$router.push(`/ucenter/bonus_list/league`)">
          <van-row>
            <van-col span="3">
              <i class="iconfont icon-redpacket"></i>
            </van-col>
            <van-col span="12">运营奖流水</van-col>
            <van-col span="9" class="beizhu">赚{{bonus['bonus_league']}}元</van-col>
          </van-row>
        </div>
        <div @click="$router.push(`/ucenter/bonus_list/king`)">
          <van-row>
            <van-col span="3">
              <i class="iconfont icon-redpacket"></i>
            </van-col>
            <van-col span="12">合伙人奖流水</van-col>
            <van-col span="9" class="beizhu">赚{{bonus['bonus_king']}}元</van-col>
          </van-row>
        </div>

        <van-row>
          <van-col span="3">
            <i class="iconfont icon-addressbook"></i>
          </van-col>
          <van-col span="12">剩余收益</van-col>
          <van-col span="9" class="beizhu">{{customer['totals']}}元</van-col>
        </van-row>
        <div @click="$router.push(`//ucenter/winerice`)">
          <van-row>
            <van-col span="3">
              <i class="iconfont icon-redpacket"></i>
            </van-col>
            <van-col span="12">金豆记录</van-col>
            <van-col span="9" class="beizhu">赚{{bonus['point']}}金豆</van-col>
          </van-row>
        </div>

        <div class="tixian">
           <a class="btn btn_red" @click="$router.push('///putForward')">申请提现</a>
          
        </div>
      </div>
    </div>
    <div class="v5_personal">
      <van-row>
        <van-col span="6">
          <router-link to="//ucenter/team">
            <img src="static/images/team.png" class="icon_i">我的团队
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="//ucenter/member">
            <img src="static/images/shuju.png" class="icon_i">我的数据
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="///transferAccounts">
            <img src="static/images/zhuanzhang.png" class="icon_i">奖金转账
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="///awardTransferBalance">
            <img src="static/images/yue.png" class="icon_i">奖转余额
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div class="v6_personal">
      <van-row type="flex" justify="space-between">
        <van-col span="10">
          <a class="liwu" @click="$router.push('//ucenter/gifts')">
            <img src="static/images/liwu.png">送出礼物
          </a>
        </van-col>
        <van-col span="10">
          <a class="liwu" @click="$router.push('//ucenter/get_gifts')">
            <img src="static/images/liwu-1.png">接收礼物
          </a>
        </van-col>
      </van-row>
    </div>
    <div class="v7_personal">
      <van-row>
        <van-col span="6">
          <router-link to="//ucenter/attention">
            <img src="static/images/shoucang.png" class="icon_i">我的收藏
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="//ucenter/message">
            <img src="static/images/xiaoxi.png" class="icon_i">我的消息
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="//ucenter/bank/isset">
            <img src="static/images/yinhangka.png" class="icon_i">银行卡
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="//ucenter/safety">
            <img src="static/images/anquan.png" class="icon_i">账户安全
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div class="v8_personal">
        <van-row>
            <van-col span="8" offset="8">
              <a @click="exitLogon" class="btn btn_red">安全退出</a>
            </van-col>
          </van-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import authorization from "@/common/authorization";
import settings from "@/settings";
import { log } from 'util';
export default {
  name: "HomePersonal",
  props: ["rec", "user"],
  data() {
    return {
      defult_ead_pic: require("./images/pepo-tx.png"),
      settings: "",
      customer: {},
      bonus: {},
      todayTotals: "",
      totalBonus: "",
      direct_num: "",
      indetect_num:"",
      perf: "",
      paypassword: "",
      totalMoney:""
    };
  },
  computed: {
    ...mapState({
      phoneParams: "phoneParams",
      userAccount: "userAccount"
    }),
    ...mapGetters({
      fitPhoneTop: "fitPhoneTop"
    }),
    level() {
      if (this.customer["is_wine"] == 1) {
        return "普通会员";
      } else {
        if (this.customer["is_partner"] == 1) {
          return "合伙人";
        }
        return "未激活";
      }
    },
    headerImg() {
      let photoImg = "";
      if (this.user.head_pic) {
        photoImg = this.settings.imgBaseUrl + this.user.head_pic;
      }else{
        photoImg = this.defult_ead_pic
      }
      return photoImg;
    }
  },
  created() {
    this.settings = settings;
    this.getData();
  },
  methods: {
    // 退出登录
    exitLogon() {
      authorization.clearLoginStatus();
      this.$router.replace("/login");
    },
    changImg() {
      let headerImageInput = this.$refs.headerImageInput;
      let params = {
        name: headerImageInput.name,
        file: headerImageInput.files[0]
      };
      let successCallback = data => {
        this.$emit("showData");
      };
      this.$store.dispatch({ type: "updataImg", params, successCallback });
    },
    getData() {
      let successCallback = data => {
        this.customer = { ...data.customer };
        this.bonus = { ...data.income.bonus };
        this.todayTotals = data.income.todayTotals;
        this.totalBonus = data.income.totalBonus;
        this.direct_num = data.direct_num;
        this.indetect_num = data.indetect_num;
        this.perf = data.income.perf;
        this.totalMoney = data.totalMoney;
      };
      this.$store.dispatch({ type: "getMinePageData", successCallback });
    },
    dialogBeforeClose(action, done) {
      if (action === "confirm") {
        let successCallback = data => {
          if (data) {
            done();
            this.getData();
            sessionStorage.setItem("isinputpaypassword", "1");
          } else {
            done(false);
          }
        };
        let params = {
          paypassword: this.paypassword
        };
        this.$store.dispatch({
          type: "ucenterApiVerifiedPaypwd",
          params,
          successCallback
        });
      } else {
        this.$router.replace("/win_a/home");
      }
    }
  }
};
</script>
<style scoped src="@/huizhongtangWebStatic/css/fonts/iconfont.css"></style>
<style scoped lang="scss" src="../../../delirenWebStatic/css/common.scss"></style>
<style scoped lang="scss">
.personal {
  padding-bottom: 20px;
}
.v1_personal {
  padding: 10px 25px 60px 25px;
  position: relative;
}
.teacher {
  color: #fff;
}
.ser,
.info {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
}
.shezhi {
  width: 20px;
  height: 20px;
}
.v1_personal{
 background: url(./images/personalbg.png) no-repeat center bottom;
}
.v1_personal,
.v2_personal {
  position: relative;
}
.v2_personal {
  top: -40px;
  background-color: #fff;
  width: calc(100% - 40px);
  left: 20px;
  padding: 10px;
  border-radius: 10px;
}
.touBox {
  display: flex;
  align-items: center;
}
.tou {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.customer_name {
  color: #fff;
  padding-left: 20px;
}
.zhanghao {
  color: #fff;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  justify-content: center;
}
.zhanghao_1 {
  margin-bottom: 10px;
}
.v2_top {
  display: flex;
  border-bottom: 1px #ddd dashed;
  padding-bottom: 10px;
}
.v2_top_left,
.v2_top_right {
  width: 50%;
  text-align: center;
  font-size: 22px;
}
.v2_top_left li,
.v2_top_right li {
  padding: 5px 0;
  color: #000;
}
.v2_bottom {
  padding: 15px 0 10px;
  color: #000;
}
.v2_bottom .van-col {
  font-size: 11pt;
}
.v2_personal .van-row .van-col {
  padding: 5px 0 5px 15px;
}
.v3_personal {
  margin-top: -30px;
}
.v3_personal,
.v5_personal,
.v7_personal ,.v6_personal{
  background-color: #fff;
  width: calc(100% - 40px);
  margin-left: 20px;
  border-radius: 10px;
}
.v3_personal .van-row .van-col a,
.v5_personal .van-row .van-col a,
.v7_personal .van-row .van-col a {
  text-align: center;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10pt;
}
.icon_i {
  width: 30px;
  display: block;
  margin-bottom: 10px;
}
.v4_personal {
  background-color: #fff;
  padding: 10px 20px 10px;
  width: calc(100% - 40px);
  margin-left: 20px;
  margin-top: 10px;
  border-radius: 10px;
  position: relative;
}
.v4_personal .van-col--15{
  font-size: 12pt;
  color: #000;
}
.v4_personal_title {
  height: 40px;
  line-height: 40px;
  font-size: 22px;
  position: relative;
}
.v4_personal_title p{
  color: #000;
}
.v4_personal .van-row {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 0;
}
.v4_personal h3::after,
.v4_personal .van-row::after {
  content: " ";
  width: 100%;
  position: absolute;
  pointer-events: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  bottom: 0;
  border-bottom: 1px solid #ebedf0;
}
.beizhu {
  font-size: 10px;
  color: #ff6633;
  text-align: right;
}
.iconfont {
  padding: 0;
}
.tixian {
  width: 33.33%;
  top: 10px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.v5_personal,
.v7_personal,.v8_personal ,.v6_personal{
  margin-top: 10px;
}

.v6_personal .van-row .van-col a {
  display: flex;
  align-items: center;
}
.v6_personal img {
  width: 30px;
  height: 30px;
  display: block;
  margin: 0 10px;
}
.btn.btn_red {
    margin: 0 auto;
    border: 1px solid #f36d15;
    color: #f36d15;
    text-align: center;
    border-radius: 4px;
    background-color: #fff;
    line-height: 40px;
}
.picImg{
  display: none;
}
.liwu{
  line-height: 50px;
  height: 50px;
  font-size: 10pt;
}
</style>