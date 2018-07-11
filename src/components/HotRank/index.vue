<template>
    <div class="hot-rank">
        <mt-loadmore :bottom-method="loadBeforeDay"
                     :bottom-all-loaded="allLoaded"
                     :bottomDistance="pullHeight"
                     :auto-fill="false"
                     ref="loadmore">
            <ul class="ranklist">
                <rank-card v-for="(item,index) in list"
                           :value="item"
                           :key="index"></rank-card>
            </ul>
        </mt-loadmore>
    </div>
</template>

<script>
    import {getIndex} from '../../api/api'
    import {timeFormat, sharePage} from '../../utils/index'

    export default {
        data() {
            return {
                allLoaded: false,
                pullHeight: 20,
                list: [],
                time: '',
                dayNum: 0
            }
        },
        mounted() {
            this.$nextTick(() => {
                $('.hot-rank').height($(window).height() - $('.hot-rank')[0].offsetTop)
                $(document)[0].title = '首页';
            })
        },
        created() {
            let time = Date.now()
            time = timeFormat('-', time)
            this.time = time;
            this.getPushRank()
        },
        methods: {
            sharePage() {
                let vm = this;
                let url = location.href;
                let title = '首页';
                let desc = 'RCM';
                let type = 'link';
                sharePage(vm, url, title, desc, type)
            },
            loadBeforeDay() {
                this.dayNum++;
                let oneDay = this.dayNum * 3600 * 24 * 1000
                let time = Date.now() - oneDay
                this.time = timeFormat('-', time)
                this.getPushRank()
                this.$refs.loadmore.onBottomLoaded();
            },
            getPushRank() {
                let params = {}
                let oneDay = this.dayNum * 3600 * 24 * 1000
                let time = Date.now() - oneDay
                this.time = timeFormat('-', time)
                params.time = this.time
                this.$indicator.open({
                    text: '加载中',
                    spinnerType: 'fading-circle'
                })
                getIndex(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            if (res.data.data.length > 0) {
                                this.list = this.list.concat(res.data.data)
                            } else {
                                this.dayNum++
                            }
                            this.$indicator.close()
                        } else {

                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
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
        overflow-x: hidden;
        overflow-y: auto;
    }

    .ranklist {
        height: 100%;
        width: 100%;
        padding: 5px 0px;
    }
</style>