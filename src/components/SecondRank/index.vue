<template>
    <div class="second-page">
        <rcm-head></rcm-head>
        <div class="second-page-body" @scroll="scrollSecondPage" :style="scrollBoxHeight">
            <transition name="active-title">
                <p class="activeTitle" v-if="showActiveTitle" :style="positionTop">#{{secondInfo.ranking_name}}</p>
            </transition>
            <second-head :value="secondInfo" class="second-head" ref="secondHead"></second-head>
            <tabs :value="listInfo" class="second-tabs-box" @nextListPage="loadNextList" @openDis="openDis"></tabs>
        </div>
        <rcm-popup :show="activeDiscuss"
                   :type="'full'"
                   @close="closeDIS">
            <dis-modal slot="fullPage"></dis-modal>
        </rcm-popup>
    </div>
</template>

<script>
    import secondHead from './secondHead'
    import tabs from './tabs'
    import disModal from './discuss2'
    import {sharePage} from '../../utils/index'
    import {SVS_getRankList} from '../../Servers/API'

    export default {
        data() {
            return {
                secondInfo: {},
                listInfo: [],
                share: {
                    title: '',
                    desc: ''
                },
                listPage: 1,
                listTotalPage: 1,
                showActiveTitle: false,
                activeDiscuss: true
            }
        },
        mounted() {
        },
        updated() {

        },
        beforeCreate() {

        },
        created() {
            this.getSecondRankInfo()
            this.$store.commit('TOGGLENAVSHOW', false)
        },
        computed: {
            scrollBoxHeight() {
                if (!this.$store.getters.TOPNAVSTATE) {
                    return {
                        height: $(window).height() - 73 + 'px'
                    }
                } else {
                    return {
                        height: $(window).height() - 42 + 'px'
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
            //打开评论框
            openDis() {
                this.activeDiscuss = true
            },
            //关闭评论框
            closeDIS() {
                this.activeDiscuss = false
            },
            scrollSecondPage() {
                let height = $('.second-page-body')[0].scrollTop
                if (height > 140) {
                    this.showActiveTitle = true
                } else {
                    this.showActiveTitle = false
                }
            },
            sharePage() {
                sharePage(this, location.href, this.share.title, this.share.desc, 'link')
            },
            loadNextList() {
                this.listPage++
                if (this.listPage > this.listTotalPage) {
                    return
                }
                this.getSecondRankInfo()
            },
            getSecondRankInfo() {
                let params = {
                    level: 2,
                    page: this.page,
                    id: this.$route.query.secondId,
                    solt_name: this.solt_name
                }
                SVS_getRankList(res => {
                    this.secondInfo = res.data;
                    this.listInfo = this.listInfo.concat(res.data.data.data)
                    this.listTotalPage = res.data.data.last_page
                    // this.$refs.secondHead.initIsCollect(this.secondInfo.collect)
                    this.$set(this.share, 'title', res.data.ranking_name);
                    this.$set(this.share, 'desc', res.data.ranking_desc);
                    this.sharePage();
                    $(document)[0].title = this.secondInfo.ranking_name;
                }, err => {
                    return
                }, params)
            },
        },
        components: {
            secondHead,
            tabs,
            disModal
        },
        watch: {}
    }

</script>

<style scoped lang="less">
    .second-page {
        background-color: #fff;
        overflow-x: hidden;
        overflow-y: hidden;
        width: 100%;
        height: 100%;
        transition: all 0.5s;
        .second-page-body {
            width: 100%;
            overflow-y: auto;
            overflow-x: hidden;
        }
    }

    .activeTitle {
        transition: all 0.3s;
        position: fixed;
        background-color: #fff;
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        top: 0px;
        z-index: 2;
        left: 0;
        padding: 0 20px;
        font-weight: bold;
        font-size: 20px;
    }

    .active-title-enter-active {
        animation: fadeIn 1s;
    }

    .active-title-leave-active {
        animation: fadeOut 1s;
    }
</style>