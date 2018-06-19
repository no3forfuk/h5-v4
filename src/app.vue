<template>
    <div class="app">
        <router-view class="router-view"></router-view>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        computed: {}
    }

</script>

<style scoped lang="less">

    .app {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .router-view {
        width: 100%;
        height: 100%;
    }

    .home-usercenter-enter-active {
        animation: slideInLeft 0.4s;
        position: absolute;
    }

    .home-usercenter-leave-active, .base-leave-active {
        animation: slideOutLeft 0.4s;
        position: absolute;
    }

    .usercenter-home-enter-active, .base-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    .usercenter-home-leave-active {
        animation: slideOutRight 0.4s;
        position: absolute;
    }

    .home-element-enter-active {
        animation: scaleToCenter 0.5s;
        position: absolute;
    }

    .home-element-leave-active {
        animation: slideOutLeft 0.4s;
        position: absolute;
    }
</style>