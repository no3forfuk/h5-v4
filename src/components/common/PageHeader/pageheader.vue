<template>
    <transition name="slide">
        <p class="rcm-page-header" v-if="value">
        <span>
            <i>{{value}}</i>
        </span>
        </p>
    </transition>
</template>

<script>

    export default {
        data() {
            return {}
        },
        props: ['value']
    }

</script>

<style scoped lang="less">


    .rcm-page-header {
        width: 100%;
        height: 40px;
        background-color: #fff;
        font-size: 30px;
        line-height: 40px;
        padding: 5px 20px;
        box-sizing: content-box;
        span {
            background: linear-gradient(to top, #FFCECE 0%, #FFCECE, 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%);
        }
    }
</style>