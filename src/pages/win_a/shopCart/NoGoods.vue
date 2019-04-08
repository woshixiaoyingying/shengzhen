<template>
  <div class="content">
    <div class="content-box">
        <img src="./images/shop_cart_logo_03.jpg" alt="">
        <p class="kongkong">你的购物车空空如也~</p>
        <p class="guangguang" @click="$router.replace('/win_a/home')">去逛逛吧</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'name'

}
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  flex-direction:colum;
  justify-content:center;
  align-items:center;
  background-color: #fff;
  .content-box{
    width: 3.12rem;
    height: 4.15rem;
    img{
      display: block;
      width: 1.93rem;
      margin: 0 auto;
    }
    .kongkong{
      text-align: center;
      font-size: 0.22rem;
      line-height: 0.46rem;
    }
    .guangguang{
      width: 1.93rem;
      height: 0.72rem;
      margin: 0 auto;
      border: 1px solid #ff3535;
      color: #ff3535;
      line-height: 0.72rem;
      text-align: center;
      margin-top: 0.6rem;
      border-radius: 4px;
    }
  }
}
</style>
