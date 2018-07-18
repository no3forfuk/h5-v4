<template>
    <div class="second-page" :style="heightStyle" @scroll="scrollSecondPage">
        <transition name="active-title">
            <p class="activeTitle" v-if="showActiveTitle" :style="positionTop">#{{secondInfo.ranking_name}}</p>
        </transition>
        <second-head :value="secondInfo" class="second-head" ref="secondHead"></second-head>
        <tabs :value="listInfo" class="second-tabs-box" @nextListPage="loadNextList"></tabs>
    </div>
</template>

<script>
    import findCtrl from '../common/Find/findCtrl'
    import findBody from '../common/Find/findBody'
    import secondHead from './secondHead'
    import tabs from './tabs'
    import {getRankList} from '../../api/api'
    import {sharePage} from '../../utils/index'

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
                showActiveTitle: false
            }
        },
        mounted() {
        },
        updated() {

        },
        beforeCreate() {

        },
        created() {
            // this.getSecondRankInfo()
        },
        beforeRouteEnter(to, from, next) {
            let params = {
                id: to.query.secondId,
                page: 1,
                level: 2,
                solt_name: 'exponent'
            }
            getRankList(params).then(res => {
                if (res.status == 200) {
                    if (res.data.status_code == 1) {
                        next(vm => {
                            vm.secondInfo = res.data.data;
                            console.log(res.data.data.data.data);
                            vm.listInfo = vm.listInfo.concat(res.data.data.data.data)
                            vm.listTotalPage = res.data.data.data.last_page
                            let shareTitle = res.data.data.ranking_name
                            let shareDesc = res.data.data.ranking_desc
                            console.log(vm.secondInfo);
                            sharePage(vm, location.href, shareTitle, shareDesc, 'link')
                        })
                    } else {

                    }
                } else {

                }
            }).catch(err => {
                return
            })

        },
        computed: {
            heightStyle() {
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
            scrollSecondPage() {
                let height = $('.second-page')[0].scrollTop
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
            sharePage() {
                debugger
                sharePage(this, location.href, this.share.title, this.share.desc, 'link')
            },
            getSecondRankInfo() {
                let params = {};
                params.id = this.$route.query.secondId;
                params.page = this.listPage;
                params.level = 2;
                getRankList(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.secondInfo = res.data.data;
                            this.listTotalPage = res.data.data.data.last_page
                            this.listInfo = this.listInfo.concat(res.data.data.data.data)
                            this.$refs.secondHead.initIsCollect(this.secondInfo.collect)
                            this.$set(this.share, 'title', res.data.data.ranking_name);
                            this.$set(this.share, 'desc', res.data.data.ranking_desc);
                            this.sharePage();
                            $(document)[0].title = this.secondInfo.ranking_name;
                        } else {

                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            },
        },
        components: {
            findCtrl,
            findBody,
            secondHead,
            tabs
        },
        watch: {}
    }

</script>

<style scoped lang="less">
    .second-page {
        background-color: #fff;
        overflow-x: hidden;
        overflow-y: auto;
        width: 100%;
        transition: all 0.5s;
    }

    .activeTitle {
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