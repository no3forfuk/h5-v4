<template>
    <p>{{value.post_content}}</p>
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
    }
</style>