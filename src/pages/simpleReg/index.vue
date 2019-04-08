<template>
  <div class="zhuce">
    <div class="content">
      <v-content :agreement="agreement"></v-content>
    </div>
    <div class="bottom" >

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import VContent from './VContent'
export default {
  data(){
    return {
      agreement:""
    }
  },
  components:{
    VContent,
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      let successCallback=data=>{
        console.log(data)
        this.agreement = data;
        
      }
      let params = {}
      this.$store.dispatch({type:"getSimpleReg",params,successCallback})
    }
  }
}
</script>
<style lang="scss" scoped>
.zhuce{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;

}
.content{
  flex-grow:1;
  display: flex;
  flex-direction: column;
  background-image: url('./images/zhicebg_01.jpg');
  background-size: cover;
  background-position: center;
}
.bottom{
  flex-shrink: 0;
}
</style>
