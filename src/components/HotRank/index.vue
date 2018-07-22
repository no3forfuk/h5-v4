<template>
    <div class="hot-rank">
        <rcm-head :idx="0" @getIndexData="getFirstRankInfo"></rcm-head>
        <rcm-page-header :value="pageTitle"></rcm-page-header>
        <div class="hot-page-body" :style="scrollBoxHeight" ref="rankListBox">
            <mt-loadmore :bottom-method="loadBeforeDay"
                         :bottom-all-loaded="allLoaded"
                         :bottomDistance="pullHeight"
                         :auto-fill="false"
                         ref="loadmore">
                <ul>
                    <transition-group name="rank-list-transition">
                        <rank-card v-for="(item,index) in list"
                                   :value="item"
                                   :key="index"></rank-card>
                    </transition-group>
                    <div class="index-footer">
                        <p>没找到感兴趣的？点开发现探索一下</p>
                    </div>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import {timeFormat, sharePage} from '../../utils/index'
    import {SVS_getIndex, SVS_getRankList} from '../../Servers/API'

    export default {
        data() {
            return {
                allLoaded: false,
                pullHeight: 20,
                list: [],
                time: '',
                dayNum: 0,
                page: 1,
                pageTitle: 'RCM热门榜单',
                pageType: ''
            }
        },
        mounted() {
            this.$nextTick(() => {
                $(document)[0].title = '首页';
            })
        },
        created() {
            let time = Date.now()
            time = timeFormat('-', time)
            this.time = time;
            this.getPushRank()
            this.sharePage()
        },
        computed: {
            scrollBoxHeight() {
                if (this.$store.getters.TOPNAVSTATE) {
                    return {
                        height: $(window).height() - 133 + 'px'
                    }
                } else {
                    return {
                        height: $(window).height() - 102 + 'px'
                    }
                }
            }
        },
        methods: {
            getFirstRankInfo(val) {
                this.list = []
                if (val.ranking_name == '热门榜单') {
                    this.pageType = 'hot'
                    this.pageTitle = 'RCM热门榜单'
                    this.getPushRank()
                } else {
                    this.pageTitle = '开荒神器RCM'
                    this.pageType = 'firstRank'
                    this.getFirstRank(val.id)
                }
            },
            sharePage() {
                let vm = this;
                let url = location.href;
                let title = '热门榜单';
                let desc = 'RCM热门榜单';
                let type = 'link';
                sharePage(vm, url, title, desc, type)
            },
            loadBeforeDay() {
                if (this.pageType == 'hot') {
                    this.dayNum++;
                    let oneDay = this.dayNum * 3600 * 24 * 1000
                    let time = Date.now() - oneDay
                    this.time = timeFormat('-', time)
                } else {
                    this.page++;
                }
                this.$refs.loadmore.onBottomLoaded();
            },
            //获取推送榜单
            getPushRank() {
                let params = {}
                let oneDay = this.dayNum * 3600 * 24 * 1000
                let time = Date.now() - oneDay
                this.time = timeFormat('-', time)
                params.time = this.time
                SVS_getIndex(res => {
                    if (res.data.length > 0) {
                        this.list = this.list.concat(res.data)
                    } else {
                        this.dayNum++
                    }
                }, err => {
                    return
                }, params)
            },
            //获取一级榜单
            getFirstRank(id) {
                let params = {
                    id: id,
                    level: 1,
                    page: this.page
                }
                SVS_getRankList(res => {
                    this.list = this.list.concat(res.data.data.data)
                }, err => {
                    return
                }, params)
            }
        },
        watch: {
            'dayNum'() {
                this.getPushRank()
            }
        }
    }

</script>

<style scoped lang="less">
    .hot-rank {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        transition: all 0.5s;
        overflow-y: hidden;
        .hot-page-body {
            width: 100%;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .index-footer {
            width: 100%;
            height: 80px;
            margin-top: 10px;
            p {
                width: 100%;
                color: #C8C7CD;
                text-align: center;
                font-size: 12px;
            }
        }
    }

    .rank-list-transition-enter-active {
        animation: fadeIn 0.4s;
    }

    .rank-list-transition-leave-active {
        animation: fadeOut 0.4s;
    }
</style>