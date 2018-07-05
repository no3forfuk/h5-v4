<template>
    <div class="app">
        <rcm-headers :color="'#7D09FF'"
                     class="header"
                     :back-target="backTarget"
                     :is-index="isIndex"
                     :has-nav="$route.meta.hasNav"
                     :left-text="leftText"></rcm-headers>
        <transition :name="transitionName">
            <keep-alive>
                <router-view class="router-view"></router-view>
            </keep-alive>
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
                hasNav: true
            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {
                $('.app').css({
                    height: $(window).height()
                })
                $('.router-view').height($(window).height() - $('.header').height())
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
                console.log(val);
            },
            '$route.name'(val) {
                switch (val) {
                    case 'hot':
                        this.leftText = ''
                        this.isIndex = true
                        break;
                    case 'firstRank':
                        this.leftText = ''
                        this.isIndex = true
                        break;
                    case 'secondRankList':
                        this.leftText = '首页'
                        this.isIndex = false
                        this.backTarget = 'hot'
                        break;
                    case 'secondRankDiscuss':
                        this.leftText = '首页'
                        this.isIndex = false
                        this.backTarget = 'hot'
                        break;
                    case 'secondRankActivity':
                        this.leftText = '首页'
                        this.isIndex = false
                        this.backTarget = 'hot'
                        break;
                    case 'element':
                        this.leftText = '榜单'
                        this.isIndex = false
                        this.backTarget = 'secondRankList'
                        break;
                    case 'post':
                        this.leftText = '排名'
                        this.isIndex = false
                        this.backTarget = 'element'
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