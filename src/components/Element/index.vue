<template>
    <div class="element-page">
        <rcm-header class="element-header">
            <icon slot="back"
                  @click="goback"
                  :value="'&#xe600;'"
                  class="font-size-20">
            </icon>
            <find-ctrl slot="right"
                       color="#7D09FF">
            </find-ctrl>
            <find-body slot="find"></find-body>
        </rcm-header>
        <div class="element-body">
            <element-header @openDetails="toggleDetails"></element-header>
            <element-body></element-body>
            <element-footer></element-footer>
        </div>
        <transition name="openDetails">
            <element-details v-show="detailsIsOpen" @openDetails="toggleDetails"></element-details>
        </transition>
    </div>
</template>

<script>
    import findCtrl from '../common/Find/findCtrl'
    import findBody from '../common/Find/findBody'
    import elementHeader from './elementHeader'
    import elementBody from './elementBody'
    import elementDetails from './elementDetails'
    import elementFooter from './elementFooter'

    export default {
        data() {
            return {
                detailsIsOpen: false
            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {
                this.setScrollBoxHeight()
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETROUTERFROM', from.name)
            this.$store.commit('SETROUTERTO', to.name)
            next()
        },
        computed: {},
        methods: {
            setScrollBoxHeight() {
                let Height = $(window).height() - $('.element-header').height()
                $('.element-body').height(Height + 27)
            },
            goback() {
                this.$router.replace({name: 'secondRankList'})
            },
            toggleDetails(e) {
                this.detailsIsOpen = !this.detailsIsOpen
            }
        },
        components: {
            findCtrl,
            findBody,
            elementHeader,
            elementBody,
            elementFooter,
            elementDetails
        }
    }

</script>

<style scoped lang="less">
    .element-page {
        background-color: #fff;
        width: 100%;
    }

    .element-body {
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .openDetails-enter-active {
        animation: scaleToCenter 0.4s;
        position: absolute;
    }

    .openDetails-leave-active {
        animation: scaleFromCenter 0.4s;
        position: absolute;
    }
</style>