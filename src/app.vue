<template>
    <div class="app">
        <transition :name="transitionName">
            <router-view class="router-view"></router-view>
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
        height: 100%;
        background-color: #fff;
    }

    .forward-enter-active, .forward-userCenter-home-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    .forward-leave-active, .forward-userCenter-home-leave-active {
        animation: slideOutLeft 0.4s;
        position: absolute;
    }

    .back-enter-active, .forward-home-userCenter-enter-active {
        animation: slideInLeft 0.4s;
        position: absolute;
    }

    .back-leave-active, .forward-home-userCenter-leave-active {
        animation: slideOutRight 0.4s;
        position: absolute;
    }
</style>