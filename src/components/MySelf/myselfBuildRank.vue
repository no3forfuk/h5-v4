<template>
    <div>

    </div>
</template>

<script>


    export default {
        data() {
            return {}
        },
        created() {
            this.$count(['UserCenter_To_BuildRank', 1])
        },
        components: {}
    }

</script>

<style scoped lang="less">
    .build-rank {
        width: 100%;
    }
</style>