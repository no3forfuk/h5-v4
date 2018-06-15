<template>
    <transition name="transitionName" mode="out-in">
        <div class="home">
            <rcm-header>
                <i slot="left"
                   style="font-family: iconfont;"
                   @click="goUserCenter"
                   class="font-size-28">
                    &#xe609;
                </i>
                <div slot="right" class="color-header" @click="findMore">
                    <span class="font-size-16">发现</span>
                    <i style="font-family: iconfont" class="font-size-20 ">&#xe952;</i>
                </div>
            </rcm-header>
            <finder class="finder"></finder>
        </div>
    </transition>
</template>

<script>
    import finder from './headerFind'

    export default {
        data() {
            return {
                popupVisible: true
            }
        },
        methods: {
            goUserCenter() {
                this.$router.push('userCenter')
            },
            findMore() {
                $('.finder').css({
                    height: 0
                })
            }
        },
        components: {
            finder
        }
    }

</script>

<style scoped lang="less">
    .home {
        width: 100%;
    }

    .transitionName-enter-active, transitionName-leave {
        animation: slideInRight 0.2s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
    }

    .transitionName-leave-active {
        animation: slideOutRight 0.2s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;

    }
</style>