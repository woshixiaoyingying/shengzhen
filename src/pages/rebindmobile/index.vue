<template>
  <div class="xiugaishoujihao">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="修改绑定手机"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
    <div style="padding-top:10px">
      <el-form label-width="100px"  inline :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="新手机号" prop="mobile">
            <el-input type="text" placeholder="请输入新手机号" v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          
          <p style="text-align:center;">
            <el-button type="primary" @click="confirmRevise('ruleForm')">提交</el-button>
          </p>

        </el-form>

    </div>

    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
export default {
  data () {
    return {
      ruleForm:{
        mobile:"",
      },
      rules: {
        mobile:[
          { required: true, message: '请输入新手机号',max:11,min:11,trigger: 'blur'}
        ],
      }
    }
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),

  },
  methods:{
    submitForm(content){

      let params = content
      let successCallback = () =>{
        this.$router.go(-1)
      }

      this.$store.dispatch({type:'rePayPassword',params,successCallback})

    },
       //确认修改
    confirmRevise(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let successCallBack=()=>{
            this.$refs[formName].resetFields();
          }

          let {mobile}=this.ruleForm

          let content={mobile,obj:'mobile'}
          this.submitForm(content)

        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.xiugaishoujihao{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.header{
  flex-shrink: 0;
  border-bottom: 1px solid #dcdee3;
  background: #fff;
}
.content{
  flex-grow:1;
  overflow-y: auto;
}
.bottom{
  flex-shrink: 0;
}
</style>
