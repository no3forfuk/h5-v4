<template>
    <transition name="transitionName" mode="in-out">
        <div class="myself">
            <rcm-header>
                <div slot="left" @click="goPrve">
                    <i style="font-family: iconfont">&#xe600;</i><span>我的</span>
                </div>
            </rcm-header>
            <banner></banner>
            <tabs></tabs>
        </div>
    </transition>
</template>

<script>
    import banner from './banner'
    import tabs from './tabs'

    export default {
        data() {
            return {}
        },
        methods: {
            goPrve() {
                this.$router.replace({name: 'userCenter'})
            }
        },
        components: {
            banner,
            tabs
        }
    }

</script>

<style scoped lang="less">
    .myself {
        background-color: #fff;
    }

    .transitionName-enter-active {
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