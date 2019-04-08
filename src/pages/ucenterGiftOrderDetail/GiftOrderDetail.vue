<template>
<div class="wodeliwudingdanxiangqing">
	<div class="list-nav order-info">
		<div class="list-item order-status item">
			<div class="layout-2">
				<div class="caption">订单状态：</div>
				<div>{{status}}</div>
			</div>
			<div class="layout-2">
				<div class="caption">订单编号：</div>
				<div>{{orderInfo.order_no}}</div>
			</div>
			<div class="layout-2">
				<div class="caption">创建时间：</div>
				<div>{{orderInfo.created_at}}</div>
			</div>
		</div>

		<div class="mt10 item">
			<div class="layout-2">
				<div class="caption">收货人：</div>
				<div>{{orderInfo.user_name!=''?orderInfo.user_name:'暂无'}}</div>
			</div>
			<div class="layout-2">
				<div class="caption">地&nbsp;&nbsp;&nbsp;&nbsp;址：</div>
				<div>{{orderInfo.addr!=''?orderInfo.addr:'暂无'}} </div>
			</div>
			<div class="layout-2">
				<div class="caption">手&nbsp;&nbsp;&nbsp;&nbsp;机：</div>
				<div>{{orderInfo.tel!=''?orderInfo.tel:'暂无'}}</div>
			</div>


		</div>	

		<div class="mt10 item">

			<div class="layout-2">
				<div class="caption">物流公司：</div>
				<div>{{invoiceInfo.ec_name!=''&&invoiceInfo.ec_name?invoiceInfo.express_no:'暂无'}}</div>
			</div>
			<div class="layout-2">
				<div class="caption">快递单号：</div>
				<div>{{invoiceInfo.express_no!=''&&invoiceInfo.express_no?invoiceInfo.express_no:'暂无'}}</div>
			</div>
		</div>
		<div class="mt10">
			<ul class="list-nav list-order ">
				<li class="item layout-2 mt10 h-box" style="padding:0.5em 0;">
					<div class="img">
						<img :src="`${settings.imgBaseUrl}${goodInfo.img}`">
					</div>
					<div style="margin-left:7.5em;">
						<div class="name">
							<a href="/index/product/id/" target="_blank"></a>
						</div>
						<div class="info" style="font-size:14px;">
							<span>
							</span>
							<span>售价：{{goodInfo.price}}</span>
							<br>
							<span>数量：{{goodInfo.goods_num}}</span>
							<br>
							<span>小计：￥{{totalPrice}}</span>
							<span></span>
						</div>
					</div>
				</li>
			</ul>
		</div>

			<div class="t-line pt10 total">
				礼物地址：<b>
					<input type="text" id="url" style="width: 80%;border: hidden" readonly v-model="giftUrl">
					<!-- <div class="pt10">{{giftUrl}}</div> -->
					</b><br>

		</div>
		<!-- 0 未领取 1 已领取 -->
        <p v-if="this.orderInfo.status=='1'" 
		style="text-align: center;margin-top:10px;">
			<!-- <button style="border-radius: 6px" 
			:data-clipboard-text="giftUrl"
			class="icon-copy">发送给朋友</button>			 -->
			<button style="border-radius: 6px" 
			@click="shareGift">发送给朋友</button>
		</p>
	</div>
</div>
</template>

