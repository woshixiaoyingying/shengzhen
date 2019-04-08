<template>
    <div class="notice-news">
        <div class="img">
            <img class="lazy" alt="" src="static/images/laba.png"></div>
        <p class="notic-text">{{cate_name}}</p>
        <router-link :to="{path:'//article/list',query:{category_id:notice_category_id}}" class="notice-more">
            <img class="lazy" alt="" src="static/images/more.png">
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'HomeNotice',
        props:["cate_name","notice_category_id"],
        mounted(){
            
        }
    }
</script>

<style scoped lang="scss">
    .notice-news {
        padding: .3rem;
        font-size: 12px;
        position:relative;
        color: #7f8699;
        background-color: #fff;
        display: flex;
        align-items: center;
        height: 0.8rem;
    }
    
    .notice-news:before {
        content: ' ';
        position: absolute;
        pointer-events: none;
        box-sizing: border-box;
        left: 25px;
        right:25px;
        top: 0;
        border-bottom: 1px solid #ebedf0;
    }
    
    .notice-news .img img {
        width: .6rem;
        display: inline-block;
        padding-right: 10px;
    }
    .notice-news a {
        display:block;
        position: absolute;
        right: 0;
        bottom: 30%;
        img {
            width: 50%;
        }
    }   
    .notic-text {
        font-size:12px;
        flex: 2;
    }
</style>