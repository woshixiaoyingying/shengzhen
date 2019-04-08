<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item, index) in navInfo" :key="index">
        <router-link :to="{path:'//article/detail', query:{id:item.id}}" class="nav-link">
          <img :src="item.cacheImg" class="nav-pic">
          <span class="nav-text">{{item.title}}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'HomeNav',
    props:["navInfo"],
    created(){
      console.log('123',this.navInfo)
    },
    data() {
      return {
      
      }
    }

  }
</script>

<style scoped lang="scss">
  .nav {
    width: 100%;
    padding: 20px 0 15px;
    background-color: #fff;
    &-list {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px;
    }
    &-item {
      width: 25%;
      margin-bottom: 10px;
    }
    &-link {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    &-pic {
      width: 30%;
      margin-bottom: 8px;
    }
    &-text{
      font-size: 12px;
    }
  }
</style>