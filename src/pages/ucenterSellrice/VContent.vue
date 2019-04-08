<template>
  <div class="viewport main-viewport" style="font-size:10px;">

    <div class="p20 bg-title-0 fz36">剩余酒米：
      <b class="red">{{ucenterApiSellriceData.winerice_num}}</b>
    </div>
    <div class="tab bg-white" index="0">
      <div class="tab-body ma20">
        <form
          class="simple"
        >
          <dl>
            <dd>酒米价格：¥{{ucenterApiSellriceData.winerice_price}}
              <label style="color: #758697">(剩余抢购数量:{{ucenterApiSellriceData.winerice_surplus}})</label>
            </dd>
            <dd>
              <input
                type="number"
                class="input"
                placeholder="抛售数量"
                inform="0"
                v-model="amount"
              >
            </dd>
            <dd>
              <input type="button" @click="submit" class="btn" value="确认抛售">
            </dd>
          </dl>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      ucenterApiSellriceData:{},
      amount:''
    }
  },
  watch:{
    amount(){
      if(this.amount > Number(this.ucenterApiSellriceData.winerice_num)){
        this.amount = Number(this.ucenterApiSellriceData.winerice_num)
      }
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      let successCallback = data=>{
        this.ucenterApiSellriceData = data
      }
      let params ={

      }
      this.$store.dispatch({type:'ucenterApiSellrice',params,successCallback})
    },
    submit(){
      let successCallback = data=>{
        this.$router.go(-1)
      }
      let params ={
        amount:this.amount
      }
      this.$store.dispatch({type:'ucenterApiSellriceSave',params,successCallback})
    }
  },
};
</script>

<style lang="scss" scoped src="../../huizhongtangWebStatic/css/common.scss">

</style>

<style scoped>

</style>