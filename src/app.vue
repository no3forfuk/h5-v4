<template>
    <div class="app">
        <rcm-headers :color="'#7D09FF'"
                     class="header"
                     ref="rcmHeaders"
                     :back-target="backTarget"
                     :is-index="isIndex"
                     :right-text="rightText"
                     :has-nav="$route.meta.hasNav"
                     :left-text="leftText"></rcm-headers>
        <transition :name="transitionName">
            <router-view class="router-view"></router-view>
        </transition>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                leftText: '',
                isIndex: true,
                backTarget: '',
                hasNav: true,
                rightText: ''
            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {
                $('.app').css({
                    height: $(window).height()
                })
            })
        },
        updated() {
            this.$store.commit('SETDIRECTION', 'forward')
        },
        methods: {},
        computed: {
            transitionName() {
                if (this.$store.state.openUserCenter) {
                    return 'openuser'
                }
                return this.$store.state.direction
            }
        },
        watch: {
            '$route'(val) {

            },
            '$route.name'(val) {
                switch (val) {
                    case 'hot':
                        this.leftText = ''
                        this.isIndex = true
                        this.rightText = ''
                        break;
                    case 'firstRank':
                        this.leftText = ''
                        this.isIndex = true
                        this.rightText = ''
                        break;
                    case 'secondRankList':
                        this.leftText = '首页'
                        this.isIndex = false
                        this.backTarget = 'hot'
                        this.rightText = ''
                        break;
                    case 'secondRankDiscuss':
                        this.leftText = '首页'
                        this.isIndex = false
                        this.backTarget = 'hot'
                        this.rightText = ''
                        break;
                    case 'secondRankActivity':
                        this.leftText = '首页'
                        this.isIndex = false
                        this.backTarget = 'hot'
                        this.rightText = ''
                        break;
                    case 'element':
                        this.leftText = '榜单'
                        this.isIndex = false
                        this.rightText = ''
                        this.backTarget = 'secondRankList'
                        break;
                    case 'addPost':
                        this.leftText = ''
                        this.isIndex = false
                        this.backTarget = 'element'
                        this.rightText = '完成'
                        break;
                    case 'post':
                        this.leftText = '排名'
                        this.isIndex = false
                        this.backTarget = 'element'
                        this.rightText = ''
                        this.hasNav = false
                        break;
                    default :
                        this.leftText = ''
                        this.isIndex = false
                }
            }
        }
    }

</script>

<style scoped lang="less">

    .app {
        width: 100%;
        overflow: hidden;
        position: relative;
        background-color: #fff;
    }

    .router-view {
        width: 100%;
        overflow: hidden;
        background-color: #fff;
    }

    /*前进进入*/
    .forward-enter-active,
    .userCenter-home-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    /*前进离开*/
    .forward-leave-active,
    .userCenter-home-leave-active {
        animation: slideOutLeft 0.4s;
        position: absolute;
    }

    /*后退进入*/
    .back-enter-active,
    .openuser-enter-active,
    .home-userCenter-enter-active {
        animation: slideInLeft 0.4s;
        position: absolute;
    }

    /*后退离开*/
    .back-leave-active,
    .openuser-leave-active,
    .home-userCenter-leave-active {
        animation: slideOutRight 0.4s;
        position: absolute;
    }

    .home-element-enter-active {
        animation: scaleToCenter 0.5s;
        position: absolute;
    }
</style>