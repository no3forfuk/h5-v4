<template>
    <div class="myself">
        <rcm-head :type="'back'" @linkTo="goPrve"></rcm-head>
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
                this.$store.commit('SET_TRANSITIONTYPE', 'back')
                this.$router.back()
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
        width: 100%;
        height: 100%;
        background-color: #fff;
    }


</style>