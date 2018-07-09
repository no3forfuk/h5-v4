<template>
    <div class="second-page">
        <second-head :value="secondInfo" class="second-head"></second-head>
        <tabs :value="secondInfo" class="second-tabs-box" v-if="secondInfo.data"></tabs>
    </div>
</template>

<script>
    import findCtrl from '../common/Find/findCtrl'
    import findBody from '../common/Find/findBody'
    import secondHead from './secondHead'
    import tabs from './tabs'
    import {getRankList} from '../../api/api'

    export default {
        data() {
            return {
                secondInfo: {}
            }
        },
        mounted() {


        },
        updated() {
            this.$nextTick(() => {
                $('.second-page').height($(window).height() - $('.second-page').offset().top)
            })
        },
        beforeCreate() {

        },
        created() {
            this.getSecondRankInfo()
        },
        beforeRouteLeave(to, from, next) {
            next()
        },
        computed: {},
        methods: {
            getSecondRankInfo() {
                let params = {};
                params.id = this.$route.query.secondId;
                params.level = 2;
                getRankList(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.secondInfo = res.data.data;
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
        }
    }

</script>

<style scoped lang="less">
    .second-page {
        background-color: #fff;
        width: 100%;
    }


</style>