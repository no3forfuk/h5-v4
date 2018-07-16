<template>
    <div class="second-page" :style="heightStyle">
        <second-head :value="secondInfo" class="second-head" ref="secondHead"></second-head>
        <tabs :value="listInfo" class="second-tabs-box" v-if="secondInfo.data" @nextListPage="loadNextList"></tabs>
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
                listTotalPage: 1
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
        },
        beforeRouteLeave(to, from, next) {
            next()
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
            }
        },
        methods: {
            loadNextList() {
                this.listPage++
                if (this.listPage > this.listTotalPage) {
                    return
                }
                this.getSecondRankInfo()
            },
            sharePage() {
                sharePage(this, location.href, this.share.title, this.share.desc, 'link')
            },
            getSecondRankInfo() {
                this.$indicator.open({
                    text: '加载中',
                    spinnerType: 'fading-circle'
                })
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
                            this.$indicator.close()
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
        position: relative;
        transition: all 0.5s;
    }


</style>