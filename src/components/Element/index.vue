<template>
    <div class="element-page" :style="elementPageHeight" @scroll="scrollElementPage">
        <rcm-header-placehloder></rcm-header-placehloder>
        <transition name="active-title">
            <p class="active-element-page" v-if="showActiveTitle" :style="positionTop">@{{elementData.element_name}}</p>
        </transition>
        <element-header @openDetails="toggleDetails"
                        @sortPost="sortPostByType"
                        ref="elementHead"
                        :value="elementData"
                        v-if="elementData"></element-header>
        <element-body :value="postListArr"
                      @loadmorePost="loadPostNextPage"
                      v-if="elementData.data"></element-body>
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
                totalPage: 1,
                showActiveTitle: false
            }
        },
        created() {
            this.$store.commit('TOGGLENAVSHOW', false)
        },
        mounted() {
            this.$nextTick(() => {

            })
        },
        beforeRouteEnter(to, from, next) {
            let params = {
                id: to.query.elementId,
                page: 1
            }
            getElementDetails(params).then(res => {
                if (res.status == 200 && res.data.status_code == 1) {
                    next(vm => {
                        vm.elementData = res.data.data
                        vm.postListArr = vm.postListArr.concat(res.data.data.data.data)
                        vm.totalPage = res.data.data.data.last_page
                        vm.page = res.data.data.data.current_page
                        sharePage(vm, location.href, res.data.data.element_name, res.data.data.element_desc)
                    })
                } else {
                    return
                }
            }).catch(err => {
                throw err
            })
        },
        beforeRouteLeave(to, from, next) {
            next()
        },
        computed: {
            elementPageHeight() {
                if (!this.$store.getters.TOPNAVSTATE) {
                    return {
                        height: $(window).height() - 33 + 'px'
                    }
                } else {
                    return {
                        height: $(window).height() - 59 + 'px'
                    }
                }
            },
            positionTop() {
                if (!this.$store.getters.TOPNAVSTATE) {
                    return {
                        top: 33 + 'px'
                    }
                } else {
                    return {
                        top: 59 + 'px'
                    }
                }
            }
        },
        methods: {
            scrollElementPage() {
                let height = $('.element-page')[0].scrollTop
                if (height > 140) {
                    this.showActiveTitle = true
                } else {
                    this.showActiveTitle = false
                }
            },
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
                let title = elementData.title;
                let desc = this.share.desc;
                let type = 'link';
                sharePage(vm, url, title, desc, type)
            },
            elementInfo() {
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
                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            },
            setScrollBoxHeight() {

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
        overflow-x: hidden;
        transition: all 0.5s;
        overflow-y: auto;
        .active-element-page {
            padding: 0 20px;
            font-weight: bold;
            font-size: 20px;
            transition: all 1s;
            width: 100%;
            position: fixed;
            background-color: #fff;
            border-bottom: 1px solid rgba(0, 0, 0, .2);
            top: 0px;
            z-index: 20;
            left: 0;
        }

    }

    .active-title-enter-active {
        animation: fadeIn 1s;
    }

    .active-title-leave-active {
        animation: fadeOut 1s;
    }

    .openDetails-enter-active {
        animation: slideInUp 0.6s;
    }

    .openDetails-leave-active {
        animation: slideOutDown 0.6s;
    }
</style>