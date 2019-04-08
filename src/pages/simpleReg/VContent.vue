<template>
  <div class="magic-body">
    <div class="magic-titles" :style="fitPhoneTop">注册会员</div>
    <div class="magic-bg">
      <div class="login-logo">
        <a href="">
          <img src="static/images/mobile-logo.png" @click="$router.push('/win_a/home')">
        </a>
      </div>
      <div class="container">
        <div class="nTab nTab-mytab">
          <div class="TabTitle">
            <ul id="myTab2">
              <li class="normal" @click="$router.push('/login')">用户登录</li>
              <li class="active">用户注册</li>
            </ul>
          </div>
          <div class="simple_content_div">
            <el-form class="reg-form" :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label prop="name">
                <el-input v-model="ruleForm.name" placeholder="账号"></el-input>
              </el-form-item>

              <el-form-item label prop="real_name">
                <el-input v-model="ruleForm.real_name" placeholder="真实姓名"></el-input>
              </el-form-item>

              <el-form-item label prop="area">
                <el-cascader
                  size="medium"
                  placeholder="地区"
                  style="display:block"
                  :options="areasData"
                  v-model="ruleForm.area"
                ></el-cascader>
              </el-form-item>

              <el-form-item label prop="mobile" :error="accountError">
                <el-input v-model="ruleForm.mobile" placeholder="手机号"></el-input>
              </el-form-item>

              <el-form-item label prop="password">
                <el-input type="password" v-model="ruleForm.password" placeholder="密码"></el-input>
              </el-form-item>

              <el-form-item label prop="repassword">
                <el-input type="password" v-model="ruleForm.repassword" placeholder="确认密码"></el-input>
              </el-form-item>

              <el-form-item label prop="rec_name">
                <el-input v-model="ruleForm.rec_name" placeholder="推荐人账号"></el-input>
              </el-form-item>

              <el-form-item label prop="mobile_code" v-if="reg_sms_open==1">
                <el-input v-model="ruleForm.mobile_code" class="get-phone-sms" placeholder="短信验证码">
                  <template slot="append">
                    <el-button v-if="!isSend" @click="sendSmsCode" type="primary">获取</el-button>
                    <el-button v-else>{{time}}</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>

            <label class="agree_box">
              <input class="agree" v-model="readme" type="checkbox">
              我已阅读并同意《
              <a class="red" @click="dialogVisible=true">聖珍用户注册协议</a>》
            </label>
            <div class="zhuce-but">
              <div class="huang"></div>
              <input
                type="button"
                @click="submitForm('ruleForm')"
                value="同意协议，立即注册"
                class="btn-mains btn"
              >
            </div>
            <div class="lijidenglu">
              <input @click="$router.replace('/login')" class="btn-gray btn" value="已注册,立即登录">
            </div>
          </div>

          <el-dialog title="注册协议" :visible.sync="dialogVisible" width="95%" top="5vh">
            <div class="license-content">
              <div v-html="agreement" style="height:370px;overflow:auto"></div>
              <div class="mt20 tc">
                <a @click="agreementAgreement" class="btn">同意用户注册协议</a>
              </div>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <el-dialog title="注册协议" :visible.sync="dialogVisible" width="95%" top="5vh">
      <div class="license-content">
        <div v-html="agreement" style="height:370px;overflow:auto"></div>
        <div class="mt20 tc">
          <a @click="agreementAgreement" class="btn">同意用户注册协议</a>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["agreement"],
  data() {
    let testNewPassWord = (rule, value, callback) => {
      if (this.ruleForm.password !== value) {
        return callback(new Error("两次输入密码不一致"));
      }
      callback();
    };
    return {
      dialogVisible: false,
      readme: false,
      ruleForm: {
        name: "",
        mobile: "",
        password: "",
        repassword: "",
        rec_name: "",
        real_name: "",
        area: [],
        mobile_code: ""
      },
      rules: {
        name: [{ required: true, message: "请填写账号", trigger: "blur" }],
        real_name: [
          { required: true, message: "请填写真实姓名", trigger: "blur" }
        ],
        area: [{ required: true, message: "请选择地区", trigger: "blur" }],
        mobile: [
          {
            required: true,
            message: "请填写正确的手机号码",
            max: 11,
            min: 11,
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        repassword: [
          { required: true, message: "请填写确认密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          },
          { validator: testNewPassWord, trigger: "blur" }
        ],
        rec_name: [
          { required: false, message: "请填写推荐人", trigger: "blur" }
        ],
        mobile_code: [
          { required: true, message: "短信验证码", trigger: "blur" }
        ]
      },
      isSend: false,
      time: 120,
      accountError: "",
      reg_sms_open: 0
    };
  },
  computed: {
    ...mapState({
      areaData: "areaData",
      fitPhoneTop: "fitPhoneTop"
    }),
    areasData() {
      if (!this.areaData) {
        return [];
      }

      let fun = obj => {
        let arr = [];

        for (let key in obj) {
          let res = {};
          res.value = key;
          res.label = obj[key].t;

          if (obj[key].c) {
            res.children = fun(obj[key].c);
          }

          arr.push(res);
        }

        return arr;
      };

      return fun(this.areaData);
    }
  },
  created() {
    this.getAreaData();
    this.simpleApiRegSmsopen();
  },
  methods: {
    agreementAgreement() {
      this.dialogVisible = false;
      this.readme = true;
    },
    //提交注册信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let successCallback = data => {
            this.$router.replace("/login");
          };

          let {
            name,
            mobile,
            password,
            repassword,
            rec_name,
            real_name,
            mobile_code
          } = this.ruleForm;
          let [province, city, county] = this.ruleForm.area;
          let params = {
            name,
            mobile,
            password,
            repassword,
            rec_name,
            real_name,
            province,
            city,
            county,
            mobile_code
          };
          this.$store.dispatch({
            type: "postSimpleRegAct",
            params,
            successCallback
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取是否开启短信验证码
    simpleApiRegSmsopen() {
      let successCallback = data => {
        this.reg_sms_open = Number(data.reg_sms_open);
        // console.log(data.reg_sms_open)
      };
      let params = {};
      this.$store.dispatch({
        type: "simpleApiRegSmsopen",
        params,
        successCallback
      });
    },
    getAreaData() {
      this.$store.dispatch({ type: "getAreaData" });
    },
    //短信验证码
    sendSmsCode() {
      if (this.ruleForm.mobile.length != 11) {
        this.accountError = "请填写11位手机号！";
        return;
      }
      let params = {
        account: this.ruleForm.mobile
      };
      let successCallback = data => {
        if (!data.error) {
          this.isSend = true;
          this.accountError = "";
          this.$message({
            message: "发送成功",
            type: "success"
          });
          this.sendCompletion();
        } else {
          this.accountError = data.message;
        }
      };
      this.$store.dispatch({
        type: "simpleApiSendCode",
        params,
        successCallback
      });
    },
    //发送完成
    sendCompletion() {
      this.time = this.time - 1;
      setTimeout(() => {
        if (this.time == 0 || this.time < 0) {
          this.time = 120;
          this.isSend = false;
        } else {
          this.sendCompletion();
        }
      }, 1000);
    }
  }
};
</script>


<style lang="scss">
.content{
  overflow: auto;
}
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
.simple_content_div .el-input__inner {
  width: 100%;
  height: 50px;
  line-height: 30px;
  background: none; /* border: none;*/
  border: 1px #e6e6e6 solid;
  border-radius: 8;
  padding: 0 10px;
  outline: 0;
  font-size: 15pt;
}
.login-form-list dl {
  padding-top: 20px;
}
.simple_content_div {
  padding: 28px 28px 0;
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
  margin-top:20px;
}
.agree_box{
   display: flex;
  align-items: center;
}
.red{
  color: red;
}
.agree{
  width: 15px;
  height: 15px;
  margin-right: 10px;
  border:1px #e6e6e6 solid;
}
.btn-gray{
  width: 100%;
  line-height: 45px;
  text-align: center;
  background-color: #f4f4f4;
  border: none;
  border-radius: 35px;
  font-size: 16px;
  font-weight: 600;
  margin:20px 0 40px;

}
.login {
  .goback {
    margin: 0.3rem;
    position: absolute;
  }
  form {
    position: relative;
    .logo {
      position: absolute;
      display: block;
      width: 3.5rem;
      left: 0;
      right: 0;
      top: 0.5rem;
      margin: 0 auto;
    }
    .top {
      width: 5.5rem;
      height: 2.1rem;
      // background-image: url('./images/input_05.png');
      background-size: 100%;
      position: absolute;
      top: 4rem;
      // left:0.44rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      input {
        position: absolute;
        display: block;
        width: 5.5rem;
        right: 0;
        border: none;
        background: none;
        padding-left: 0.14rem;
        box-sizing: border-box;
        line-height: 0.53rem;
        height: 0.53rem;
        font-size: 0.28rem;
        border-bottom: 1px solid #000;
      }
      input::-webkit-input-placeholder {
        color: #00853a;
      }
      .username {
        top: 0.38rem;
      }
      .password {
        top: 1.48rem;
      }
    }
    .bottom {
      position: absolute;
      width: 5.56rem;
      height: 1.85rem;
      top: 6.3rem;
      left: 1.01rem;
      .zhongjianzi {
        font-size: 0.18rem;
        margin-bottom: 0.5rem;
        a {
          color: #000;
        }
      }
      .button {
        background-color: #00853a;
        color: #fff;

        width: 100%;
        height: 0.85rem;
        background-size: 100%;
        line-height: 0.85rem;
        text-align: center;
        font-size: 0.32rem;
      }
      .zhuce {
        width: 100%;
        height: 0.85rem;
        line-height: 0.85rem;
        text-align: center;
        font-size: 0.32rem;
        border: 1px solid #000;
        box-sizing: border-box;
        margin-top: 0.2rem;
      }
      p {
        text-align: center;
        padding-top: 0.36rem;
        a {
          color: #fff;
          font-size: 0.3rem;
          height: 0.3rem;
          line-height: 0.3rem;
        }
      }
    }
  }
}
</style>

