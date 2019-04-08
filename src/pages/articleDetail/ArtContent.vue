<template>
  <div class="article">
    <h3 class="art_title art">{{article.title}}</h3>
    <p class="art_content" v-html="article.content"></p>
  </div>
</template>

<script>
export default {
  name: "ArtContent",
  props: ["id"],
  data() {
    return {
      article: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      if (this.id) {
        let successCallback = data => {
          this.article = data;
        };
        let params = {
          id: this.id
        };
        this.$store.dispatch({
          type: "getArtContent",
          params,
          successCallback
        });
      }
    }
  }
};
</script>

<style scoped>
.article {
  padding: 15px 20px 30px;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  overflow-y: auto;
}
.art_title {
  text-align: center;
  font-weight: 800;
  color: #000;
  line-height: 30px;
  font-size: 20px;
}
.art_content {
  text-align: left;
  padding: 20px;
  line-height: 28px;
  font-size: 16px;
}
</style>