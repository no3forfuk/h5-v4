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
                  class="second-tabs-box"
                  @nextListPage="loadNextList"
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
            <rank-details slot="fullPage"></rank-details>
        </rcm-popup>
    </div>
</template>

<script>
    import secondHead from './secondHead'
    import tabs from './tabs'
    import disModal from './discuss2'
    import {sharePage} from '../../utils/index'
    import {SVS_getRankList} from '../../Servers/API'
    import addEle from './addElement'
    import invite from './inviteOthers'
    import rankDetails from './details'

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
                leaveTime: 0
            }
        },
        created() {
            this.getSecondRankInfo()
            this.$store.commit('TOGGLENAVSHOW', false)
            //统计二级榜单浏览次数
            this.$count(['Reading_Rank_Lv2_Num', 1])
            this.enterTime = new Date().getTime()
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
                    return
                }
            },
            back() {
                this.$store.commit('SET_TRANSITIONTYPE', 'back')
                this.$router.push({
                    name: 'hot',
                    query: this.$route.query
                })
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