<script>
import settings from '@/settings'
import $plus from '@/common/plus'
import wx from 'weixin-js-sdk'
// import Clipboard from 'clipboard';
import {number_format} from '@/common/common'
export default {
  components:{
		orderDetails:{}
  },
  props:["id"],
  	data(){
		return {
		settings,
		data:{},
		number_format,
		orderInfo:{},
		goodInfo:{},
		invoiceInfo:{},
		status:'未领取',
		giftUrl:''
		}
	},
	created(){

    	this.getData()
	},
	mounted() {
		// const clipboard = new Clipboard('.icon-copy');
		// clipboard.on('success', e => {
		// this.$message.success( '复制成功,快去送给朋友吧！');
		// });
		

		$plus.plusReady(()=>{
		})
	},
  	computed:{
		totalPrice(){
			return (this.goodInfo.price * this.goodInfo.goods_num).toFixed(2);
		}
  	},
  	methods:{
	getData(){
		let successCallback = data=>{
			console.log(data)
			this.giftUrl = data.url;
			this.orderInfo = data.order;
			this.data = data;
			this.goodInfo = data.goods[0];
			this.invoiceInfo = data.invoice;
			if(this.orderInfo.status != '0')this.status = '已领取';
		}
		let params = {id:this.id}
		this.$store.dispatch({type:'getGiftOrderDetail',params,successCallback})
	},
	shareGift(){//发送给朋友
		// //微信分享菜单测试
		// 	title:'您的好友给您送礼物啦!', // 分享标题
		// 	desc: '您的好友赠送了您'+this.goodInfo.name+',点击查看详情!', // 分享描述
		// 	link: this.giftUrl, // 分享链接
		// 	imgUrl: this.data.goods_img, // 分享图标
		var options = {
						type:"web",
						title:"您的好友给您送礼物啦!",
						content:'您的好友赠送了您'+this.goodInfo.name+',点击查看详情!',
						thumbs:this.data.goods_img,
						href:this.giftUrl,
						extra:{scene:'WXSceneSession'}
					};
		console.log(options)
		this.shareAction(options)
		
		//shareF.init()
	},
	shareAction(options){
		var sharewx = null;
		if(window.plus){
			plus.share.getServices(function(s){
				for(var i in s){
					if('weixin'==s[i].id){
						sharewx=s[i];
					}
				}
				if(!sharewx){
					return;
				}
				if(sharewx.authenticated){
					sharewx.send(options, function(){
						alert("分享成功！");
					},function(e){
						alert("分享失败："+e.message);
					});
				}else{
					sharewx.authorize(ShareMessage, function(e){
						alert("未进行认证");
					});
				}
			}, function(e){
				alert("获取分享服务列表失败："+e.message);
			});
		}
		// var sharewx = null;
		// var shares = JSON.parse(window.localStorage.getItem('shares') || "{}");

		// for(var i in shares){
		// 	if('weixin'==shares[i].id){
		// 		sharewx=shares[i];
		// 	}
		// }
		// if(!sharewx){
		// 	return;
		// }
		// if(sharewx.authenticated){
		// 	this.shareMessage(sharewx);
		// }else{
		// 	sharewx.authorize(shareMessage, function(e){
		// 		alert("未进行认证");
		// 	});
		// }
	},
	shareMessage(s){
		alert(2222)
		s.send({content:'分享内容',href:'http://www.dcloud.io/'}, function(){
			alert("分享成功！");
		},function(e){
			alert("分享失败："+e.message);
		});
	}	
  },

}
</script>
<style lang="scss" scoped src="@/delirenWebStatic/css/common.scss">
</style>

<style scoped lang="scss">
.wodeliwudingdanxiangqing{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.page {
    background: url(./images/paper_02.png) repeat-y scroll 0 0 rgba(0, 0, 0, 0);
    margin: 0 auto 1em;
    background-size: 100% 1px;
}
.page .page-content {

    background-size: 100% 16.15em;
    bottom: -1em;
    padding-bottom: 6em;
    padding-left: 0.5em;
    padding-right: 1em;
    position: relative;
}
.order-info >.item {
    font-size: 1.4em;
    padding: 0.6em 0.5em;
    line-height: 1.8em;
    color: #666;
}
.layout-3, .layout-2 {
	position: relative;
	line-height:25px;
	height: 25px;
}
.layout-2 > div {
    line-height: 1.6em;
}
.order-info >.item .caption {
    color: #000;
    width: 6em;
    text-align: right;
}
.layout-2 > div:last-child {
    margin-left: 6em;
    height: 100%;
}
.order-info >.item .order-status-list {
    margin-left: 5.85em;
}
.page:before {
    background: url(./images/paper_01.png) no-repeat scroll 0 0 rgba(0, 0, 0, 0);
    background-size: 100% 0.75em;
    content: " ";
    display: block;
    height: 0.75em;
}
.clearfix:after {
    clear: both;
    content: "...";
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
}
.order-info >.item {
    font-size: 1.0em;
    padding: 0.6em 0.5em;
    line-height: 1.8em;
    color: #666;
}
.list-order .item .img {
    background-size: cover;
    height: 6.8em;
    margin: 0 0.5em;
    overflow: hidden;
    width: 6.8em;
}
.list-order .item .img img {
    width: 100%;
}
.list-order .item .name {
    color: #51545a;
    font-size: 1.2em;
    margin-bottom: 0.3125em;
    margin-right: 0.75em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 14.9375em;
}
a {
    color: #000;
}
.list-order .info {
    color: #87888c;
    font-size: 1.25em;
}
.pt10 {
    padding-top: 0.5em;
	margin-top:0.5em;
    margin-left: 0.75em;
}

</style>