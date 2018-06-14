<template>
    <transition name="transitionName" mode="in-out">
        <div>
            <rcm-header>
                <div slot="left" @click="goPrve">
                    <i style="font-family: iconfont">&#xe600;</i><span>我的</span>
                </div>
            </rcm-header>
            <banner></banner>
            <tabs></tabs>
            <router-view></router-view>
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
    .transitionName-enter-active {
        animation: slideInRight 0.5s;
    }

    .transitionName-leave-active {
        animation: slideOutRight 0.5s;
        animation-delay: 0.1s;
    }
</style>