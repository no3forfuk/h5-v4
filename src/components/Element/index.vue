<template>
    <div class="element-page">
        <rcm-head :type="'back'"
                  @linkTo="back"
                  :right="true">
        </rcm-head>
        <div class="element-page-body"
             :class="{noscroll:addPost || detailsIsOpen || activeMore}"
             :style="elementPageHeight"
             @scroll="scrollElementPage">
            <transition name="active-title">
                <p class="active-element-page"
                   v-if="showActiveTitle"
                   :style="positionTop">
                    @{{elementData.element_name}}
                </p>
            </transition>
            <element-header @openDetails="toggleDetails"
                            @sortPost="sortPostByType"
                            @addPost="addPost = true"
                            @more="activeMore=true"
                            ref="elementHead"
                            :value="elementData"
                            v-if="elementData"></element-header>
            <element-body :value="postListArr"
                          @loadmorePost="loadPostNextPage"
                          v-if="elementData.data"></element-body>
            <rcm-popup :show="detailsIsOpen" :type="'full'" @close="detailsIsOpen = false">
                <element-details v-show="detailsIsOpen"
                                 @openDetails="toggleDetails"
                                 slot="fullPage"
                                 :value="elementData"></element-details>
            </rcm-popup>
            <rcm-popup :show="addPost" :type="'full'" @close="addPost = false">
                <add-post slot="fullPage" @cancel="addPost=false" @refresh="elementInfo"></add-post>
            </rcm-popup>
            <rcm-popup :items="more"
                       :show="activeMore"
                       @close="activeMore=false"
                       @clickItem="clickMoreItem">
            </rcm-popup>
        </div>
    </div>
</template>

<script>
    import elementHeader from './elementHeader'
    import elementBody from './elementBody'
    import elementDetails from './elementDetails'
    import elementFooter from './elementFooter'
    import addPost from './addPost'
    import {SVS_getElementDetails} from '../../Servers/API'
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
                showActiveTitle: false,
                addPost: false,
                activeMore: false,
                more: [{
                    label: '举报',
                    value: 1
                }],
                enterTime: 0,
                leaveTime: 0
            }
        },
        created() {
            this.$store.commit('TOGGLENAVSHOW', false)
            this.elementInfo()
            //统计元素浏览次数
            this.$count(['Reading_Element_Num', 1])
            this.enterTime = new Date().getTime()
        },
        beforeDestroy() {
            //统计元素浏览时长
            this.leaveTime = new Date().getTime()
            let time = Math.round((this.leaveTime - this.enterTime) / 1000)
            this.$count(['Reading_Element_Time', time])
        },
        computed: {
            elementPageHeight() {
                if (!this.$store.getters.TOPNAVSTATE) {
                    return {
                        height: $(window).height() - 42 + 'px'
                    }
                } else {
                    return {
                        height: $(window).height() - 73 + 'px'
                    }
                }
            },
            positionTop() {
                if (!this.$store.getters.TOPNAVSTATE) {
                    return {
                        top: 40 + 'px'
                    }
                } else {
                    return {
                        top: 71 + 'px'
                    }
                }
            }
        },
        methods: {
            clickMoreItem(val) {
                this.activeMore = false
                this.$count(['Element_More', 1])
                if (val.value == 1) {
                    this.$count(['Element_More_Report', 1])
                }
            },
            back() {
                this.$store.commit('SET_TRANSITIONTYPE', 'back')
                this.$router.push({
                    name: 'secondRankList',
                    query: this.$route.query
                })
            },
            scrollElementPage() {
                let height = $('.element-page-body')[0].scrollTop
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
                this.$count(['Element_Sort_Post', 1])
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
                let title = this.elementData.element_name;
                let desc = this.elementData.element_desc;
                let type = 'link';
                sharePage(vm, url, title, desc, type)
            },
            elementInfo() {
                let params = {}
                params.id = this.$route.query.elementId;
                params.page = this.page;
                SVS_getElementDetails(res => {
                    this.elementData = res.data
                    this.postListArr = this.postListArr.concat(res.data.data.data)
                    this.totalPage = res.data.data.last_page
                    this.page = res.data.data.current_page
                    this.$set(this.share, 'title', res.data.element_name)
                    this.$set(this.share, 'desc', res.data.element_desc || '暂时没有描述信息')
                    this.sharePage()
                }, err => {
                    return
                }, params)
            },
            toggleDetails(e) {
                this.detailsIsOpen = !this.detailsIsOpen
                if (this.detailsIsOpen) {
                    this.$count(['Element_OpenDetails', 1])
                }
            }
        },
        components: {
            elementHeader,
            elementBody,
            elementFooter,
            elementDetails,
            addPost
        }
    }

</script>

<style scoped lang="less">
    .element-page {
        background-color: #fff;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        transition: all 0.5s;
        overflow-y: hidden;
        .element-page-body {
            width: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }
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