<template>
    <div class="second-page">
        <rcm-header>
            <icon slot="back"
                  @click="goHome"
                  :value="'&#xe600;'"
                  class="font-size-20">
            </icon>
            <find-ctrl slot="right"
                       color="#7D09FF">
            </find-ctrl>
            <find-body slot="find"></find-body>
        </rcm-header>
        <second-head></second-head>
        <tabs></tabs>
    </div>
</template>

<script>
    import findCtrl from '../common/Find/findCtrl'
    import findBody from '../common/Find/findBody'
    import secondHead from './secondHead'
    import tabs from './tabs'

    export default {
        data() {
            return {
                backName: 'home'
            }
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETROUTERFROM', from.name)
            this.$store.commit('SETROUTERTO', to.name)
            next()
        },
        computed: {},
        methods: {
            goHome() {
                this.$router.back()
            }
        },
        components: {
            findCtrl,
            findBody,
            secondHead,
            tabs
        }
    }

</script>

<style scoped lang="less">
    .second-page {
        background-color: #fff;
        width: 100%;
    }


</style>