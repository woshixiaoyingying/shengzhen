<template>
  <div>
    <div class="rush-buy boxt-title">
      <div class="tcon">
        <h3>今日特价</h3>
        <a @click="$router.push(`//gift/make`)">
          <input type="button" class="giftbtn" name="gift" value="送礼物">
        </a>
      </div>
      <div class="mcon">
        <div class="mcon">
          <ul v-if="goodsData.low_price">
            <li v-for="(item,index) in goodsData.low_price" :key="index">
              <a @click="$router.push(`///product/${item.id}`)" style="display:block;">
                <div class="rush-img">
                  <img
                    class="lazy"
                    alt
                    :src="`${settings.imgBaseUrl}${item.img}`"
                    width="156"
                    height="156"
                  >
                </div>
                <div class="rush-intro">
                  <h2>{{item.name}}</h2>
                  <div class="rush-price">
                    抢购价：
                    <span>￥{{item.sell_price}}</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main-push boxt-title" v-if="goodsData.main_push">
      <div class="tcon">
        <h3>主推产品</h3>
      </div>
      <div class="mcon" v-for="(item,index) in goodsData.main_push" :key="index">
        <a @click="$router.push(`///product/${item.id}`)">
          <div class="img">
            <!-- <img :src="`${settings.imgBaseUrl}${item.img}`" alt> -->
            <img :src="`${settings.imgBaseUrl}${goodsData.ztt.content[0].path}`" alt>

          </div>

          <div class="intro" style="padding:0 0.26rem;">
            <div class="title">{{item.name}}</div>
            <div class="info">{{item.subtitle}}</div>
            <div class="purice">会员价：
              <span>￥{{item.sell_price}}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import settings from '@/settings'
export default {  
  props:["goodsData"],
  data(){
    return {
      settings
    }
  },



};
</script>

<style scoped lang="scss" src="@/huizhongtangWebStatic/css/common.scss"> 
</style>