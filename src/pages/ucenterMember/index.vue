<template>
  <div class="member">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar title="我的会员相关" @click-left="$router.go(-1)" left-arrow/>
    </div>
    <div class="content">
         <v-content :memberData="memberData"></v-content>
    </div>
   
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import VContent from "./VContent";
export default {
    data(){
        return {
            memberData:{}
        }
    },
  components: {
    VContent
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters({
      fitPhoneTop: "fitPhoneTop",
      fitPhoneBottom: "fitPhoneBottom"
    })
  },
  methods: {
    getData() {
        let successCallback = data=>{
            this.memberData = data;
            console.log(data)
        }
        let params ={}
        this.$store.dispatch({type:'GetMember',params,successCallback})
    }
  }
};
</script>
<style scoped src="@/huizhongtangWebStatic/css/base.css"></style>
<style scoped>
.member{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5
}
.content{
  flex-grow:1;
  overflow-y: auto;
}
</style>