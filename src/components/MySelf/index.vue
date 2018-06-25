<template>

    <div class="myself">
        <rcm-header>
            <div slot="back" @click="goPrve">
                <i style="font-family: iconfont">&#xe600;</i><span>我的</span>
            </div>
        </rcm-header>
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
            this.$store.commit('SETROUTERFROM', 'myself')
            this.$store.commit('SETROUTERTO', to.name)
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