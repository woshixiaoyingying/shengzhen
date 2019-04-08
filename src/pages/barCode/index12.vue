<template>
  <div class="barCode" :style="fitPhoneTop">
    <van-nav-bar title="扫一扫" @click-left="$router.go(-1)" left-arrow/>
    <div class="scan">
      <div id="bcid">
        <div style="height:40%"></div>
        <p class="tip">...载入中...</p>
      </div>
      <footer>
        <router-link to="/win_a/home" class="cancel">取消</router-link>
      </footer>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
let scan = null;
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      codeUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      fitPhoneTop: "fitPhoneTop",
      fitPhoneBottom: "fitPhoneBottom"
    })
  },
  created() {
    this.startRecognize();
  },
  methods: {
    //创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode("bcid");
      scan.onmarked = onmarked;
      setTimeout(function() {
        that.startScan();
      }, 100);
      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }

        result = result.replace(/\n/g, "");
        that.codeUrl = result;
        alert(result);

        that.closeScan();
      }
    },
    //开始扫描
    startScan() {
      if (!window.plus) return;
      console.log("开始扫描");
      scan.start();
    },
    //关闭扫描
    cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },
    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
    }
  }
};
</script>
<style lang="less" scoped>
.barCode {
  height: 100%;
}
.scan {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #000000a8;
  #bcid {
    width: 100%;
    //   position: absolute;
    //   left: 0;
    //   right: 0;
    //   top: 0;
    //   bottom:10%;
    height: calc(100% - 60px);
    text-align: center;
    color: #fff;

    flex-grow: 2;
  }
  footer {
    width: 100%;
    height: 80px;
    text-align: center;
  }
  .cancel {
    color: #fff;
  }
}
</style>
