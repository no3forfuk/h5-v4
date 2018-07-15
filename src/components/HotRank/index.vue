<template>
    <div class="hot-rank">
        <mt-loadmore :bottom-method="loadBeforeDay"
                     :bottom-all-loaded="allLoaded"
                     :bottomDistance="pullHeight"
                     :auto-fill="false"
                     ref="loadmore">
            <ul class="ranklist">
                <p class="page-header">开荒神器RCM</p>
                <rank-card v-for="(item,index) in list"
                           :value="item"
                           :key="index"></rank-card>
                <div class="index-footer">
                    <p>没找到感兴趣的？点开发现探索一下</p>
                </div>
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
        .page-header {
            width: 100%;
            padding: 0 10px;
            padding-bottom: 5px;
            font-size: 30px;
            border-bottom: 1px solid #C8C7CD;
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
</style>