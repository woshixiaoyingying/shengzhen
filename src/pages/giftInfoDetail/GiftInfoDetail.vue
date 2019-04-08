<template>
  <div class="libaoshangpinxiangqing">
    <div class="ma20 bg-white">
      <div class="tab">
        <ul class="tab-head">
          <li @click="showDetail" :class="this.tabClassInfo">商品详情</li>
          <li @click="showProtect" :class="this.tabClassPro">售后服务</li>
        </ul>
        <div class="tab-body description">
            <div v-if="this.current" class="p20">
              <div class="">
                <ul class="attr-list ">
                    <li>商品名称：{{name}}</li>
                    <li>商品编号：{{no}}</li>
                    <li>商品重量：{{weight}}g</li>
                    <li>上架时间：{{create_time}}</li>
                </ul>
              </div>
              <div>
                <div style="text-align:center;">
                  <br />
                </div>				
              </div>
            </div>
            <!--S 售后保障-->
            <div v-if="!this.current" class="clearfix p20">
              <div>
                {{sale_protection}}
              </div>
            </div>
            <!--E 售后保障-->
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import settings from '@/settings'
export default {
  components:{
  },
  props:['name','no','weight','create_time','sale_protection'],
  data () {
    return {
      settings,
      current:true,
      tabClassInfo:'current',
      tabClassPro:'',
      info:{},
      protect:{}
    }
  },
  created(){
    console.log('detail created')
    console.log(this.sale_protection)
    console.log(this.name)
    console.log(this.no)
    console.log(this.weight)
    console.log(this.create_time)
  },
  watch:{
  }, 
  computed:{
    ...mapGetters({
      fitPhoneTop:"fitPhoneTop",
      fitPhoneBottom:"fitPhoneBottom"
    })

  },

  methods:{
    showDetail(){
      this.current = true;
      this.tabClassInfo = 'current';
      this.tabClassPro = '';
    },
    showProtect(){
      this.current = false;
      this.tabClassInfo = '';
      this.tabClassPro = 'current';
    }
  }
}
</script>



<style lang="scss" scoped>

.libaoshangpinxiangqing{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:column;
  justify-content:space-between;
  background-color: #fff;
}
.bottom{
  flex-shrink: 0;
}
.tab{position: relative;}
.tab .tab-head {
    background: none repeat scroll 0 0 #e4e4ec;
    height: 3.6em;
    position: relative;
}
.tab .tab-head li.current {
    background: #fff;
}
.tab .tab-head li {
    cursor: pointer;
    display: block;
    width: 50%;
    line-height: 3em;
    height: 3em;
    padding: 0;
    text-align: center;
    float: left;
    overflow: hidden;
    font-size: 1.2em;
    /* padding: 0 5px; */
}
.description {
    line-height: 1.6em;
    font-size: 1.0em;
}
.p20 {
    padding: 1em;
}
li, img, label, input {
    vertical-align: middle;
}
</style>

