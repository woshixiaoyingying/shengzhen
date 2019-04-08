<template>
  <div class="tuiguangzhongxin">

    <div class="content">
      <v-content></v-content>
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import VContent from './VContent'
export default {
  data () {
    return {
      
    }
  },
  components:{
    VContent
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
.tuiguangzhongxin{
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
  display: flex;
  flex-direction: column;
}
.bottom{
  flex-shrink: 0;
}
</style>
