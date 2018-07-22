<template>
    <div class="first-rank">
        <rcm-head ></rcm-head>
        <rcm-page-header :value="pageTitle"></rcm-page-header>
        <div class="first-page-body" :style="scrollDivHeight">
            <mt-loadmore :bottom-method="loadNextPage"
                         :bottom-all-loaded="allLoaded"
                         :bottomDistance="pullHeight"
                         :auto-fill="false"
                         ref="loadmore">
                <ul class="ranklist">
                    <!--<transition name="placeholder">-->
                    <!--<index-placeholder v-if="!list.length"></index-placeholder>-->
                    <!--</transition>-->
                    <transition-group :name="listTransition">
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
    import {getRankList} from '../../api/api'
    import indexPlaceholder from './placeholder'
    import {sharePage} from '../../utils'

    export default {
        data() {
            return {
                allLoaded: false,
                pullHeight: 20,
                list: [],
                page: 1,
                totalPage: 0,
                listTransition: '',
                pageTitle: '开荒神器RCM'
            }
        },
        created() {
            this.getFirstList()
        },
        beforeRouteEnter(to, from, next) {
            next()
        },
        mounted() {
            this.$nextTick(() => {
                $(document)[0].title = '首页';
            })
        },
        methods: {
            sharePage() {
                let vm = this;
                let url = location.href;
                let desc = 'RCM热门榜单';
                let type = 'link';
                let firstRankArr = this.$storage.GET_session('firstRank')
                var title = '';
                for (let i = 0; i < firstRankArr.length; i++) {
                    if (firstRankArr[i].id == this.$route.query.firstId) {
                        title = firstRankArr[i].ranking_name;
                    }
                }
                sharePage(vm, url, title, desc, type)
            },
            loadNextPage() {
                this.page++;
                if (this.page > this.totalPage) {
                    setTimeout(() => {
                        this.$refs.loadmore.onBottomLoaded();
                    }, 500)
                } else {
                    this.getFirstList()
                    setTimeout(() => {
                        this.$refs.loadmore.onBottomLoaded();
                    }, 500)
                }
            },
            getFirstList() {
                let params = {}
                params.level = 1;
                params.page = this.page
                params.id = this.$route.query.firstId || 1
                getRankList(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.list = this.list.concat(res.data.data.data.data);
                            this.totalPage = res.data.data.data.last_page
                        } else {

                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            }
        },
        computed: {
            scrollDivHeight() {
                if (this.$store.getters.TOPNAVSTATE) {
                    return {
                        height: $(window).height() - 120 + 'px'
                    }
                } else {
                    return {
                        height: $(window).height() - 94 + 'px'
                    }
                }
            }
        },
        watch: {
            '$route.query.firstId'(val) {
                this.page = 1
                this.list = []
                this.getFirstList()
                this.sharePage()
            },
            '$route.query.idx'(n, o) {
                if (n - o > 0) {
                    this.listTransition = 'list-after'
                } else {
                    this.listTransition = 'list-before'
                }
            }
        },
        components: {
            indexPlaceholder
        }
    }

</script>

<style scoped lang="less">
    .first-rank {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
        .page-header {
            width: 100%;
            padding: 0 20px;
            padding-bottom: 5px;
            font-size: 30px;
            border-bottom: 1px solid #C8C7CD;
        }
        .first-page-body {
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

    .ranklist {
        height: 100%;
        width: 100%;
        padding: 5px 0px;
    }

    .placeholder-enter-active {
        animation: fadeIn 0.2s;
    }

    .placeholder-leave-active {
        animation: fadeOut 0.2s;
    }

    .list-after-enter-active {
        animation: fadeIn 0.4s;
    }

    .list-after-leave-active {
        animation: fadeOut 0.5s;
    }

    .list-before-enter-active {
        animation: fadeIn 0.4s;
    }

    .list-before-leave-active {
        animation: fadeOut 0.5s;
    }
</style>