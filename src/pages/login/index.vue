<template>
  <div class="magic-body" style="min-height: 100%;">
    <div class="magic-titles" :style="fitPhoneTop">会员登录</div>
    <div class="magic-bg">
      <div class="login-logo">
        <img src="static/images/mobile-logo.png" @click="$router.push('/win_a/home')">
      </div>
      <div class="container">
        <div class="nTab nTab-mytab">
          <div class="TabTitle">
            <ul id="myTab2">
              <li class="active">用户登录</li>
              <li class="normal" @click="$router.push('//simpleReg')">用户注册</li>
            </ul>
          </div>
          <div class="TabContent">
            <div id="myTab2_Content0">
              <div class="p20 login bg-white clearfix simple-box">
                <div class="login-form login-form-list">
                  <form>
                    <dl class="clearfix">
                      <dd>
                        <input
                          class="input"
                          type="text"
                          v-model="username"
                          @click="focusInput('username')"
                          ref="username"
                          placeholder="邮箱/用户名/已验证手机"
                        >
                      </dd>
                    </dl>
                    <dl class="clearfix">
                      <dd>
                        <input
                          type="password"
                          class="input"
                          v-model="password"
                          @click="focusInput('password')"
                          ref="password"
                          placeholder="密码"
                        >
                      </dd>
                    </dl>
                    <dl class="clearfix">
                      <dd class="login_box">
                        <span class="inputBorder">
                          <input
                            name="autologin"
                            id="readme"
                            type="checkbox"
                            value="1"
                            class="autoLogin"
                          >
                        </span>
                        <!-- <van-checkbox v-model="checked" checked-color="#ff6633">复选框</van-checkbox> -->
                        <label>自动登录</label>
                        <label>
                          [
                          <a @click="$router.push('//retrievePassword')">忘记密码?</a>]
                        </label>
                      </dd>
                    </dl>
                    <dl class="clearfix">
                      <dd>
                        <input type="button" class="btn btn-mains" value="立即登录" @click="divSubmit">
                      </dd>
                    </dl>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      dengluzhong: false
    };
  },
  props: ["redirect"],
  computed: {
    ...mapGetters({
      fitPhoneTop: "fitPhoneTop",
      fitPhoneBottom: "fitPhoneBottom"
    })
  },
  methods: {
    divSubmit() {
      let loginCallback = status => {
        this.dengluzhong = false;
        if (status) {
          this.$router.replace(this.redirect || "/win_a/home");
        }
      };

      if (this.dengluzhong) {
        return;
      }

      setTimeout(() => {
        if (this.dengluzhong) {
          this.$message.error("网络错误，请重试！");
          this.dengluzhong = false;
        }
      }, 50000);

      if (this.username && this.password) {
        this.dengluzhong = true;

        let params = {
          account: this.username,
          password: this.password
        };
        this.$store.dispatch({
          type: "userLogin",
          params,
          loginCallback
        });
      } else {
        this.$message.error("用户名和密码不能为空");
      }
    },
    focusInput(inputname) {
      this.$refs[inputname].focus();
    }
  }
};
</script>
<style lang="scss" scoped>
.magic-body {
  background: url(../../../static/images/magic-bg.jpg) no-repeat left bottom;
  background-size: auto 100%;
}
.magic-titles {
  padding: 15px 0;
  text-align: center;
  font-size: 15pt;
  line-height: 25px;
  color: #fff;
  font-weight: 500;
  background: -webkit-linear-gradient(
    left,
    #7c459d,
    #8a4696,
    #aa4784,
    #c14978,
    #d14970,
    #df4a68,
    #f44b5d,
    #fc4b59
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #7c459d,
    #8a4696,
    #aa4784,
    #c14978,
    #d14970,
    #df4a68,
    #f44b5d,
    #fc4b59
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #7c459d,
    #8a4696,
    #aa4784,
    #c14978,
    #d14970,
    #df4a68,
    #f44b5d,
    #fc4b59
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    #7c459d,
    #8a4696,
    #aa4784,
    #c14978,
    #d14970,
    #df4a68,
    #f44b5d,
    #fc4b59
  ); /* 标准的语法 */
}
.login-logo {
  text-align: center;
  margin-top: 1.2rem;
}
.login-logo img {
  width: 90px;
}
.nTab-mytab {
  padding-top: 30px;
}
#myTab2:after {
  content: "";
  display: table;
  clear: both;
}
#myTab2 {
  width: 50%;
  margin: 0 auto;
}
#myTab2 li {
  width: 48%;
  float: left;
  font-size: 11pt;
  padding: 8px 0px;
  color: #ff3535;
  text-align: center;
  border: 1px #ff3535 solid;
}
#myTab2 li.active {
  background: #ff3535;
  color: #fff;
}
#myTab2 li:nth-child(1) {
  border-radius: 8px 0 0 8px;
}
#myTab2 li:nth-child(2) {
  border-radius: 0px 8px 8px 0;
}
.login-form-list .input {
  width: 100%;
  height: 50px;
  line-height: 30px;
  background: none; /* border: none;*/
  border: 1px #e6e6e6 solid;
  border-radius: 8px;
  font-size: 15pt;
  padding: 0 10px;

}
.login-form-list dl {
  padding-top: 30px;
}
.login-form-list {
  padding: 0 28px;
}
.btn-mains {
  width: 100%;
  background: -webkit-linear-gradient(
    left,
    #7f459c,
    #98468e,
    #b7487e,
    #b9487d,
    #d94a6c,
    #e74a64,
    #f24b5e,
    #fa4a5a
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #7f459c,
    #98468e,
    #b7487e,
    #b9487d,
    #d94a6c,
    #e74a64,
    #f24b5e,
    #fa4a5a
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #7f459c,
    #98468e,
    #b7487e,
    #b9487d,
    #d94a6c,
    #e74a64,
    #f24b5e,
    #fa4a5a
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    #7f459c,
    #98468e,
    #b7487e,
    #b9487d,
    #d94a6c,
    #e74a64,
    #f24b5e,
    #fa4a5a
  ); /* 标准的语法 */
  color: #fff;
  background-size: 100% 100%;
  line-height: 45px;
  border: none;
  border-radius: 35px;
  font-size: 16px;
  font-weight: 600;
}
.autoLogin {
  -webkit-appearance: checkbox !important;
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border: 1px #e6e6e6 solid;
    outline: 0;
}
.login_box {
  display: flex;
  align-items: center;
}
.red {
  color: red;
}

</style>
