<template>

        <div class="element-page">
            <rcm-header class="element-header">
                <icon slot="back"
                      :value="'&#xe600;'"
                      class="font-size-20">
                </icon>
                <find-ctrl slot="right"
                           color="#7D09FF">
                </find-ctrl>
                <find-body slot="find"></find-body>
            </rcm-header>
            <div class="element-body">
                <element-header></element-header>
                <element-body></element-body>
                <element-footer></element-footer>
            </div>
        </div>

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

            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {
                this.setScrollBoxHeight()
            })
        },
        computed: {

        },
        methods: {
            setScrollBoxHeight() {
                let Height = $(window).height() - $('.element-header').height()
                $('.element-body').height(Height + 27)
            }
        },
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

    .element-body {
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }

</style>