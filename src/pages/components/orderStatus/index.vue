<template>
<span class="text-danger">
    {{order_status[item.order_status].text}}
    <a v-if="order_status[item.order_status].button" @click="buttonClick(item)" class="btn btn-main btn-mini">
      {{order_status[item.order_status].button.text}}
    </a>
  </span>
</template>

<script>
export default {
  props:["item"],
  data(){
    return {
      //订单状态
      order_status:{
        1 :{text:'等待付款',button:{text:'付款'}}, //（付款链接） 
        2 :{text:'等待审核'}, 
        3 :{text:'等待审核',button:{text:'另选支付'}}, //（另选支付链接） 
        4 :{text:'等待付款',button:{text:'付款'}},//（付款链接） 
        5 :{text:'等待发货'}, 
        6 :{text:'已发货',button:{text:'确认收货'}},//（确认收货）   
        7 :{text:'已退款'}, 
        8 :{text:'已完成'}, 
        9 :{text:'已退款'}, 
        10 :{text:'已取消'}, 
        11 :{text:'已作废'}
      }
    }
  },
  created(){
  
  },
  methods: {
    // 确认收货
    confirmationOfReceipt(item){
      let successCallback=data=>{
        this.$emit('getData')
      }
      let params={id:item.id}
      this.$store.dispatch({type:"confirmationOfReceipt",params,successCallback})
    },
    buttonClick(item){
      switch (item.order_status) {
        case 1:
          this.$router.push(`/simple/order_status/${item.id}`)
          break;
        case 3:
          this.$router.push(`/simple/order_status/${item.id}`)
          break;
        case 4:
          this.$router.push(`/simple/order_status/${item.id}`)
          break;
        case 6:
          this.confirmationOfReceipt(item)
          break;
      
        default:
          break;
      }
    }
  },

}
</script>

<style lang="scss" scoped src='@/delirenWebStatic/css/common.scss'></style>

<style lang="scss" scoped src='@/delirenWebStatic/css/product.css'></style>