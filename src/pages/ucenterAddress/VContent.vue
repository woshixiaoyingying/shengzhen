<template>
<div class="viewport main-viewport" style="font-size:15px">
<div class="ma20">
<div class="m20">
  <a id="address_other" class="btn" @click="$router.push('///simple/address_other')">添加新地址</a>
</div>
	<div class=" ">
		<ul class="address-list bg-white m20" v-for="(item,index) in address" :key="index">
			<li class="page-list cell-3">
				<ul>
					<li>{{item.accept_name}}</li>
					
					<li>{{item.mobile}}/{{item.phone}} </li>
					<li>{{item.zip}}</li>
				</ul>
			</li>
			<li class="p20">{{parse_area[item.province]}},{{parse_area[item.city]}},{{parse_area[item.county]}} {{item.addr}}</li>
			<li class="page-list">
				<ul class="bg-title-0">
					<li class="tc"><a class="modify" @click="changeAddress(item)">修改</a></li>
					
					<li class="tc"><a @click="ucenterAddressDel(item)">删除</a></li>
				</ul>
			</li>
		</ul>
	</div>
</div>

</div>
</template>

<script>
import {Dialog} from 'vant'
export default {
  props:["addressData"],
  computed:{
    address(){
      return this.addressData.address||[]
    },
    parse_area(){
      return this.addressData.parse_area||{}
    }
  },
  methods:{
    changeAddress(item){
      this.$router.push({ path:'///simple/address_other/change', query: item})
    },
    //删除收货地址
    ucenterAddressDel(item){
      Dialog.confirm({
        title: '提示',
        message: '您将删除该收货地址'
      }).then(() => {
        // on confirm
        let params=item
        let successCallback = data=>{
          this.$store.dispatch({type:'getUcenterAddress'})
        }
        this.$store.dispatch({type:"ucenterAddressDel",params,successCallback})
      })
    }
  }

}
</script>
<style lang="scss" scoped src="../../delirenWebStatic/css/common.scss"></style>

<style scoped>

</style>