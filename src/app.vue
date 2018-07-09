<template>
    <div class="app">
        <rcm-headers class="header"
                     ref="rcmHeaders"
                     :val="$route.meta"
        ></rcm-headers>
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