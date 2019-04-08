<template>

         

<div style="padding-top:20px">
   <el-form label-width="110px"  inline :model="ruleForm" :rules="rules" ref="ruleForm">

        <el-form-item label="姓名" prop="accept_name" >
          <el-input type="text" placeholder="请输入真实姓名" v-model="ruleForm.accept_name"></el-input>
        </el-form-item>

        <el-form-item label="省份/直辖市" prop="province">
          <el-select v-model="ruleForm.province" placeholder="请选择">
            <el-option
              v-for="(value,key) in provinceList"
              :key="key"
              :label="value.t"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="市" prop="city">
          <el-select v-model="ruleForm.city" placeholder="请选择">
            <el-option
              v-for="(value,key) in cityList"
              :key="key"
              :label="value.t"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="县区" prop="county">
          <el-select v-model="ruleForm.county" placeholder="请选择">
            <el-option
              v-for="(value,key) in countyList"
              :key="key"
              :label="value.t"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="详细地址" prop="addr">
          <el-input type="textarea" placeholder="路名或街道地址，门牌号。" v-model="ruleForm.addr"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="zip">
          <el-input type="number" placeholder="邮政编码,为6位数字" v-model="ruleForm.zip"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input type="number" placeholder="联系人电话，11位手机号码" v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        
        <el-form-item label="设为默认">
          <el-switch
            v-model="ruleForm.is_default"
            active-color="#13ce66"
            inactive-color="#ccc">
          </el-switch>
        </el-form-item>
          
        <p style="text-align:center;" >
          <el-button type="primary" @click="confirmRevise('ruleForm')">提交</el-button>
        </p>

    </el-form>
     
		</div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  props:[
    "query"
  ],
  data(){
    return {
      ruleForm:{
        client:"mobile",
        accept_name:"",  //姓名
        id:"",          
        province:"",    //省份 
        city:"",        //市
        county:"",      //县
        addr:"",        //地址
        zip:"",         //邮箱
        mobile:"",      //电话
        is_default:false
      },
      rules: {
        accept_name:[
          { required: true, message: '长度2至10个字', max:10 ,min:2,trigger: 'blur'},
        ],
        province: [
          { required: true, message: '请选择' ,trigger: 'blur'},
        ],
        city: [
          { required: true, message: '请选择', trigger: 'blur'},
        ],
        county: [
          { required: true, message: '请选择', trigger: 'blur'},
        ],
        addr: [
          { required: true, message: '请输入5-120字', min:5,max:120, trigger: 'blur'},
        ],
        zip: [
          { required: true, message: '请输入邮编',max:6,min:6, trigger: 'blur'},
        ],
        mobile: [
          { required: true, message: '请输入11位手机号', max:11,min:11, trigger: 'blur'},
        ]
      }
    }
  },
  computed:{

    ...mapState({
      areaData:"areaData"
    }),

    // 列表
    provinceList(){
      return this.areaData||{}
    },
    cityList(){
      return this.provinceList[this.ruleForm.province]?this.provinceList[this.ruleForm.province].c:{}
    },
    countyList(){
      return this.cityList[this.ruleForm.city]?this.cityList[this.ruleForm.city].c:{}
    }

  },
  watch:{
    provinceList(){
      this.ruleForm.province=''
    },
    cityList(){
      this.ruleForm.city=''
    },
    countyList(){
      this.ruleForm.county=''
    },
  },
  mounted () {
    this.getAreaData()    

    if(this.query){
      let obj={...this.query}
      obj.is_default = ( obj.is_default == '1' ? true : false )
      this.ruleForm = {...this.ruleForm,...obj}
    }
    
  },
  methods:{
    getAreaData(){
      this.$store.dispatch({type:"getAreaData"})
    },
    submitForm(){
      let params = {...this.ruleForm}
      params.is_default=params.is_default ? 1 : 0
      let successCallback = data => {
        this.$router.go(-1)
      }
      this.$store.dispatch({type:'changeAddress',params,successCallback})
    },
    // 提交按钮
    confirmRevise(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitForm()
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
  }
}
</script>


<style scoped>

</style>