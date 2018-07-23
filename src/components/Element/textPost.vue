<template>
    <p v-html="value.post_content" @click="$emit('click')"></p>
</template>

<script>

    export default {
        data() {
            return {}
        },
        created() {

        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    p {
        width: 100%;
        max-height: 94px;
        overflow: hidden;
        text-align: left;
    }
</style>