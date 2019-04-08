<template>
  <div class="wodexiaoxi">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="我的消息"
        @click-left="$router.go(-1)"
        left-arrow
      />
    </div>
    <div class="content">
       <van-tabs v-model="activeTab">
        <van-tab title="未读消息">
          <message-n></message-n>
        </van-tab>
        <van-tab title="已读消息">
           <message-y></message-y>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import MessageY from './MessageY'
import MessageN from './MessageN'
export default {
  components: {
    MessageY,
    MessageN
  },
  data () {
    return {
      activeTab:0
    }
  },
  created(){
    
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),

  },
  methods:{
    
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.wodexiaoxi{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.header{
  flex-shrink: 0;
  border-bottom: 1px solid #dcdee3;
  background: #fff;
}
.content{
  flex-grow:1;
  overflow-y: auto;
}
.bottom{
  flex-shrink: 0;
}
</style>
