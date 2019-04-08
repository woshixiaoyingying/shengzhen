<template>
  <div style="font-size:5px;">
    <div class="viewport main-viewport">
      <div class="ma20 bg-white list-nav" v-for="(item,index) in orderList" :key="index">
        <dl class="order_info list-item item">
          <a class="more pt20" @click="$router.push(`/ucenter/orderdetail/${item.id}`)">
            <dd class="order_id">
              <span>订单编号：</span>
              {{item.order_no}}
              <i :class="`icon-order-${item.type}`"></i>
            </dd>
            <dd>
              <span>订单日期：</span>
              {{item.create_time}}
            </dd>
            <dd>
              <span>订单金额：</span>
              ￥{{item.order_amount}}
            </dd>
            <dd>
              <span>订单状态：</span>
              <order-status :item="item"></order-status>
            </dd>
            <dd>
              <span>支付方式：</span>
              {{item.payment_name}}
            </dd>
          </a>
          <dd class="topline"></dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import OrderStatus from "@/pages/components/orderStatus/index";
export default {
  props: ["orderList"],
  components: {
    OrderStatus
  }
};
</script>
<style lang="scss" scoped src='../../delirenWebStatic/css/common.scss'></style>
<style lang="scss" scoped src='../../delirenWebStatic/css/ucenter.css'></style>
<style lang="scss" scoped src='../../delirenWebStatic/css/product.css'></style>
