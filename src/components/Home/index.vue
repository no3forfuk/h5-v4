<template>
    <transition name="transitionName" mode="out-in">
        <div class="home">
            <rcm-header>
                <i slot="left"
                   style="font-family: iconfont"
                   @click="goUserCenter"
                   class="font-size-20">
                    &#xe609;
                </i>
                <div slot="right" class="color-header">
                    <span>发现</span>
                    <i style="font-family: iconfont" class="font-size-20 ">&#xe952;</i>
                </div>
            </rcm-header>
        </div>
    </transition>
</template>

<script>

    export default {
        data() {
            return {
                popupVisible: true
            }
        },
        methods: {
            goUserCenter() {
                this.$router.push('userCenter')
            }
        }
    }

</script>

<style scoped lang="less">
    .home {
        width: 100%;
    }

    .transitionName-enter-active, transitionName-leave {
        animation: slideInRight 0.5s;
        /*position: absolute;*/
    }

    .transitionName-leave-active {
        animation: slideOutRight 0.5s;
        animation-delay: 0.1s;
    }
</style>