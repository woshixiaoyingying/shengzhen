<template>
  <div class="product">
    <div class="content">
      <product-page :id="id"></product-page>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import ProductPage from './ProductPage'
export default {
  components:{
    ProductPage
  },
  data () {
    return {
      valletData:{}
    }
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
    id(){
      return this.$route.params.id
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
  border-bottom: 1px solid #dcdee3;
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
