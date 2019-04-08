<template>
<div class="ucenter-info-content">



  <el-form :model="ruleForm" :rules="rules" ref="ruleForm">

      <el-form-item label="账号">
        <span class="disabel" >{{`${ruleForm.name}`}}</span>
      </el-form-item>
       

      <!-- <el-form-item label="加盟商">
        <span class="disabel" >{{`${ruleForm.gname}`}}</span>
      </el-form-item>

       <el-form-item label="代理商">
        <span class="disabel" >{{`${ruleForm.agent_addr}${ruleForm.agent_lv}`}}</span>
      </el-form-item> -->

      <el-form-item label="真实姓名">
        <span class="disabel" >{{`${ruleForm.real_name}`}}</span>
      </el-form-item>

			<!-- <dd> -->
        <!-- <el-form-item prop="real_name" label="真实姓名">
          <el-input 
           v-model="ruleForm.real_name"  
           type="text"  
           maxlen="20"  
           placeholder="真实姓名" 
           ref="real_nameInput"
           @click="textareaTab(real_nameInput)"
           ></el-input>
        </el-form-item> -->
      <!-- </dd> -->
			<!-- <dd> -->
        <el-form-item prop="sex" label="性别：">
          <input  v-model="ruleForm.sex" name="sex" type="radio" value="0"> 
          <label> 女</label>
          &nbsp;&nbsp;
          <input v-model="ruleForm.sex" name="sex" type="radio" value="1"> 
          <label> 男</label>
        </el-form-item>
      <!-- </dd> -->
			<!-- <dd> -->
        <el-form-item  prop="birthday" label="生日">
          <!-- <input  class="input" type="text" :value="`生日：${ruleForm.birthday}`" @click="birthdayInput" placeholder="生日" alt="出生日期" inform="0"> -->
          <el-date-picker
            style="width:100%"
            value-format="yyyy-MM-dd"
            v-model="ruleForm.birthday"
            type="date"
            size="small"
            ref="birthdayPicker"
            :editable="false"
            placeholder="生日">
          </el-date-picker>
        </el-form-item>
        <!-- <label></label> -->
      <!-- </dd> -->
			<!-- <dd> -->
        <el-form-item prop="mobile" label="电话">
          <el-input 
          type="text" 
          v-model="ruleForm.mobile"   
          placeholder="联系人电话，11位手机号码" 
          alt="联系人电话，11位手机号码" 
          ref="mobileInput"
          @click="textareaTab(mobileInput)"
          ></el-input>
        </el-form-item>
			<!-- </dd> -->
			<!-- <dd id="areas" class="h-box"> -->

        <el-form-item label="省份/直辖市" prop="province">
           <br/>
          <el-select v-model="ruleForm.province" placeholder="请选择" style="width:100%;" :disabled="true">
            <el-option
              v-for="(value,key) in provinceList"
              :key="key"
              :label="value.t"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>

            <!-- <div class="select">
                  <div class="option">内蒙古</div>
            </div> -->
	

            <el-form-item label="市" prop="city">
              <br/>
              <el-select v-model="ruleForm.city" placeholder="请选择" style="width:100%;" :disabled="true">
                <el-option
                  v-for="(value,key) in cityList"
                  :key="key"
                  :label="value.t"
                  :value="key">
                </el-option>
              </el-select>
            </el-form-item>

          <el-form-item label="县区" prop="county">
            <el-select v-model="ruleForm.county" placeholder="请选择" style="width:100%;" :disabled="true">
              <el-option
                v-for="(value,key) in countyList"
                :key="key"
                :label="value.t"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item>
			    <!-- <div class="select">
			      <div class="option">市辖区</div>
			    </div> -->
			  <!-- </dd> -->
			    <!-- <dd> -->
            <el-form-item label="详细地址" prop="addr">
              <textarea
                class="address-textarea"
                :rows="4"
                placeholder="路名或街道地址，门牌号。"
                v-model="ruleForm.addr"
                ref="addressTextarea"
                @click="textareaTab(addressTextarea)"
                >
              </textarea>
            </el-form-item>
          <!-- </dd> -->
			    <el-form-item style="margin-top:10px">
            <el-button class="btn" type="primary" @click="confirmRevise('ruleForm')">保存</el-button>
			    </el-form-item>
		<!-- </dl> -->
  </el-form>
</div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
export default {
  data () {
    return {
      ruleForm:{
        real_name:"",
        sex:"",
        birthday:"",
        mobile:"",
        province:"",
        city:"",
        county:"",
        addr:"",
      },
      rules:{
        real_name: [
          { required: true, message: '请输入真实姓名' ,trigger: 'blur'},
        ],
        sex: [
          { required: true, message: '请选择性别' ,trigger: 'blur'},
        ],
        birthday:[
          { required: true, message: '请选择出生日期' ,trigger: 'blur'},
        ],
        mobile:[
          { required: true, message: '请输入正确的手机号' , max:11, min:11, trigger: 'blur'},
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
      }
    }
  },
  created(){
    this.getData()
    this.getAreaData()
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
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
    provinceList(list){
      for(let key in list){
        if(key==this.ruleForm.province){
          return 
        }
      }
      this.ruleForm.province=''
    },
    cityList(list){
      for(let key in list){
        if(key==this.ruleForm.city){
          
          return 
        }
      }
      this.ruleForm.city=''
    },
    countyList(list){
      for(let key in list){
        if(key==this.ruleForm.county){
          return 
        }
      }
      this.ruleForm.county=''
    },

  },
  methods:{
    getData(){
      let successCallback = data=>{
        console.log(data)
        this.ruleForm={...this.ruleForm,...data}
      }
      this.$store.dispatch({type:'getUcenterInfo',successCallback})
    },

    getAreaData(){
      this.$store.dispatch({type:"getAreaData"})
    },

    submitForm(){
      let params = {...this.ruleForm}
     
      let successCallback = data => {
        this.$router.go(-1)
      }
      this.$store.dispatch({type:'changeUcenterInfo',params,successCallback})
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
    //生日输入框
    birthdayInput(){
      this.$refs.birthdayPicker.focus()
    },

    textareaTab(element){
      this.$refs[element].focus()
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" >



.ucenter-info-content {
  padding: 0 0.4rem 0.5rem 0.4rem;
  .el-form{
    padding-bottom: 250px;
  }
  .el-form-item__error {
      left: auto;
      top: 16px;
      right: 2px;
  }
  .el-form-item{
    margin-bottom: 0;
    .el-form-item__content{
      span.disabel{
        float: left;
        padding-left: 10px;
        display: block;
        width: 100%;
        box-sizing: border-box;
        border-radius: 3px;
        border: 1px solid #d7dae2;
      }

    }
  }
  .btn{
    display: block;
    width: 100%;
  }
  .el-input.is-disabled .el-input__inner {
    color: #232121;
    -webkit-text-fill-color: #232121;
  }
  .address-textarea{
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid #d7dae2;
    min-height: 100px;
  }
}
</style>
