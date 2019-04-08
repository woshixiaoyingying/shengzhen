<template>
  <div class="product-discription">
    <div >
      <ul class="tab-head">
        <li :class="type==1?'current':''" @click="type=1" style="width: 50%;">
          <p class="xiangqing">
            商品详情
          </p>
          <div class="tiao"></div>
        </li>
        <li :class="type==2?'current':''" @click="type=2" style="width: 50%;">
          <p>
            售后服务
          </p>
          <div class="tiao"></div>
        </li>
      </ul>
    </div>
  
    <div v-if="type==1">
      <div>
        <ul class="attr-list">
          <li>
            商品名称：
            <span>{{discriptionData.name}}</span>
          </li>
          <li>
            商品编号：
            <span>{{discriptionData.pro_no}}</span>
          </li>
          <li>
            商品重量：
            <span>{{discriptionData.weight}}</span>
          </li>
          <li>
            上架时间：
            <span>{{discriptionData.create_time}}</span>
          </li>
        </ul>
      </div>
      <div class="clearfix content-html" v-html="discriptionData.content"></div>
    </div>
    <!--S 售后保障-->
    <div v-if="type==2">
      <div class="clearfix content-html" v-html="discriptionData.sale_protection"></div>
    </div>
    <!--E 售后保障-->
  </div>
</template>

<script>
export default {
  props: ["discriptionData"],
  data() {
    return {
      type: 1
    };
  }
};
</script>
<style lang="scss" scoped >
.tab-head {
  height: 1rem;
  margin: 0 auto;
  border-radius: 0.02rem;
  box-shadow: 0 0 0.5rem 0.1rem #f4f4f4;
  display: flex;
  li {
    width: 50%;
    padding-top: 0.36rem;
    p {
      height: 0.28rem;
      line-height: 0.28rem;
      font-size: 0.28rem;
      text-align: center;
    }
    p.xiangqing {
      border-right: 1px solid #f4f4f4;
    }
    .tiao {
      margin: 0 auto;
      width: 0;
      height: 0.06rem;
      background-color: #ff3535;
      border-radius: 0.3rem;
      margin-top: 0.3rem;
      transition: all 0.3s;
    }
  }
  .current {
    position: relative;
    .tiao {
      width: 0.8rem;
    }
  }
}
.attr-list {
  width: 7rem;
  border: 1px solid #ececec;
  border-radius: 0.1rem;
  margin: 0 auto;
  margin-top: 0.4rem;
  background-color: #f7f7f7;
  padding: 0.2rem;
  box-sizing: border-box;
  li {
    font-size: 0.22rem;
    color: #2e2e2e;
    line-height: 0.3rem;
    span {
      color: #5c5c5c;
    }
  }
}
</style>
<style lang="scss">
.product-discription .content-html {
  width: 100%;
  margin-top: 0.5rem;
  font-size: 0.22rem;
  img {
    max-width: 100% !important;
  }
}
</style>
