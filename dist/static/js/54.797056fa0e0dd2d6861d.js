webpackJsonp([54],{"9DF2":function(e,r,t){r=e.exports=t("FZ+f")(!1),r.push([e.i,".gaimima[data-v-376d2065]{width:100%;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;background-color:#fff}.header[data-v-376d2065]{-ms-flex-negative:0;flex-shrink:0;border-bottom:1px solid #dcdee3;background:#fff}.content[data-v-376d2065]{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;overflow-y:auto;padding-top:.5rem}.bottom[data-v-376d2065]{-ms-flex-negative:0;flex-shrink:0}",""])},CvB4:function(e,r,t){var o=t("9DF2");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);t("rjj0")("c3523dae",o,!0,{})},XauG:function(e,r,t){"use strict";var o=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"gaimima"},[t("div",{staticClass:"header",style:e.fitPhoneTop},[t("van-nav-bar",{attrs:{title:"修改密码","left-arrow":""},on:{"click-left":function(r){e.$router.go(-1)}}})],1),e._v(" "),t("div",{staticClass:"content"},[t("el-form",{ref:"ruleForm",attrs:{"label-width":"100px",inline:"",model:e.ruleForm,rules:e.rules}},[t("el-form-item",{attrs:{label:"新密码",prop:"password"}},[t("el-input",{attrs:{type:"password",placeholder:"请输入新密码"},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"确认新密码",prop:"repassword"}},[t("el-input",{attrs:{type:"password",placeholder:"再次输入新密码"},model:{value:e.ruleForm.repassword,callback:function(r){e.$set(e.ruleForm,"repassword",r)},expression:"ruleForm.repassword"}})],1),e._v(" "),t("el-form-item",{attrs:{label:" "}},[t("el-button",{attrs:{type:"primary"},on:{click:function(r){e.confirmRevise("ruleForm")}}},[e._v("提交")])],1)],1)],1),e._v(" "),t("div",{staticClass:"bottom",style:e.fitPhoneBottom})])},s=[],a={render:o,staticRenderFns:s};r.a=a},gwEU:function(e,r,t){"use strict";var o=t("NYxO"),s=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e};r.a={props:["safecode"],data:function(){var e=this,r=function(r,t,o){if(e.ruleForm.password!==t)return o(new Error("两次输入密码不一致"));o()},t=function(e,r,t){if(r.length>16||r.length<6)return t(new Error("六到16位任意数字字母组合"));t()};return{ruleForm:{oldpassword:"",password:"",repassword:""},rules:{oldpassword:[{required:!0,message:"请输入旧密码",trigger:"blur"},{validator:t,trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{validator:t,trigger:"blur"}],repassword:[{required:!0,message:"请确认密码",trigger:"blur"},{validator:t,trigger:"blur"},{validator:r,trigger:"blur"}]}}},created:function(){},computed:s({},Object(o.b)({fitPhoneTop:"fitPhoneTop",fitPhoneBottom:"fitPhoneBottom"})),methods:{confirmRevise:function(e){var r=this;this.$refs[e].validate(function(t){if(!t)return console.log("error submit!!"),!1;var o=r.ruleForm,s=o.password,a=o.repassword,i=(o.oldpassword,function(t){t.error?r.$message.error(t.message):(r.$refs[e].resetFields(),r.$message({message:"密码重置成功！",type:"success"}),r.$router.replace("/login"))}),l={safecode:r.safecode,password:s,repassword:a};r.$store.dispatch({type:"postSimpleApiResetPassword",params:l,successCallback:i})})}}}},jbV1:function(e,r,t){"use strict";function o(e){t("CvB4")}Object.defineProperty(r,"__esModule",{value:!0});var s=(t("ndRy"),t("gwEU")),a=t("XauG"),i=t("VU/8"),l=o,n=i(s.a,a.a,!1,l,"data-v-376d2065",null);r.default=n.exports},ndRy:function(e,r,t){"use strict";var o=t("NYxO"),s=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e};s({},Object(o.b)({fitPhoneTop:"fitPhoneTop",fitPhoneBottom:"fitPhoneBottom"}))}});