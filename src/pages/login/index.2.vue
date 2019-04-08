<template>
  <div class="magic-body" style="width: 375px; height: 667px;">
    <div class="magic-bg">
      <div class="login-logo">
        <a href="/index/index">
          <img src="/themes/mobile/images/mobile-logo.png" alt>
        </a>
      </div>
      <div class="container">
        <div class="p20 login bg-white clearfix simple-box">
          <div class="title">
            <div class="sub-1">
              <span></span>
              <h1>欢迎登录</h1>
            </div>
          </div>
          <div class="login-form login-form-list">
            <form action="/simple/login_act" method="post" callback="checkReadme" novalidate="true">
              <input type="hidden" name="redirectURL" value="/ucenter/index">
              <dl class="clearfix">
                <dd class="focus">
                  <input
                    class="input"
                    type="text"
                    name="account"
                    id="account"
                    pattern="required"
                    placeholder="邮箱/用户名/已验证手机"
                    alt="账号不能为空"
                    inform="0"
                  >
                  <label></label>
                </dd>
              </dl>
              <dl class="clearfix">
                <dd>
                  <input
                    type="password"
                    class="input"
                    name="password"
                    pattern="required"
                    placeholder="密码"
                    alt="密码不能为空"
                    inform="0"
                  >
                  <label></label>
                </dd>
              </dl>
              <dl class="clearfix">
                <dd>
                  <input name="autologin" id="readme" type="checkbox" value="1">
                  <label>自动登录</label>
                  <label>[
                    <a href="/simple/forget_password">忘记密码?</a>]
                  </label>
                </dd>
              </dl>
              <input
                type="hidden"
                name="wqshop_token_login"
                value="5z3dwwbz15uy7ujkrkkratn4csadll6m"
              >
              <dl class="clearfix">
                <dd>
                  <input type="submit" class="btn btn-mains" value="立即登录">
                </dd>
              </dl>

              <dl class="clearfix mb20 zhuce">
                <dd>
                  <a href="/simple/reg" class="btn btn-gray">免费注册</a>
                </dd>
              </dl>
            </form>
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
          this.$router.replace(this.redirect || "/");
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
<style lang="scss" scoped >
</style>
