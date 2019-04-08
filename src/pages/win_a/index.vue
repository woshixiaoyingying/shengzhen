<template>
  <div id="app" class="g-container">
    <div class="g-view-container" :style="{paddingBottom:paddingBottom+'px',height:height+'px'}">
      <router-view></router-view>
    </div>
    <div class="g-footer-container">
      <c-tabbar ref="footer"></c-tabbar>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CTabbar from "./footer.vue";
export default {
  name: "App",
  components: {
    CTabbar
  },
  data() {
    return {
      paddingBottom: "",
      height: ""
    };
  },
  computed: {
    ...mapGetters({
      fitPhoneBottom: "fitPhoneBottom"
    })
  },
  mounted() {
    this.height =document.body.offsetHeight;
    if (this.fitPhoneBottom) {
      let fitb = this.fitPhoneBottom.paddingBottom;
      let arr = fitb.split("p");
      let arrNum = Number(arr[0]);
      this.paddingBottom = 55 + arrNum;
    }else{
      this.paddingBottom = 55;
    }
  }
};
</script>

<style >
.g-view-container {
  overflow-y: auto;
  background-color: #f4f4f4;
  height: 100%;
}
.g-footer-container {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  -webkit-box-shadow: 0 0 5px 0 #d6d6d6b0;
  box-shadow: 0 0 5px 0 #d6d6d6b0;
  padding: 10px 0;
  background-color: #fff;
}
</style>
