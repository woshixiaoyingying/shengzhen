<template>
  <form>
    <div class="order-info">
      <div class="clearfix bg-white address address-box" v-if="!is_selfpick">
        <van-address-list v-model="chosenAddressId" :list="list" @select="select"/>
        <!-- <h2>
          <b class="fl">选择收货地址：</b>
          <a class="fr" @click="$router.push('//ucenter/address')" target="_blank">管理地址</a>
        </h2>
        <ul class="address-list clearfix">
          <li
            :class="address_id==value.id ? 'selected' : ''"
            v-for="(value,key) in address"
            :key="key"
          >
            <div class="address-info">
              <label>
                <input
                  class="radio"
                  type="radio"
                  v-model="address_id"
                  :value="value.id"
                  :checked="address_id==value.id"
                >
                {{parse_area[value.province]}} {{parse_area[value.city]}} {{parse_area[value.county]}} {{value.addr}} （{{value.accept_name}} 收）{{value.phone}}
              </label>
            </div>
          </li>
        </ul>-->
      </div>
      <h3 class="htitle">支付方式：</h3>
      <div class="mt20 p20 bg-white">
        <ul class="payment-list">
          <div>
            <van-radio-group v-model="payment_id" @change="changeFu">
              <li
                v-for="(item,index) in payment_list"
                :key="index"
              >
                <van-radio :name="item.id">
                  <!-- <label style="display:block;">
                    <input
                      class="radio"
                      v-model="payment_id"
                      type="radio"
                      name="payment_id"
                      :value="item.id"
                      :checked="payment_id==item.id"
                    >
                   
                  </label> -->
                   <b>{{item.pay_name}}</b>
                </van-radio>
              </li>
            </van-radio-group>
          </div>
        </ul>
      </div>

      <div class="bg-white clearfix shangpin">
        <div
          @click="$router.push(`///product/${item.goods_id}`)"
          v-for="(item,key) in cart"
          :key="key"
        >
          <van-card
            :num="item.num"
            :price="item.real_price"
            :title="item.name"
            :thumb="`${settings.imgBaseUrl}${item.img}`"
          />
        </div>
        <van-cell-group>
          <van-field
            v-model="user_remark"
            label="留言"
            type="textarea"
            placeholder="请输入留言"
            rows="1"
            autosize
          />
        </van-cell-group>
      </div>
      <div class="mt20 p20 bg-white" id="voucher-n" style="display: none">
        <p class="clearfix">
          提示：一个订单最多能使用一张代金券（
          <b class="red">注：代金券仅能抵扣商品金额,多出商品的部分忽略不计</b>）。
          <a id="voucher-cancel" class="fr btn btn-mini">取消优惠券</a>
        </p>
        <table class="voucher-list mt10">
          <tbody>
            <tr style="background: #fff5cc;color: #000;height:20px;">
              <td>名称</td>
              <td>编号</td>
              <td>有效期</td>
            </tr>
          </tbody>
          <tbody class="page-content"></tbody>
        </table>
      </div>
      <h3 class="htitle">汇总清单：</h3>
      <div class="p20 bg-white">
        <table>
          <tbody>
            <tr>
              <td class="tr" width="200px;">购物车商品合计：</td>
              <td width="140">
                <div class="mb10 mt10" style=" background: #fafafa;">
                  <span class="fr">
                    <span style>
                      <span class="currency-symbol f18">￥</span>
                      <b class="cart-total red f18" id="total-amount">{{number_format(total)}}</b>
                    </span>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td class="tr">税：</td>
              <td>
                <p class="fr">
                  +
                  <b>{{tax}}</b>
                </p>
              </td>
            </tr>
            <tr>
              <td class="tr">运费：</td>
              <td>
                <p class="fr">
                  +
                  <b id="fare">{{fee}}</b>
                </p>
              </td>
            </tr>
            <tr>
              <td class="tr orange">送金豆：</td>
              <td>
                <p class="fr orange">
                  <b>{{point}}</b>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mb10 p15 mt10 clearfix" style="background:#f3f3f3;">
        <span class="fr">
          应付总额：
          <span style="font-size: 1.5em;font-family: tahoma">
            <span class="currency-symbol">￥</span>
            <b class="cart-total red">{{number_format(currency_symbol)}}</b>
          </span>
        </span>
      </div>

      <input type="hidden" name="wqshop_token_order" value="wlehbx1nvxq7kyo4fqiqu5higgmmfnlb">
    </div>
    <div class="ma20">
      <input @click="submitOrder" type="button" class="btn" value="提交订单">
    </div>
  </form>
