<template>
  <div class="saoyisao">
    <div class="header" :style="fitPhoneTop">
      <van-nav-bar
        title="扫一扫"
        @click-left="backClick"
        left-arrow
      />
    </div>
    <div id="saoyisao_page" class="content">
    </div>
    <div class="bottom" :style="fitPhoneBottom">

    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import { setTimeout } from 'timers';

export default {
  data(){
    return {
      scan:null,
      embed:null
    }
  },
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      safeAreaTop:"safeAreaTop",
      fitPhoneBottom:"fitPhoneBottom"
    }),
   
  },
  methods:{
    backClick(){
      this.$router.go(-1)
    },
    // 创建扫描控件并且开始扫描
    startRecognize() {
      let filter = [plus.barcode.QR]
    	this.scan = new plus.barcode.Barcode('saoyisao_page',filter);
    	this.scan.onmarked = this.onmarked
      this.scan.onerror=this.onerror
      this.scan.start()
      setTimeout(this.createChildView,1)
    },
    //创建子view显示提示文字
    createChildView(){
      let top = window.innerHeight - this.safeAreaTop - 46
          top = top/2 + 205 + 'px'
      this.embed=plus.webview.create('./qrcodePrompt/index.html', 'embed',{top,height:'20px',background:'transparent'});
	    plus.webview.currentWebview().append(this.embed)
    },
    // 条码扫描成功事件
    onmarked( type, result ) {
      // if(getUrlVariable({url:result,variable:'use_for'}) == 'reg'){
      //   let rec_uid = getUrlVariable({url:result,variable:'rec_uid'})||''
      //   let clinic_id = getUrlVariable({url:result,variable:'clinic_id'})||''
      //   this.$router.replace({path:`/user/reg`,query:{rec_uid,clinic_id}})
      // }else{
      //   plus.nativeUI.alert( "二维码格式错误", ()=>{
      //     this.scan.start();
      //   }, "提示", "重新扫描" );
      // }

    },
    //条码扫面错误事件
    onerror(error){
      console.log(JSON.parse(error))
    }
  },
  mounted() {
    if(window.plus){
      setTimeout(this.startRecognize,200)
    }
   
    
    
  },
  destroyed(){
    if(this.scan){
      this.scan.cancel()
      this.scan.close()
    }
    if(this.embed){
      plus.webview.close( this.embed)
    }
  },
}
</script>
<style lang="scss" scoped>
.saoyisao{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #eeeeee;
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




