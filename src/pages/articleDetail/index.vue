<template>
  <div class="art" :style="fitPhoneTop">
    <div class="header" >
      <van-nav-bar title="琞珍商城" @click-left="$router.go(-1)" left-arrow>
       <!-- <img src="static/images/share.png" slot="right" class="share"> -->
        </van-nav-bar>
    </div>
    <art-content :id="id"></art-content>
  </div>
</template>

<script>
import ArtContent from './ArtContent';
import {mapState,mapGetters} from 'vuex'
export default {
    components:{
        ArtContent
    },
  computed:{
       ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
      id(){
          return this.$route.query.id
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