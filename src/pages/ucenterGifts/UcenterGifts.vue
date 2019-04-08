<template>
  <div style="font-size:9px;">
    <div class="viewport main-viewport">


      <div class="ma20 bg-white list-nav" v-for="(item,index) in giftOrderList" :key="index">
        <dl class="order_info list-item  item  ">
          <a class="more pt20 " 
          @click="goToDetail(item)">
            <dd class="order_id"><span>订单编号：</span>	{{item.order_no}}
              <i :class="`icon-order-${item.type}`"></i>
            </dd>
            <dd><span>订单日期：</span>{{item.created_at}}</dd>
            <dd v-if="!item.status"><span>礼物状态：</span>未领取</dd>
            <dd v-if="item.status"><span>礼物状态：</span>已领取</dd>
          </a>
          <dd class="topline pb20">
            <span>物流状态：</span> 未发货
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import OrderStatus from '@/pages/components/orderStatus/index'
export default {
  props: ['giftOrderList'],
  components: {
    OrderStatus
  },
  methods:{
    goToDetail(item){
      let path = '//ucenter/gifts/OrderDetail';
      let query = {
            id:item.id
          };
      this.$router.push({path:path,query:query})
    }
  }
}
</script>
<style lang="scss" scoped src='../../delirenWebStatic/css/common.scss'></style>
<style lang="scss" scoped src='../../delirenWebStatic/css/ucenter.css'></style>
<style lang="scss" scoped src='../../delirenWebStatic/css/product.css'></style>
<style scoped>
.order_info .topline {
    border-top: 1px dotted #c2c2c2;
    padding-top: 10px;
}
.order_info dd {
    color: #666;
    font-size: 1.5em;
    line-height: 1.5em;
    margin-bottom: 0.4em;
}
</style>

