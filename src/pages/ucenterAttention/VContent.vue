<template>
  <div style="font-size:8px;">
    <div class="viewport main-viewport">
    <div class="box">
      <ul class="list-nav">
          <li class="list-item  item attention-list" v-for="(item,index) in attentionList" :key="index">
            <a @click="$router.push(`///product/${item.gid}`)" class="layout-2 h-box m20 more" style="height:4.85em;overflow:hidden">
            <div><img :src="`${settings.imgBaseUrl}${item.img}`"></div>
            <div class="h-box">
              <dl>
              <dd class="name">{{item.name}}</dd>
              <dd class="price">价格：<b class="red">￥{{item.sell_price}}  </b>{{item.store_nums>0?'有货':'无货'}}</dd>
              </dl>
            </div>
            </a>
          </li>
         
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
import settings from '@/settings'
export default {
  data(){
    return {
      settings
    }
  },
  props:['attentionList']
}
</script>
<style lang="scss" scoped src="../../delirenWebStatic/css/common.scss"></style>
<style lang="scss" scoped src="../../delirenWebStatic/css/ucenter.css"></style>

<style scoped>

</style>