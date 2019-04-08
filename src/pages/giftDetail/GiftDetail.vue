<template>
<div class="liwudingdanxiangqing">
	<div class="gift-success">
    <div class="tcon"> <h3><i class="icon-success-48"></i>礼物已生成，快去送给朋友吧</h3></div>
    <div class="mcon">
        <div class=" mt20 bg-white mt10 table-responsive">
					<table class="list-nav simple table table-bordered table-hover toggle-circle">
						<tbody>
							<tr> 
								<td>礼物订单编号：</td>
								<td>
									<i class="icon-order-goods} ie6png"></i>
									{{orderDetails.order_no}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</td> 
							</tr>
							<tr> 
								<td>礼物名：</td><td class="red">{{orderDetails.name}}</td> 
							</tr>
							<tr> 
								<td>数量：</td><td class="red">{{orderDetails.num}}</td> 
							</tr>
							<tr> 
								<td>祝福语：</td><td class="red">{{orderDetails.wishes}}</td> 
							</tr>
							<tr> 
								<td>生成时间：</td><td id="pay_name" class="bold">{{orderDetails.time}}</td> 
							</tr>
							<tr> 
								<td>礼物地址：</td>
								<td >
									<input id="url" type="text" 
									style="border: hidden;width: 100%;font-size: x-small" 
									readonly 
									v-model="orderDetails.url">
								</td>
							</tr>

						</tbody>
					</table>
    		</div>
        <p style="text-align: center;margin-top:10px;">
			<a @click="$router.push('/win_a/home')">
				<button style="border-radius: 6px">回到首页</button>
			</a>
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<!-- <button style="border-radius: 6px" 
			:data-clipboard-text="orderInfo.url"
			class="icon-copy">点击复制</button> -->
			<button style="border-radius: 6px" @click="shareGift">送给好友</button>
		</p>
		</div>
	</div>
</div>
</template>

<script>
import settings from '@/settings'
// import Clipboard from 'clipboard';
import $plus from '@/common/plus'
import {number_format} from '@/common/common'
export default {
  components:{
		
  },
  props:["orderInfo"],
  data(){
    return {
	   settings,
	   number_format,
	   orderDetails:{}
    }
	},
	created(){
		this.orderDetails = this.orderInfo;
	},
	mounted() {

	},
  computed:{
  },
  methods:{
	shareGift(){//发送给朋友
		//发送信息
		var options = {
						type:"web",
						title:'您的好友'+this.orderDetails.user_name+'给您送礼物啦!',
						content:'您的好友赠送了您'+this.orderDetails.name+',点击查看详情!',
						thumbs:[this.orderDetails.goods_img],
						href:this.orderDetails.url,
						extra:{scene:'WXSceneSession'}
					};
		this.shareAction(options)
		console.log('发送给朋友',options)
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
	}
  }

}
</script>
<style lang="scss" scoped src="@/delirenWebStatic/css/common.scss">
</style>

<style scoped lang="scss">
.liwudingdanxiangqing{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.gift-success {
    padding: 1rem 10px;
}
.gift-success .tcon {
    font-size: 10pt;
}
.h3, h3 {
    font-size: 24px;
}
.icon-success-48, .icon-error-48, .icon {
    background-image: url(./images/right.gif);
    background-repeat: no-repeat;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    width: 50px;
    height: 50px;
    background-size: contain;
}
.table-responsive {
    min-height: .01%;
    overflow-x: auto;
}
tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
}
tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}
td {
	font: size 14px;
}
p {
    margin: 0 0 10px;
}
a {
    color: #337ab7;
    text-decoration: none;
}
button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}
table{font-size: 12pt;}
table.default, table.simple {

		width:100%;

		border:1px solid #e4e4e4

}

table.default th, table.simple th {

		text-align:center;

		font-weight:bold

}

table.default td, table.default th, table.simple td, table.simple th {

		padding:2px

}

table.default td.numeric, table.default th.numeric, table.simple td.numeric, table.simple th.numeric {

		text-align:right

}

table.default th, table.default td, table.simple th, table.simple td {

		border-right:1px solid #e4e4e4;

		border-bottom:1px solid #e4e4e4;

		border-left-width:0;

		border-top-width:0

}

table.default th:last-child, table.default td:last-child, table.simple th:last-child, table.simple td:last-child {

		border-right-width:0

}

table.default th.last, table.default td.last, table.simple th.last, table.simple td.last {

		border-right-width:0

}

table.default tbody tr:last-child th, table.default tbody tr:last-child td, table.default tfoot tr:last-child th, table.default tfoot tr:last-child td, table.simple tbody tr:last-child th, table.simple tbody tr:last-child td, table.simple tfoot tr:last-child th, table.simple tfoot tr:last-child td {

		border-bottom-width:0

}

table.default tbody tr.last th, table.default tbody tr.last td, table.default tfoot tr.last th, table.default tfoot tr.last td, table.simple tbody tr.last th, table.simple tbody tr.last td, table.simple tfoot tr.last th, table.simple tfoot tr.last td {

		border-bottom-width:0

}

table.default thead th, table.simple thead th {

		border-bottom:1px solid #e4e4e4

}

table.default tfoot th, table.default tfoot td, table.simple tfoot th, table.simple tfoot td {

		border-top:1px solid #e4e4e4

}

table.default th:first-child, table.simple th:first-child {

		border-right:1px solid #e4e4e4

}

table.default td, table.default th, table.simple td, table.simple th {

		padding:10px

}

table.simple th {

		background-color:#fff

}

table.simple th.even, table.simple th:nth-child(2n) {

		background-color:#f5f5f5

}

table.simple tr.odd td, table.simple tr:nth-child(2n+1) td {

		background-color:#f1f1f1

}

table.simple tr.odd td.even, table.simple tr.odd td:nth-child(2n), table.simple tr:nth-child(2n+1) td.even, table.simple tr:nth-child(2n+1) td:nth-child(2n) {

		background-color:#e7e7e7

}

table.simple tr.even td {

		background-color:#fafafa

}

table.simple tr.even td.even, table.simple tr.even td:nth-child(2n) {

		background-color:#f0f0f0

}

table.simple tfoot th, table.simple tfoot td {

		background-color:#fff

}

table.simple tfoot th.even, table.simple tfoot th:nth-child(2n), table.simple tfoot td.even, table.simple tfoot td:nth-child(2n) {

		background-color:#f5f5f5

}

table.default td {

		border-right:none

}

table.form {

		margin-top:20px

}

table.form td {

		padding:6px

}

table.form td.label {

		text-align:right;

		width:120px;

		font-weight:800

}

table.form input[type="text"], table.form table select {

		border:1px solid #afafaf;

		padding:0 3px;

		height:24px;

		line-height:24px;

		vertical-align:middle;

		zoom:1

}

table.form input[type="text"], table.form select, table.form input[type="password"] {

		border:1px solid #afafaf;

		padding:3px;

		width:200px;

		height:24px;

		line-height:18px;

		vertical-align:middle

}

table.form select {

		width:auto;

		height:28px;

		line-height:28px

}

table.form textarea {

		display:block;

		width:420px;

		height:48px;

		margin:0;

		border:1px solid #afafaf;

		padding:3px;

		font-size:12px

}
</style>