<template>
    <div class="notice-all-page">
        <ul>
            <li v-for="(item,index) in noticeList" :key="index">
                <dis-rank :value="item" v-if="item.notice_type == 1" @readNotice="readNotice"></dis-rank>
                <like-dis :value="item" v-if="item.notice_type == 5" @readNotice="readNotice"></like-dis>
                <new-post :value="item" v-if="item.notice_type == 4"></new-post>
            </li>
        </ul>
    </div>
</template>

<script>
    import {SVS_getNotice, SVS_readNotice} from '../../Servers/API'
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
                    vm.noticeList = res.data.sort((a, b) => {
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    })

                })
            }, err => {

            }, {notice_type: 'all'})
        },
        created() {
        },
        methods: {
            readNotice(id) {
                SVS_readNotice(res => {

                }, err => {
                    return
                }, id)
            }
        },
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