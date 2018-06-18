<template>
    <transition name="transitionName" mode="in-out">
        <div class="second-page">
            <rcm-header>
                <icon slot="back"
                      :value="'&#xe600;'"
                      :pathName="backName"
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
    </transition>
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
            this.$store.commit('SETROUTERFROM', 'secondrank')
            next()
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

    .transitionName-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    .transitionName-leave-active {
        animation: slideOutLeft 0.4s;
        position: absolute;
    }
</style>