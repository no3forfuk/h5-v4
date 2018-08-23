<template>
    <div class="second-page">
        <rcm-head :type="'back'" @linkTo="back" :right="true"></rcm-head>
        <div class="second-page-body"
             :class="{noscroll:activeDiscuss || activeAddElement || $store.getters.GOLOGIN || activeMore || inviteOthers || activeDetails}"
             @scroll="scrollSecondPage"
             :style="scrollBoxHeight">
            <transition name="active-title">
                <p class="activeTitle" v-if="showActiveTitle" :style="positionTop">#{{secondInfo.ranking_name}}</p>
            </transition>
            <second-head :value="secondInfo"
                         class="second-head"
                         ref="secondHead"
                         @openDetails="activeDetails=true"
                         @activeMore="activeMore=true"></second-head>
            <tabs :value="listInfo"
                  :totalItems="totalList"
                  class="second-tabs-box"
                  @nextListPage="loadNextList"
                  @loadMore="loadOtherList"
                  @sortElement="sortElementByType"
                  @openDis="openDis"
                  @openAddEle="activeAddElement=true">
            </tabs>
        </div>
        <rcm-popup :show="activeDiscuss"
                   :type="'full'"
                   @close="closeDIS">
            <dis-modal slot="fullPage" @cancel="activeDiscuss = false"></dis-modal>
        </rcm-popup>
        <rcm-popup :show="activeAddElement"
                   @close="activeAddElement = false"
                   :type="'full'">
            <add-ele slot="fullPage" @cancel="activeAddElement = false" @refresh="getSecondRankInfo"></add-ele>
        </rcm-popup>
        <rcm-popup :items="more"
                   :show="activeMore"
                   @close="activeMore=false"
                   @clickItem="clickMoreItem">
        </rcm-popup>
        <rcm-popup :type="'full'"
                   :show="inviteOthers"
                   @close="inviteOthers=false">
            <invite slot="fullPage" @cancel="inviteOthers=false" @comfirm="inviteOthers=false"></invite>
        </rcm-popup>
        <rcm-popup :type="'full'"
                   :show="activeDetails"
                   @close="activeDetails=false">
            <rank-details slot="fullPage" :value="secondInfo" @openDetails="activeDetails=false"></rank-details>
        </rcm-popup>
    </div>
</template>

<script>
    import secondHead from './secondHead'
    import tabs from './tabs'
    import disModal from './discuss2'
    import {sharePage} from '../../utils/index'
    import {SVS_getRankList, SVS_report} from '../../Servers/API'
    import addEle from './addElement'
    import invite from './inviteOthers'
    import rankDetails from './details'

    export default {
        data() {
            return {
                secondInfo: {},
                listInfo: [],
                listInfobefore: [],
                listInfoAfter: [],
                loadMoreFlag: false,
                share: {
                    title: '',
                    desc: ''
                },
                listPage: 1,
                totalList: 0,
                listTotalPage: 1,
                showActiveTitle: false,
                activeDiscuss: false,
                activeAddElement: false,
                activeDetails: false,
                inviteOthers: false,
                more: [
                    {
                        label: '邀请添加排名',
                        value: 1
                    },
                    {
                        label: '举报',
                        value: 2
                    }
                ],
                activeMore: false,
                enterTime: 0,
                leaveTime: 0,
                fromRouter: '',
                solt_name: 'exponent'
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.fromRouter = from.name
            })
        },
        created() {
            this.getSecondRankInfo()
            this.$store.commit('TOGGLENAVSHOW', false)
            //统计二级榜单浏览次数
            this.$count(['Reading_Rank_Lv2_Num', 1])
            this.enterTime = new Date().getTime()
        },
        mounted() {
            this.$nextTick(() => {
                $('.second-page').height($(window).height())
            })
        },
        beforeDestroy() {
            //统计二级榜单浏览时长
            this.leaveTime = new Date().getTime()
            let time = Math.round((this.leaveTime - this.enterTime) / 1000)
            this.$count(['Reading_Rank_Lv2_Time', time])
        },
        computed: {
            scrollBoxHeight() {
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
            sortElementByType(val) {
                if (val == 1) {
                    this.solt_name = 'exponent'
                }
                if (val == 2) {
                    this.solt_name = 'created_at'
                }
                this.listInfo = []
                this.loadMoreFlag = false
                this.getSecondRankInfo()
            },
            loadOtherList() {
                this.loadMoreFlag = true;
                this.listInfo = this.listInfobefore.concat(this.listInfoAfter)
                this.totalList = 6;
            },
            clickMoreItem(val) {
                this.activeMore = false
                this.$count(['Ranking_Lv2_ClickMore', 1])
                if (val.value == 1) {
                    this.$count(['Ranking_Lv2_More_Invite', 1])
                    this.inviteOthers = true
                    return
                }
                if (val.value == 2) {
                    this.$count(['Ranking_Lv2_More_Report', 1])
                    this.$messagebox.prompt('请填写举报原因', {
                        showConfirmButton: true,
                        confirmButtonClass: 'btnclass',
                        cancelButtonClass: 'btnclass'
                    }).then((val) => {
                        SVS_report(res => {
                            this.$toast({
                                message: res.message,
                                duration: 1000,
                                position: 'middle'
                            })
                        }, err => {
                            this.$toast({
                                message: err.message,
                                duration: 1000,
                                position: 'middle'
                            })
                        }, {
                            report_cause: val.value,
                            second_id: this.$route.query.secondId,
                            report_type: 2
                        })
                    })
                    return
                }
            },
            back() {
                this.$store.commit('SET_TRANSITIONTYPE', 'back')
                if (this.$store.getters.GET_ISBACK) {
                    this.$router.back()
                    return
                }
                if (this.fromRouter == 'element' || this.fromRouter == 'hot') {
                    this.$router.push({
                        name: 'hot',
                        query: this.$route.query
                    })
                } else {
                    this.$router.back()
                }
            },
            //打开评论框
            openDis() {
                this.activeDiscuss = true
            },
            //关闭评论框
            closeDIS() {
                this.activeDiscuss = false
            },
            closeAdd() {
                this.activeAddElement = false
            },
            scrollSecondPage() {
                let height = $('.second-page-body')[0].scrollTop
                if (height > 140) {
                    this.showActiveTitle = true
                } else {
                    this.showActiveTitle = false
                }
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
                    page: this.listPage,
                    id: this.$route.query.secondId,
                    solt_name: this.solt_name
                }
                SVS_getRankList(res => {
                    this.secondInfo = res.data;
                    if (!this.loadMoreFlag) {
                        this.listInfobefore = res.data.data.data.splice(0, 4)
                        this.listInfoAfter = res.data.data.data
                        let arr = []
                        arr = this.listInfobefore.concat(null);
                        let arrLast = res.data.last
                        arr.push(arrLast)
                        this.listInfo = arr
                        this.totalList = res.data.data.total
                    } else {
                        this.listInfo = this.listInfo.concat(res.data.data.data)
                    }
                    this.listTotalPage = res.data.data.last_page
                    const shareArr = res.data.data.data
                    let shareImg = ''
                    for (let i = 0; i < shareArr.length; i++) {
                        if (shareArr[i].img) {
                            shareImg = shareArr[i].img
                            break
                        }
                    }
                    sharePage(this, location.href, res.data.ranking_name, res.data.ranking_desc, 'link', shareImg)
                    $(document)[0].title = res.data.ranking_name;
                }, err => {
                    return
                }, params)
            },
        },
        components: {
            secondHead,
            tabs,
            disModal,
            addEle,
            invite,
            rankDetails
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
            transition: all 0.5s;
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