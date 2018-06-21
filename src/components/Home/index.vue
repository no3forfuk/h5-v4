<template>
    <transition v-bind:name="transitionName" mode="in-out">
        <div class="home">
            <rcm-header class="home-header">
                <i slot="back"
                   style="font-family: iconfont;"
                   @click="goUserCenter"
                   class="font-size-28">
                    &#xe609;
                </i>
                <find-ctrl slot="right"
                           color="#7D09FF">
                </find-ctrl>
                <find-body slot="find" class="find-body"></find-body>
            </rcm-header>
            <div class="home-body">
                <p class="page-header">开荒神器RCM</p>
                <ul class="ranklist">
                    <rankList class="list"
                              v-for="(item,index) in list"
                              :key="index">
                    </rankList>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
    import findBody from '../common/Find/findBody'
    import rankList from '../FirstRank/index'
    import findCtrl from '../common/Find/findCtrl'
    import {getIendx} from '../../api/api'

    export default {
        data() {
            return {
                popupVisible: true,
                forward: '',
                list: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                scrollY: 0
            }
        },

        created() {
            getIendx('2018-06-15').then(res => {
                // console.log(res);
            }).catch(err => {
                throw err
            })
        },
        mounted() {
            this.$nextTick(() => {
                this.setScrollHeight()
            })
        },
        updated() {
            this.$nextTick(() => {
                this.setScrollHeight()
            })
        },
        watch: {},
        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETROUTERFROM', 'home')
            next()
        },
        methods: {
            setScrollHeight() {
                let windowHeight = $(window).height();
                let headerHeight = $('.home-header').height()
                let activeHeight = $('.find-body').height()
                let bodyHeight = windowHeight - headerHeight + activeHeight;
                $('.home-body').height(bodyHeight)
            },
            goUserCenter() {
                this.forward = 'usercenter'
                this.$nextTick(() => {
                    this.$router.push({name: 'userCenter'})
                })
            }
        },
        computed: {
            transitionName() {
                if (this.forward === 'usercenter') {
                    return 'gouser'
                } else {
                    return 'gother'
                }

            }
        },
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
        background-color: #fff;
        .home-body {
            overflow-y: auto;
        }
    }

    .ranklist {
        width: 100%;
        padding: 5px 0px;
    }

    .gouser-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    .gouser-leave-active {
        animation: slideOutRight 0.4s;
        position: absolute;

    }

    .gother-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    .gother-leave-active {
        animation: slideOutLeft 0.4s;
        position: absolute;
    }

    .page-header {
        width: 100%;
        padding: 0 10px;
        padding-bottom: 5px;
        font-size: 30px;
        border-bottom: 1px solid #C8C7CD;
    }


</style>