<template>
    <div class="home">
        <div class="home-body">
            <p class="page-header">开荒神器RCM</p>
            <transition name="transitionName" mode="out-in">
                <router-view class="home-view"></router-view>
            </transition>
        </div>
    </div>

</template>

<script>
    import findBody from '../common/Find/findBody'
    import rankList from '../FirstRank/index'
    import findCtrl from '../common/Find/findCtrl'
    import {getIndex} from '../../api/api'

    export default {
        data() {
            return {
                popupVisible: true,
                forward: '',
                list: [],
                scrollY: 0
            }
        },

        created() {
            this.getIndexData()
        },
        mounted() {
            this.$nextTick(() => {
                this.setScrollHeight()
                $('.home-view').height($('.home').height() - $('.page-header').height() - 68);
            })
        },
        updated() {
            this.$nextTick(() => {
                this.setScrollHeight()
            })
        },
        watch: {},

        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETROUTERFROM', from.name)
            this.$store.commit('SETROUTERTO', to.name)
            next()
        },
        methods: {
            getFirstList(val) {
                if (val.index == 0) {
                    this.$router.replace({
                        name: 'hot',
                        query: {idx: val.index}
                    })
                } else {
                    this.$router.replace({
                        name: 'firstRank',
                        query: {firstId: val.value.id, idx: val.index}
                    })
                }
            },
            getIndexData() {
                let params = {};
                params.time = '2018-07-03'
                getIndex(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.list = res.data.data
                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            },
            setScrollHeight() {
                let windowHeight = $(window).height();
                let headerHeight = $('.home-header').height()
                let activeHeight = $('.find-body').height()
                let bodyHeight = windowHeight - headerHeight + activeHeight;
                $('.home-body').height(bodyHeight)
            },
            goUserCenter() {
                this.$router.push({name: 'userCenter'})
            }
        },
        computed: {},
        components: {
            findBody,
            findCtrl,
            rankList
        }
    }

</script>

<style scoped lang="less">
    .home {
        width: 100%;
        height: 100%;
        background-color: #fff;
        .home-body {
            width: 100%;
            height: 100%;
            .home-view {
                width: 100%;
                height: 100%;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
            }
        }
    }

    .page-header {
        width: 100%;
        padding: 0 10px;
        padding-bottom: 5px;
        font-size: 30px;
        border-bottom: 1px solid #C8C7CD;
    }

    .transitionName-enter-active {
        animation: fadeIn 0.3s;
        position: absolute;
    }

    .transitionName-leave-active {
        animation: fadeOut 0.3s;
        position: absolute;
    }

</style>