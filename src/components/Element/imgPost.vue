<template>
    <img :src="value.img" alt="">
</template>

<script>

    export default {
        data() {
            return {}
        },
        props:['value']
    }

</script>

<style scoped lang="less">
    img {
        border-radius: 4px;
        max-width: 70%;
    }
</style>