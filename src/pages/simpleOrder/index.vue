<template>
  <div class="jiesuan" style="font-size:10px">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="结算"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
      <simple-order></simple-order>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import SimpleOrder from './SimpleOrder'
export default {
  components:{
    SimpleOrder
  },
  data() {
    return {
      simpleOrder: {}
    };
  },
  
  computed: {
    ...mapGetters({
      fitPhoneTop: "fitPhoneTop",
      fitPhoneBottom: "fitPhoneBottom"
    })
  },
  methods: {
   
  },
};
</script>


<style lang="scss" scoped>
.jiesuan {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
}
.header {
  flex-shrink: 0;
  background: #fff;
}
.content {
  flex-grow: 1;
  overflow-y: auto;
}
.bottom {
  flex-shrink: 0;
}
</style>
