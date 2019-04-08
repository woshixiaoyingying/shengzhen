<template>
  <div class="content">
         <div class="header" :style="fitPhoneTop">推广</div>
    <v-content></v-content>
  </div>
</template>

<script>
import VContent from '@/pages/ucenterExtension/VContent'
import {mapGetters} from 'vuex'
export default {
  components:{
    VContent
  },
  computed:{
     ...mapGetters({
      fitPhoneTop:"fitPhoneTop"
    })
  }

}
</script>

<style scoped>
.header::after{
  content: " ";
 border-bottom: 1px solid #dcdcdc;
 position: absolute;
 bottom: 0;
 width: 100%;
 left: 0;
 transform: scaleY(0.5)
}
  .content{
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    background-color: #fff;
  }
  .header{
      position: relative;
    height: 0.85rem;
    flex-shrink:0;
    box-sizing: content-box;
    background-color: #fff;
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.85rem;
    color: #221122;
}
</style>