<template>
  <div class="viewport main-viewport mine-content" style="font-size:10px;">
    <div class="p20 bg-title-2 center-bgs" :style="fitPhoneTop">
      <table width="100%" class="user-info">
        <tbody>
          <tr>
            <td>推广人({{rec['real_name']||'无'}})</td>
            <td>ID({{rec['name']||'无'}})</td>
          </tr>
          <tr>
            <td width="60%">账号：{{user['name']}}</td>
            <td>
              级别：
              {{level}}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pepo-list">
        <img :src="headerImg || defult_ead_pic">
        <span class="changeBtn" ><input type="file" class="picImg" name="imgFile" ref="headerImageInput" value="修改头像" @change="changImg">修改头像</span>
        <div class="pepo-id">{{customer.real_name}}</div>
          
      </div>
    </div>
    <div class="mine-content-list">
      <div id="widget_sub_navs">
        <ul class="box list-nav">
           <li class="item">
            <a class="more" @click="$router.push('/win_a/profit')">
              <div class="un un_01">我的收益</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('/ucenter/order/0')">
              <div class="un un_01">我的订单</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/gifts')">
              <div class="un un_02">送出礼物</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/get_gifts')">
              <div class="un un_03">接收礼物</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/attention')">
              <div class="un un_04">我的关注</div>
            </a>
          </li>
        </ul>
        <ul class="box list-nav">
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/consult')">
              <div class="un un_05">商品咨询</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/review')">
              <div class="un un_06">商品评价</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/message')">
              <div class="un un_07">我的消息</div>
            </a>
          </li>
        </ul>
        <ul class="box list-nav">
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/team')">
              <div class="un un_08">团队会员</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/member')">
              <div class="un un_09">我的会员相关</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/safety')">
              <div class="un un_10">账户安全</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/address')">
              <div class="un un_11">收货地址</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/bank/isset')">
              <div class="un un_12">银行卡管理</div>
            </a>
          </li>
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/extension')">
              <div class="un un_05">推广中心</div>
            </a>
          </li>
        </ul>
        <ul class="box list-nav">
          <li class="item">
            <a class="more" @click="$router.push('//ucenter/info')">
              <div class="un un_07">设置</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="plr20 pb20">
      <a @click="exitLogon" class="btn">安全退出</a>
    </div>
  </div>
</template>
<script src="https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js"></script>
<script>
import { mapGetters } from "vuex";
import authorization from "@/common/authorization";
import settings from "@/settings";
export default {
  props: ["rec", "customer", "user"],
  data() {
    return {
      defult_ead_pic: require("./images/pepo-tx.png"),
      settings: ""
    };
  },
  computed: {
    ...mapGetters({
      fitPhoneTop: "fitPhoneTop"
    }),
    level() {
        if (this.customer["is_wine"] == 1) {
          return "普通会员";
        } else {
           if(this.customer["is_partner"]==1){
          return "合伙人";
        }
          return "未激活";
        }
       
      
    },
    headerImg() {
      let photoImg=""
      if(this.user.head_pic){
        photoImg = this.settings.imgBaseUrl + this.user.head_pic;
      }
      return photoImg;
    }
  },
  created() {
    this.settings = settings;
  },
  methods: {
    // 退出登录
    exitLogon() {
      authorization.clearLoginStatus();
      this.$router.replace("/login");
    },
    changImg() {
      let headerImageInput = this.$refs.headerImageInput
      let params ={
        name:headerImageInput.name,
        file:headerImageInput.files[0]
      }
      let successCallback = data => {
        this.$emit('showData')
      };
      this.$store.dispatch({ type: "updataImg", params, successCallback });
    }
  }
};
</script>

<style scoped lang="scss" src="@/huizhongtangWebStatic/css/common.scss">
</style>
<style lang="scss" scoped>
.viewport {
  width: 100%;
}
.mine-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow-y: auto;
  .mine-content-list {
    flex-grow: 1;
  }
}
.pepo-list {
  position: relative;
}
.pepo-list img {
  height: 30%;
  border-radius: 100%;
}
.picImg {

  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
    cursor: pointer;
}
.changeBtn{
  position: relative;
  margin-left:50%;
  margin-top:10px;
  transform:translate(-50%,0);
  display: inline-block;
  color:#fff;
  font-size:16px;
  overflow: hidden;
  font-weight:500;
}
</style>
