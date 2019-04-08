<template>
  <li @click="productClick(item.id)">
    <img class="tupian" :src="`${settings.imgBaseUrl}${item.icon_app||item.img}`" alt="">
    <p class="title">{{item.name}}</p>
    <div class="price">
      <span class="huiyuanjia">{{item.sell_price}}</span>
    </div>
  </li>
</template>

<script>
import settings from '@/settings'
export default {
  data(){
    return {
      settings
    }
  },
  props:["item"],
  methods:{
    //点击热销商品
    productClick(id){
      this.$router.push(`//gift/info/${id}`)
    }
  }

}
</script>

<style lang="scss" scoped>
li{
  list-style: none;
  border-top: 1px solid #f5f5f5;
  // padding: 0.28rem;
  box-sizing: border-box;
  position: relative;    
  width: 44%;
  margin: 0 3%;
  float: left;
  .tupian{
    display: block;
    height: 3.17rem;
    width: 100%;
    border-radius: 0.12rem;
  }
  .title{
    font-size: 10pt;
    font-weight: normal;
    padding: 0.5rem 0 0.2rem;
    line-height: 24px;
    margin: 0;
  }
  .price {
    font-size: 14pt;
    font-weight: normal;
    padding: 0 0 0.3rem;
    line-height: 24px;
    margin: 0;
    color: #cebb81;
  }
}
</style>