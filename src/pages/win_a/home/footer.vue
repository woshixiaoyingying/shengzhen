<template>
  <div class="home-footer">
    <div class="heath-all-moth">
      <div class="tcon">
        <img class="lazy" alt src="../../../../static/images/pro-title04.png">
      </div>
      <div class="heath-all">
        <div class="health-center">
          <div class="mcon">
            <router-link :to="{path:'//article/list',query:{category_id:footer_category_id}}" class="health-top" >
            <h3>你真的会养生吗</h3>
              <p>让专家告诉你如何正确的养生</p>
              <span>
                <img class="lazy" alt src="../../../../static/images/more1.png">
              </span>
            </router-link>
          </div>
        </div>
        <div class="health-product">
          <ul>
            <li v-for="(item,index) in healthInfo" :key="index">
              <router-link :to="{path:'//article/detail', query:{id:item.id}}" >
                <div class="pic">
                  <img class="lazy" :src="item.cacheImg">
                </div>
                <div class="intro">
                  <h4>{{item.title}}</h4>
                </div>
                <div class="info">
                  <span>{{item.time}}</span>
                </div>
              </router-link>
              <b>457859已看</b>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import settings from "@/settings";
export default {
  name: "HomeFooter",
  props: ["healthInfo","footer_category_id"],
  created() {
    console.log(this.healthInfo);
  },
      data() {
    return {
      settings,
    };
  },
};
</script>

<style scoped>
.home-footer {
  background-color: #fff;
  padding-bottom: 30px;
}

.heath-all-moth {
  padding: 0 20px;
}

.heath-all-moth .tcon {
  padding: 20px 0;
}

.heath-all-moth .tcon img {
  display: block;
  margin: 0 auto;
  width: 46%;
}

.health-top {
  display: block;
  padding: 15px 10px 40px;
  position: relative;
  background: -webkit-linear-gradient(
    left,
    #7c459d,
    #8a4696,
    #aa4784,
    #c14978,
    #d14970,
    #df4a68,
    #f44b5d,
    #fc4b59
  );
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #7c459d,
    #8a4696,
    #aa4784,
    #c14978,
    #d14970,
    #df4a68,
    #f44b5d,
    #fc4b59
  );
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #7c459d,
    #8a4696,
    #aa4784,
    #c14978,
    #d14970,
    #df4a68,
    #f44b5d,
    #fc4b59
  );
  /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to right,
    #7c459d,
    #8a4696,
    #aa4784,
    #c14978,
    #d14970,
    #df4a68,
    #f44b5d,
    #fc4b59
  );
  /* 标准的语法 */
  border-radius: 8px 8px 0 0px;
}

.tcon {
  padding: 20px 0;
}

.tcon img {
  display: block;
  margin: 0 auto;
  width: 45%;
}

.health-top h3 {
  font-size: 14pt;
  color: #fff;
  font-weight: 800;
  margin-bottom: 10px;
}

.health-top p {
  font-size: 11pt;
  color: #fff;
}

.health-top span {
  position: absolute;
  right: 15px;
  top: 30%;
}

.health-top span img {
  width: 60%;
  display: block;
}

.heath-all-moth .tcon {
  padding: 20px 0;
}

.heath-all-moth .tcon img {
  display: block;
  margin: 0 auto;
  width: 46%;
}

.health-product {
  width: 96%;
  margin: -25px auto 0;
  background: #fff;
  border-radius: 8px;
  z-index: 1;
  position: relative;
}

.health-product ul:after {
  content: "";
  display: table;
  clear: both;
}

.health-product ul li {
  width: 50%;
  float: left;
  position: relative;
}

.health-product ul li a {
  padding: 10px;
  display: block;
  border-right: 1px #d6d7dc solid;
  position: relative;
}

.health-product ul li:nth-child(2) a {
  border: none;
}

.health-product ul li .pic img {
  width: 100%;
  height: auto;
}

.health-product ul li .intro h4 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin: 10px 0 5px;
  color: #1b1b1b;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  word-wrap: break-word;
}

.health-product ul li .intro p {
  margin: 0;
  height: 40px;
  font-size: 10px;
  font-weight: normal;
  margin-bottom: 5px;
  line-height: 20px;
  color: #9e9e9e;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  word-wrap: break-word;
}

.health-product ul li .info {
  position: absolute;
  top: 0;
  left: 10px;
  width: 40px;
  background: url(../../../../static/images/date-bg.png) no-repeat 0 center;
  background-size: 100% 100%;
  padding: 5px 5px;
  height: 40px;
  text-align: center;
  color: #fff;
}
.info span {
  font-size: 8px;
  transform: scale(0.5);
}
.health-product ul li b {
  position: absolute;
  right: 5px;
  bottom: 3px;
  color: #ddd;
  font-weight: normal;
  font-size: 10px;
  display: none;
}

.heath-all {
  padding: 0 0px 10px;
  background: #f4f4f4;
  border-radius: 0 0 8px 8px;
}

</style>