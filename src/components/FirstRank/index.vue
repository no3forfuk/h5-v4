<template>
    <div class="first-rank">
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
    import {getRankList} from '../../api/api'

    export default {
        data() {
            return {
                allLoaded: false,
                pullHeight: 20,
                list: []
            }
        },
        created() {
            this.getFirstList()
        },
        mounted() {
            this.$nextTick(() => {
                $('.first-rank').height($(window).height() - $('.first-rank').offset().top)
            })
        },
        methods: {
            loadBeforeDay() {
                this.$refs.loadmore.onBottomLoaded();
            },
            getFirstList() {
                let params = {}
                params.level = 1;
                params.id = this.$route.query.firstId
                getRankList(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.list = res.data.data.data.data
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
            '$route.query.firstId'(val) {
                this.getFirstList()
            }
        }
    }

</script>

<style scoped lang="less">
    .first-rank {
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