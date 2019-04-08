<template>
  <div class="artlist content">
   
    <div class="art_title_box" v-for="(item,index) in artInfo">
    <router-link :to="{path:'//article/detail',query:{id:item.id}}">
      <span class="dian"></span><h3 class="art_title">{{item.title}}</h3>
    </router-link>
    </div>

  </div>
</template>
<style scoped src="@/huizhongtangWebStatic/css/base.css"></style>
<script>
export default {
  name: "ArtList",
  props: ["artInfo"],
  created() {
  }
};
</script>

<style scoped>
.artlist {
   -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  overflow-y: auto;
}
.art_title_box {
  padding:10px 20px;
  position: relative;

  color: #000;
}
.art_title_box a{
    display: flex;
  align-items: center;
}
.art_title_box::after{
  content: "";
  border-bottom:1px solid #dcdfe6;
  position: absolute;
  bottom: 0;
  width: calc(100% - 40px);
}
.art_title {
  color: #000;
  font-size: 14px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal !important;
  word-wrap: break-word;
  /* font-weight: 400; */
  /* text-decoration:underline */
}
.dian{
  width: 3px;
  height: 3px;
  background-color: #000;
  border-radius: 100%;
  display: inline-block;
  margin-right: 10px;
}
</style>