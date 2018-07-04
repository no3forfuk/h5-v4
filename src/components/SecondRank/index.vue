<template>
    <div class="second-page">
        <second-head :value="secondInfo" class="second-head"></second-head>
        <tabs :value="secondInfo.data" class="second-tabs-box"></tabs>
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
            this.$nextTick(() => {
                $('.second-page').height($(window).height() - 68)
                $('.second-tabs-box').height($(window).height() - 68 - $('.second-head').height())
            })

        },
        created() {
            this.getSecondRankInfo()
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETROUTERFROM', from.name)
            this.$store.commit('SETROUTERTO', to.name)
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