<template>
    <div class="app">

        <router-view class="router-view"></router-view>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style scoped lang="less">

    .app {
        width: 100%;
    }

    .router-view {
        width: 100%;
        position: absolute;
    }
</style>