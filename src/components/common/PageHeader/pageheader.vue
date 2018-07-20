<template>
    <p class="rcm-page-header">
        <span>
            <i>{{value}}</i>
        </span>
    </p>
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
        background-color: #fff;
        font-size: 1.92rem;
        line-height: 1.92rem;
        padding: 0.65rem 1.3125rem;
        border-bottom: 1px solid rgba(0, 0, 0, .08);
        position: relative;
        span {
            background: linear-gradient(to top, #FFCECE 0%, #FFCECE, 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%);
        }
    }
</style>