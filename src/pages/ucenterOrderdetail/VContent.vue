<template>
<div class="viewport main-viewport" style="font-size:10px">

	<div class="clearfix uc-content" style="padding-left:4px;padding-right:0;">
		<div class="page">
		<div class="page-content">
			<div class="list-nav order-info">
				<div class="list-item order-status item">
					<div class="layout-2">
						<div class="caption">订单状态：</div>
						<div>
              <order-status v-if="order.order_status" :item="order"></order-status>
            </div>
					</div>
					<div class="layout-2">
						<div class="caption">订单编号：</div>
						<div>{{order.order_no}}</div>
					</div>
          <div class="layout-2">
						<div class="caption">创建时间：</div>
						<div>{{order.create_time}}</div>
					</div>
					<div class="order-status-list">
            <div v-if="order['pay_status']>0">{{order['pay_time']}}&nbsp;&nbsp;<span class="black">订单支付，付款金额 ￥<b>{{order['order_amount']}}</b></span></div>
            <div v-if="order['delivery_status']>0">
              {{order['send_time']}}&nbsp;&nbsp;<span class="black">订单<b class="orange">全部商品</b>已发货</span></div>
            <div v-if="order['status']==4">
              {{order['completion_time']}}&nbsp;&nbsp;<span class="black">订单完成</span>
            </div>
					</div>
				</div>
				<div class="mt10 item clearfix">
					<div class="layout-2">
						<div class="caption">收货人：</div>
						<div>{{order.accept_name}}</div>
					</div>
					<div class="layout-2">
						<div class="caption">地&nbsp;&nbsp;&nbsp;&nbsp;址：</div>
						<div>{{order.addr}}</div>
					</div>
					<div class="layout-2">
						<div class="caption">手&nbsp;&nbsp;&nbsp;&nbsp;机：</div>
						<div>{{order.mobile}}</div>
					</div>
					<div class="layout-2 " style="height:1.6em;">
						<div class="caption">电&nbsp;&nbsp;&nbsp;&nbsp;话：</div>
						<div>{{order.phone}}</div>
					</div>

				</div>
				<div class="mt10 item clearfix" >

				  <div class="layout-2">
						<div class="caption">支付方式：</div>
						<div>{{order.pay_name}}</div>
					</div>
					<div class="layout-2">
						<div class="caption">运&nbsp;&nbsp;&nbsp;&nbsp;费：</div>
						<div>{{order.payable_freight}}</div>
					</div>

          <template v-if="order['delivery_status']>0">
         
            <div class="layout-2">
              <div class="caption">物流公司：</div>
              <div>{{invoice['ec_name']}}</div>
            </div>
            <div class="layout-2">
              <div class="caption">快递单号：</div>
              <div>
                <!-- <a class=" more " target="_blank">查询物流[ -->
                  {{invoice['express_no']}}
                  <!-- ]</a> -->
                  </div>
            </div>
      
          </template>  

				</div>
				<div class="mt10 clearfix">
					<ul class="list-nav list-order clearfix">
						<li v-for="(item,index) in order_goods" :key="index" class="item layout-2 mt10 h-box goods-list-item clearfix" style="padding:0.5em 0;">
							<div class="img">
                <img :src="`${settings.imgBaseUrl}${item.img}`">
              </div>
							<div style="margin-left:7.5em;">
								<div class="name"><a @click="$router.push(`///product/${item.goods_id}`)">{{item.name}}</a></div>
								<div class="info">
									<span v-for="(it,inde) in getSpecsKeyArr(item.specs_key)" :key="inde">
                      {{splitSpec(item,it)}}&nbsp;&nbsp;&nbsp;
                  </span>
                 
									<span>售价：￥{{item.real_price}}</span><span>数量：{{item.goods_nums}}</span><span>小计：￥{{subtotal(item)}}</span>
								
								</div>
							</div>
						</li>
					</ul>
				</div>
					<div class="mt10 tr order-total clearfix">
					<div class="pb10">
												<p>商品总金额：￥{{total}}</p>
												<p>+ 运费：￥{{order['real_freight']}}</p>
                        
                        <p v-if="order['taxes']>0">+ 税：￥{{order['taxes']}}</p>
                       
												<p>- 优惠：￥{{order['discount_amount']}}</p>
					</div>
					<div class="t-line pt10 total">
						订单支付金额：<b>￥{{order['order_amount']}}</b>
					</div>
				</div>
			</div>
			</div>
		</div>
	</div>

</div>
</template>

<script>
import OrderStatus from '@/pages/components/orderStatus/index' 
import settings from '@/settings'
import {number_format} from '@/common/common'
export default {
  components:{
    OrderStatus
  },
  props:["orderDetails"],
  data(){
    return {
      settings,
      number_format
    }
  },
  computed:{
    order(){
      return this.orderDetails.order||{}
    },
    order_goods(){
      return this.orderDetails.order_goods||[]
    },
    parse_area(){
      return this.orderDetails.parse_area||{}
    },
    total(){
      let total = 0
      this.order_goods.map(item=>{
        total += item['real_price']*item['goods_nums']
      })
      return number_format(total)
    },
    invoice(){
      return this.orderDetails.invoice||{}

    }
    
  },
  methods:{
    getSpecsKeyArr(specs_key){
      
      if(specs_key){
        let str = specs_key.substring(1,specs_key.length-1)
        return str.split(';')
      } 
      return []
    },
    splitSpec(item,it){
      let arr = it.split(':')
      
      let sName = item.specs[arr[0]].name
      let sValues = item.specs[arr[0]].value
      let sValue = sValues[arr[1]].name

      return `${sName}：${sValue}`
    },
    subtotal(item){
      return number_format(item['real_price']*item['goods_nums'])
    }
  }

}
</script>
<style lang="scss" scoped src="@/delirenWebStatic/css/ucenter.css">
</style>
<style lang="scss" scoped src="@/delirenWebStatic/css/product.css">
</style>
<style lang="scss" scoped src="@/delirenWebStatic/css/common.scss">
</style>

<style scoped lang="scss">
.list-order{
  .goods-list-item{
    height: 6.8em;
  }
}
</style>