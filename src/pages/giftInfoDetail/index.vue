<template>
  <div class="product" :style="fitPhoneTop">
    <div class="header" >
      <van-nav-bar
        title="商品信息详情"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <product-page 
      :name="name" 
      :no="no" 
      :weight="weight" 
      :create_time="create_time" 
      :sale_protection="sale_protection"></product-page>
    </div>
    <div class="bottom" :style="fitPhoneBottom">
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import ProductPage from './GiftInfoDetail'
export default {
  components:{
    ProductPage
  },
  data () {
    return {
      valletData:{}
    }
  },
  // created(){
  //   console.log('index created')
  //   console.log(this.$route.query);
  //   console.log(this.sale_protection)
  //   console.log(this.name)
  //   console.log(this.no)
  //   console.log(this.weight)
  //   console.log(this.create_time)
  // },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
    name(){
      return this.$route.query.info.name;
    },
    no(){
      return this.$route.query.info.no;
    },
    weight(){
      return this.$route.query.info.weight;
    },
    create_time(){
      return this.$route.query.info.create_time;
    },
    sale_protection(){
      return this.$route.query.protect.sale_protection;
    }
  }
}
</script>


<style lang="scss" scoped>
.product{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.header{
  flex-shrink: 0;
  background: #fff;
}
.content{
  flex-grow:1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.bottom{
  flex-shrink: 0;
}
</style>
