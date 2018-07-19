<template>
    <div class="notice-all-page">
        <ul>
            <li v-for="(item,index) in noticeList">
                <like-dis :value="item" v-if="item.notice_type == 5"></like-dis>
                <dis-rank :value="item" v-if="item.notice_type == 1"></dis-rank>
                <new-post :value="item" v-if="item.notice_type == 4"></new-post>
            </li>
        </ul>
    </div>
</template>

<script>
    import {SVS_getNotice} from '../../Servers/API'
    import likeDis from '../MyNotice/likeDiscuss' //評論被點讚
    import disRank from '../MyNotice/disRank' //回復了榜單
    import newPost from '../MyNotice/newPost' //回復了榜單

    export default {
        data() {
            return {
                noticeList: []
            }
        },
        beforeRouteEnter(to, from, next) {
            SVS_getNotice(res => {
                next(vm => {
                    vm.noticeList = res.data
                })

            }, err => {

            }, {notice_type: 'all'})
        },
        methods: {},
        components: {
            likeDis,
            disRank,
            newPost
        }
    }

</script>

<style scoped lang="less">
    .notice-all-page {
        width: 100%;
    }
</style>