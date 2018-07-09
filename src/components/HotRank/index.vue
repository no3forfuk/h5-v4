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

    export default {
        data() {
            return {
                allLoaded: false,
                pullHeight: 20,
                list: []
            }
        },
        mounted() {
            this.$nextTick(() => {
                $('.hot-rank').height($(window).height() - $('.hot-rank')[0].offsetTop)
            })
        },
        created() {
            this.getPushRank()
        },
        methods: {
            loadBeforeDay() {
                this.$refs.loadmore.onBottomLoaded();
            },
            getPushRank() {
                let params = {}
                params.time = '2018-07-03'
                this.$indicator.open({
                    text: '加载中',
                    spinnerType: 'fading-circle'
                })
                getIndex(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.list = res.data.data
                            this.$indicator.close()
                        } else {

                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
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