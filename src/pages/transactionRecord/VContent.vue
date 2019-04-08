<template>
  <div class="ma20 bg-white" style="font-size:10px" v-if="type==1">
  <div class=" tab" index="0">
    <div class="tab-body p20">
      <div class="list-nav" style="display: block;">
        <div class="page-list cell-2 mt20" v-for="(item,index) in transactionRecord" :key="index">
          <ul>
            <li style="width:40%;" class="gray">{{item.time}}</li>
            <li style="width:30%;" class="red">
              <span v-if="item['status']==0" class="red">处理中</span>
              <b class="green" v-else-if="item['status']==1">提现成功</b>
              <span v-else class="gray">失败</span>
            </li>
            <li style="width:30%;">
              ￥{{item['ori_amount']}} </li>
          </ul>
          <div class="p20">提现金额 <span class="red">{{item['amount']}}</span>，提现到{{item['name']}}{{item['type_name']}},账号:{{item['account']}}</div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="tab-body p20" style="font-size:10px" v-else-if="type==2">
  <div class="list-nav">
  
      <div class="page-list cell-2 mt20" v-for="(item,index) in transactionRecord" :key="index">
        <ul>
          <li class="gray">{{parseTime(item['created_at'])}}</li>
          <li class="red">￥{{item['amount']}}</li>
        </ul>
        <div class="p20">{{item['fname']}}转账给用户{{item['sname']}}</div>
      </div>
    
  
  </div>
</div>
<div class="tab-body p20" style="font-size:10px" v-else-if="type==3">
  <div class="list-nav">
      <div class="page-list cell-2 mt20" v-for="(item,index) in transactionRecord" :key="index">
        <ul>
          <li class="gray">{{parseTime(item['created_at'])}}</li>
          <li class="red">￥{{item['amount']}}</li>
        </ul>
      </div>
  </div>
</div>

</template>

<script>
import {parseTime} from '@/common/common'
export default {
  props:["transactionRecord","type"],
  data(){
    return {
      parseTime
    }
  }
}
</script>
<style lang="scss" scoped src="@/delirenWebStatic/css/common.scss"></style>
<style lang="scss" scoped src="../../delirenWebStatic/form/style.css"></style>

<style lang="scss">

</style>
