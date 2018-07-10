<template>
    <div class="first-rank">
        <mt-loadmore :bottom-method="loadNextPage"
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
                list: [],
                page: 1,
                totalPage: 0
            }
        },
        created() {
            this.getFirstList()
        },
        mounted() {
            this.$nextTick(() => {
                $('.first-rank').height($(window).height() - $('.first-rank')[0].offsetTop)
            })
        },
        methods: {
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
                this.$indicator.open({
                    text: '加载中',
                    spinnerType: 'fading-circle'
                })
                let params = {}
                params.level = 1;
                params.page = this.page
                params.id = this.$route.query.firstId
                getRankList(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.list = this.list.concat(res.data.data.data.data);
                            this.totalPage = res.data.data.data.last_page
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
            '$route.query.firstId'(val) {
                this.page = 1
                this.list = []
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