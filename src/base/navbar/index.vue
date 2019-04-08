<template>
    <div class="mine-navbar">
      <div class="mine-navbar-left" v-if="$slots.left">
        <slot name="left"></slot>
      </div>

      <div class="mine-navbar-right" v-if="$slots.right">
        <slot name="right"></slot>
      </div>
      <h1 class="mine-navbar-title" v-if="title">
        <span class="mine-navbar-text" v-text="title"></span>
      </h1>
    </div>
</template>
<script>
  export default {
    name: 'MeNavbar',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="scss" scoped>


  .mine-navbar {
    position: relative;
    display: flex;
  justify-content: space-between;
  align-items: center;;
    height: 50px;
    background-color: #fff;

    &-left {
      margin-left: 10px;

      ~ .mine-navbar-right {
        position: static;
      }
    }

    &-center {
      flex: 1;
      margin: 0 10px;

      ~ .mine-navbar-right {
        position: static;
      }
    }

    &-right {
      position: absolute;
      right: 0;
       display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
      height: 100%;
      margin-right: 10px;
    }

    &-title {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20%;
      right: 20%;
       display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
      text-align: center;
    }
    &-text {
      width: 100%;
      font-size: 18px;
      text-align: center;
      line-height: 1.5;
     overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
    }
  }

</style>
