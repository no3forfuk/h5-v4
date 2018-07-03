<template>
    <div class="second-page">
        <rcm-header>
            <icon slot="back"
                  @click="goHome"
                  :value="'&#xe600;'"
                  class="font-size-20">
            </icon>
            <find-ctrl slot="right"
                       color="#7D09FF">
            </find-ctrl>
            <find-body slot="find"></find-body>
        </rcm-header>
        <second-head :value="secondInfo"></second-head>
        <tabs :value="secondInfo.data"></tabs>
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
                backName: 'home',
                secondInfo: {}
            }
        },
        created() {
            this.getInfo()
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETROUTERFROM', from.name)
            this.$store.commit('SETROUTERTO', to.name)
            next()
        },
        computed: {},
        methods: {
            goHome() {
                window.history.back()
            },
            getInfo() {
                let params = {};
                params.id = this.$route.query.secondId;
                params.level = 2;
                getRankList(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.secondInfo = res.data.data;
                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            }
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