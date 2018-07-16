<template>

    <div class="myself">
        <banner></banner>
        <tabs></tabs>
    </div>

</template>

<script>
    import banner from './banner'
    import tabs from './tabs'

    export default {
        data() {
            return {}
        },
        beforeRouteLeave(to, from, next) {
            next()
        },
        methods: {
            goPrve() {
                this.$router.replace({name: 'userCenter'})
            }
        },
        components: {
            banner,
            tabs
        }
    }

</script>

<style scoped lang="less">
    .myself {
        background-color: #fff;
    }


</style>