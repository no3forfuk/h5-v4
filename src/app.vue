<template>
    <div class="app">
        <rcm-headers :color="'#7D09FF'" class="header"></rcm-headers>
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
            return {}
        },
        created() {
            this.$store.commit('SETROUTERDIRECTION', 'forward')
        },
        mounted() {
            this.$nextTick(() => {
                $('.app').css({
                    height: $(window).height()
                })
                $('.router-view').height($(window).height() - $('.header').height())
            })
        },
        methods: {},
        computed: {
            transitionName() {
                return this.$store.state.routerFrom + '-' + this.$store.state.routerTo
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
    .login-register-enter-active,
    .login-resetPassword-enter-active,
    .element-login-enter-active,
    .login-home-enter-active,
    .userCenter-myself-enter-active,
    .userCenter-userInfo-enter-active,
    .secondRankList-element-enter-active,
    .home-secondRankList-enter-active,
    .element-addPost-enter-active,
    .userCenter-home-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    /*前进离开*/
    .forward-leave-active,
    .login-register-leave-active,
    .login-resetPassword-leave-active,
    .element-login-leave-active,
    .login-home-leave-active,
    .userCenter-myself-leave-active,
    .userCenter-userInfo-leave-active,
    .secondRankList-element-leave-active,
    .home-secondRankList-leave-active,
    .element-addPost-leave-active,
    .userCenter-home-leave-active {
        animation: slideOutLeft 0.4s;
        position: absolute;
    }

    /*后退进入*/
    .back-enter-active,
    .login-element-enter-active,
    .myself-userCenter-enter-active,
    .userInfo-userCenter-enter-active,
    .element-secondRankList-enter-active,
    .element-home-enter-active,
    .secondRankList-home-enter-active,
    .addPost-element-enter-active,
    .home-userCenter-enter-active {
        animation: slideInLeft 0.4s;
        position: absolute;
    }

    /*后退离开*/
    .back-leave-active,
    .login-element-leave-active,
    .myself-userCenter-leave-active,
    .userInfo-userCenter-leave-active,
    .element-secondRankList-leave-active,
    .element-home-leave-active,
    .secondRankList-home-leave-active,
    .addPost-element-leave-active,
    .home-userCenter-leave-active {
        animation: slideOutRight 0.4s;
        position: absolute;
    }

    .home-element-enter-active {
        animation: scaleToCenter 0.5s;
        position: absolute;
    }
</style>