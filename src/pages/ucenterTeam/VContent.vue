<template>
  <div class="ucenter-team">
    <div class="table1" v-for="(item,index) in ucenterTeamList" :key="index">
      <ul class="ul1">
        <li class="li1">
          <p class="p1">用户名</p>
          <p class="p2">{{item.name}}</p>
        </li>
        <li class="li1">
          <p class="p1">姓名</p>
          <p class="p2">{{item.real_name}}</p>
        </li>
        <li class="li1">
          <p class="p1">级别</p>
          <p class="p2">{{rank[index]}}</p>
        </li>
        <li class="li2">
          <p class="p1">注册时间</p>
          <p class="p2">{{item.reg_time}}</p>
        </li>
        <li class="li3">
          <p class="p1">电话</p>
          <p class="p2">{{item.mobile}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ucenterTeamList", "grade"],
  data() {
    return {};
  },
  computed: {
    rank() {
      let jibie = []
      this.ucenterTeamList.forEach(el => {
        let str = "";
        if (el["is_wine"] == 1) {
          str = "普通会员";
          return jibie.push(str);
        } else {
          if (el["is_partner"] == 1) {
            str = "合伙人";
            return jibie.push(str);
          }
          str = "未激活";
          return jibie.push(str);
        }
      });
      return jibie;
    }
  },
  created() {
    this.bindData();
  },
  methods: {
    bindData() {
      
    }
  }
};
</script>
<style lang="scss" scoped src="@/huizhongtangWebStatic/css/common.scss">
</style>


<style lang="scss" scoped>
.ucenter-team {
  background: #f5f5f5;
  padding-top: 0.2rem;
  .table1 {
    margin-bottom: 0.2rem;
    overflow-x: auto;
    .title {
      height: 0.66rem;
      line-height: 0.55rem;
      padding-top: 0.11rem;
      box-sizing: border-box;
      background-color: #fff;
      font-size: 0.3rem;
      padding-left: 0.2rem;
      .span1 {
        font-size: 0.25rem;
      }
    }
    .ul1 {
      margin-top: 2px;
      display: flex;
      justify-content: flex-start;
      width: 11.5rem;
      .li1 {
        width: 1.76rem;
        flex-shrink: 0;
        margin-right: 1px;
      }

      .li2 {
        margin-right: 1px;
        flex-grow: 1;
      }
      .li3 {
        flex-grow: 1;
      }
      p {
        background-color: #fff;
        margin-top: 1px;
        text-align: center;
      }
      .p1 {
        height: 0.59rem;
        line-height: 0.59rem;
        font-size: 0.25rem;
      }
      .p2 {
        margin-top: 1px;
        font-size: 0.3rem;
        height: 0.78rem;
        line-height: 0.78rem;
      }
    }
  }
}
</style>
<style scoped>
table {
  font-size: inherit;
}
</style>