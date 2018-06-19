<template>
    <transition :name="transitionName" mode="in-out">
        <div class="element-page">
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
            <element-header></element-header>
            <element-body></element-body>
            <element-footer></element-footer>
        </div>
    </transition>
</template>

<script>
    import findCtrl from '../common/Find/findCtrl'
    import findBody from '../common/Find/findBody'
    import elementHeader from './elementHeader'
    import elementBody from './elementBody'
    import elementFooter from './elementFooter'

    export default {
        data() {
            return {
                backName: 'secondRankList',
            }
        },
        created() {

        },
        computed: {
            transitionName() {
                return this.$store.state.routerFrom
            }
        },
        methods: {},
        components: {
            findCtrl,
            findBody,
            elementHeader,
            elementBody,
            elementFooter
        }
    }

</script>

<style scoped lang="less">
    .element-page {
        background-color: #fff;
        width: 100%;
    }

    .secondrank-enter-active {
        animation: slideInRight 0.4s;
    }

    .home-enter-active {
        animation: scaleToCenter 0.5s;
    }

    .secondrank-leave-active, .home-leave-active {
        animation: slideOutLeft 0.4s;
    }
</style>