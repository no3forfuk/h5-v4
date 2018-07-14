<template>
    <i v-html="value" @click="$emit('click','')"></i>
</template>

<script>

    export default {
        data() {
            return {}
        },
        methods: {},
        props: ['value']
    }

</script>

<style scoped lang="less">
    i {
        font-family: iconfont;
    }
</style>