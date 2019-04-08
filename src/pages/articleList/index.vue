<template>
  <div class="art" :style="fitPhoneTop">
    <div class="header" >
      <van-nav-bar title="琞珍商城" @click-left="$router.go(-1)" left-arrow>
          <!-- <img src="static/images/share.png" slot="right" class="share"> -->
        </van-nav-bar>
    </div>
    <art-list :artInfo="artInfo"></art-list>
  </div>
</template>

<script>
import ArtList from './artlist';
import {mapState,mapGetters} from 'vuex'
export default {
    components:{
        ArtList
    },
    data(){
        return {
            artInfo:[]
        }
    },
    computed:{
           ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
      category_id(){
          return this.$route.query.category_id
      }
  },
  created(){
    this.getArtList()
  },

    methods:{
        getArtList(){
            let successCallback = data=>{
            this.artInfo = data;

          }
          let params = {
            category_id:this.category_id,
           
          }
          this.$store.dispatch({type:'getArtList',params,successCallback})
        }
    }
};
</script>

<style scoped>
.art{
   width: 100%;
  height: 100%;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.share{
  position: relative;
  transform: translate(0%,60%);
  width:20px;
}
</style>