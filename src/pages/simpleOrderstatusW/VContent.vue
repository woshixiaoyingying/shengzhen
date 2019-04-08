<template>
<div class="viewport main-viewport" style="font-size:10px;">
<div class=" ma20">
<form >

<div class=" pb10  clearfix tc">
    <img src="./images/right.gif"><b class=" f18">订单支付成功！</b>
</div>
<div class="p20 mt20 bg-white line-2">

    <ul class="pt10">
        <li>订单编号： <i class="icon-order-0 ie6png"></i>{{simpleOrderStatus.order_no}} &nbsp;&nbsp;&nbsp;&nbsp;
        <a @click="$router.push(`/ucenter/orderdetail/${simpleOrderStatus.id}`)" target="_blank" class="red"> 查看订单&gt;&gt; </a>
        </li>
        <li>订单金额：<span class="red">￥{{simpleOrderStatus.order_amount}}</span></li>
        <li>支付方式：<span  class="bold">{{simpleOrderStatus.payname}}</span></li>
    </ul>

</div>
<div class="mt20 p20 bg-white line-2">
        <p><a @click="showOrderPay=!showOrderPay"><i :class="showOrderPay?'icon-minus':'icon-plus'"></i>其它支付方式：</a></p>
        <table v-if="showOrderPay" class="form" style="width:100%;margin-left:6px;">      
          <tbody>
            <tr v-for="(item,index) in payment_list" :key="index">
              <td>
                <label>
                  <input type="radio" v-model="payment_id" :value="item.id" > {{item.pay_name}} 
                </label>                   
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</form>
</div>

</div>
</template>

<script>
export default {
  props:['simpleOrderStatus','payment_list'],
  data(){
    return {
      showOrderPay:false,
      payment_id:'',
      
    }
  },
  mounted () {
    this.payment_id=this.simpleOrderStatus.payment
  },
  watch:{
    simpleOrderStatus(){
      this.payment_id=this.simpleOrderStatus.payment
    }
  },
  methods:{
    submitOrder(){
      let successCallback=data=>{

      }
      let params = {
        order_id:this.simpleOrderStatus.id,
        payment_id:this.payment_id
      }

      this.$router.push({ path:'///payment/dopay', query: params})
      // this.$store.dispatch({type:"postPaymentDoPay",params,successCallback})
    }
  }

}
</script>
<style lang="scss" scoped src="@/huizhongtangWebStatic/css/common.scss"></style>

<style scoped>

</style>