<template>
    <div class="element-page">
        <div class="element-body">
            <element-header @openDetails="toggleDetails"
                            @sortPost="sortPostByType"
                            ref="elementHead"
                            :value="elementData"
                            v-if="elementData"></element-header>
            <element-body :value="postListArr"
                          @loadmorePost="loadPostNextPage"
                          v-if="elementData.data"></element-body>
            <element-footer></element-footer>
        </div>
        <transition name="openDetails">
            <element-details v-show="detailsIsOpen" @openDetails="toggleDetails" :value="elementData"></element-details>
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
    import {sharePage} from '../../utils'

    export default {
        data() {
            return {
                detailsIsOpen: false,
                elementData: {},
                share: {
                    title: '',
                    desc: ''
                },
                postListArr: [],
                page: 1,
                totalPage: 1
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
            next()
        },
        computed: {

        },
        methods: {
            loadPostNextPage() {
                this.page++
                if (this.page > this.totalPage) {
                    return
                } else {
                    this.elementInfo()
                }
            },
            sortPostByType(val) {
                if (val == 0) {
                    this.postListArr.sort((a, b) => {
                        return b.exponent - a.exponent
                    })
                    return
                }
                if (val == 1) {
                    this.postListArr.sort((a, b) => {
                        let strA = a.updated_at.replace(/\-/g, '/');
                        let strB = b.updated_at.replace(/\-/g, '/');
                        let msA = new Date(strA).getTime()
                        let msB = new Date(strB).getTime()
                        return msB - msA
                    })
                    return
                }
            },
            sharePage() {
                let vm = this;
                let url = location.href;
                let title = this.share.title;
                let desc = this.share.desc;
                let type = 'link';
                sharePage(vm, url, title, desc, type)
            },
            elementInfo() {
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                })
                let params = {}
                params.id = this.$route.query.elementId;
                params.page = this.page;
                getElementDetails(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.elementData = res.data.data
                            this.postListArr = this.postListArr.concat(res.data.data.data.data)
                            this.totalPage = res.data.data.data.last_page
                            this.page = res.data.data.data.current_page
                            this.$refs.elementHead.initCollectState(this.elementData.collect)
                            this.$set(this.share, 'title', res.data.data.element_name);
                            this.$set(this.share, 'desc', res.data.data.element_desc || '暂时没有描述信息');
                            this.sharePage()
                            this.$indicator.close()
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
            toggleDetails(e) {
                // this.detailsIsOpen = !this.detailsIsOpen
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