</template>

<script>
import settings from "@/settings";
import { number_format } from "@/common/common";
export default {
  data() {
    return {
      settings,
      number_format,
      address: {},
      parse_area: {},
      address_id: "",
      payment_list: [
        { id: "1", pay_name: "预存款支付" },
        { id: "3", pay_name: "微信支付" },
        { id: "2", pay_name: "支付宝支付" }
      ],
      payment_id: "1",
      cart: {},
      user_remark: "",
      tax: 0, // 税
      is_selfpick: false, //是否到店自提
      store_list: [], //自提店铺列表
      store_id: "0", //选择的自提店铺
      total: 0, //购物车商品合计
      fee: 0, //运费
      point: 0, //送积分
      xuandizhi: {},
      list: [],
      chosenAddressId: ""
    };
  },
  watch: {
    is_selfpick() {
      this.store_id = "0";
    }
  },
  computed: {
    // 应付总额
    currency_symbol() {
      return Number(this.total) + Number(this.tax) + Number(this.fee);
    }
  },
  created() {
    
    this.getData();
  },
  methods: {
    //获取运费和商品总价
    getFreight(cart) {
      let total = 0;
      let weight = 0;
      let point = 0;
      for (let key in cart) {
        total += Number(cart[key].amount);
        weight += cart[key].weight * cart[key].num;
        point += Number(this.cart[key].point);
      }
      this.point = point; //积分
      this.total = total;
      let successCallback = data => {
        this.fee = data.fee;
      };
      let params = { total, weight };
      this.$store.dispatch({ type: "getFreight", successCallback, params });
    },
    getData() {
      let successCallback = data => {
        let { address, parse_area, payment_list, cart, tax, store_list } = data;
        this.address = address;
        this.parse_area = parse_area;
        //this.payment_list = payment_list
        this.cart = cart;
        this.tax = tax;
        this.store_list = store_list;
        console.log(data);
        for (let key in address) {
          let obj = {};
          obj.id = address[key].id;
          obj.name = address[key].accept_name;
          obj.tel = address[key].mobile;
          let add =
            address[key].province +
            address[key].city +
            address[key].county +
            address[key].addr;
          obj.address = add;
          this.list.push(obj);
          if (address[key].is_default == "1") {
            this.chosenAddressId = address[key].id;
            this.address_id = this.chosenAddressId;
          }
        }
        //this.payment_id = payment_list[0].id
        console.log(this.list);
        this.getFreight(cart);
      };
      this.$store.dispatch({ type: "getSimpleOrderData", successCallback });
    },
    //提交订单
    submitOrder() {
      let { address_id, payment_id, user_remark, is_selfpick, store_id } = this;

      if (is_selfpick && store_id == 0) {
        this.$message.error("请选择自提地址");
        return;
      }

      let params = {
        address_id,
        payment_id,
        user_remark,
        is_selfpick: is_selfpick ? 1 : 0,
        store_id
      };

      let successCallback = data => {
        this.$router.push(`/simple/order_status/${data.order_id}`);
      };
      this.$store.dispatch({
        type: "simpleOrderAact",
        params,
        successCallback
      });
    },
    //选择的支付方式发生改变了
    changeFu(name){
      this.payment_id = name;
    },
    select(item){
      this.address_id = item.id;
    }
  }
};
</script>
<style lang="scss" scoped>
.order-info .van-address-list {
  padding-bottom: 0px;
}
.van-address-list .van-button {
  display: none;
}
.van-address-list .van-icon {
  display: none;
}
.htitle {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  background-color: #fafafa;
}
.shangpin{
  padding: 0 20px;
}
</style>
<style lang="scss" scoped src="@/huizhongtangWebStatic/css/common.scss"></style>
<style lang="scss" scoped src="@/huizhongtangWebStatic/css/simple.css"></style>

