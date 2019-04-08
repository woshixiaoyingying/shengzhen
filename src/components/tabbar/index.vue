<template>
    <div class="g-tabbar">
        <router-link to='/win_a/home' class='g-tabbar-item'>
            <i class="icon iconfont">&#xf012b;</i> 首页
        </router-link>
        <router-link to='/win_a/extension' class='g-tabbar-item'>
            <i class="icon iconfont">&#xf0298;</i> 推广
        </router-link>
        <router-link to='/win_a/shopcart' class='g-tabbar-item'>
            <i class="icon iconfont">&#xe6e6;</i> 购物车
        </router-link>
        <router-link to='/win_a/mine' class='g-tabbar-item'>
            <i class="icon iconfont">&#xe635;</i> 个人中心
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'CTabbar'
    }
</script>

<style scoped lang='scss'>
    .g-tabbar {
        display: flex;
        width: 100%;
        height: 110px;
        background-color: #fff;
        &-item {
            flex: 1;
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .iconfont {
                margin-bottom: 4px;
                font-size: 0.5rem;
            }
        }
    }
    
    .router-link-active {
        color: #ff3535;
    }
</style>