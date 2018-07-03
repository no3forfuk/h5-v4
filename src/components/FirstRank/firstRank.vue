<template>
    <ul class="ranklist">
        <rank-card v-for="(item,index) in list"
                   :value="item"
                   :key="index"></rank-card>
    </ul>

</template>

<script>

    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {}
    }

</script>

<style scoped lang="less">
    .ranklist {
        width: 100%;
        padding: 5px 0px;
    }

</style>