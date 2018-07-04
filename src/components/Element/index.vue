<template>
    <div class="element-page">
        <div class="element-body">
            <element-header @openDetails="toggleDetails" :value="elementData"></element-header>
            <element-body :value="elementData.data"></element-body>
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
    import {getElementDetails} from '../../api/api'

    export default {
        data() {
            return {
                detailsIsOpen: false,
                elementData: {}
            }
        },
        created() {
            this.elementInfo()
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
            elementInfo() {
                let params = {}
                params.id = this.$route.query.elementId;
                getElementDetails(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.elementData = res.data.data
                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            },
            setScrollBoxHeight() {
                let Height = $(window).height() - $('.element-header').height()
                $('.element-body').height(Height + 27)
            },
            goback() {
                window.history.back()
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