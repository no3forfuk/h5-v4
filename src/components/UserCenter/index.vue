<template>
    <transition name="transitionName" mode="out-in">
        <div class="user-center">
            <rcm-header>
                <div slot="left" @click="goHome">
                    <i style="font-family: iconfont">&#xe600;</i><span>首页</span>
                </div>
            </rcm-header>
            <card></card>
            <opts></opts>
            <footer class="footer">为了保证RCM榜单数据的客观真实，需要您的支持</footer>
        </div>
    </transition>
</template>

<script>
    import Card from './idCard'
    import opts from './options'

    export default {
        data() {
            return {
                direction: ''
            }
        },
        methods: {
            go() {
                this.direction = 'home'
            }
        },
        methods: {
            goHome() {
                this.$router.push({name: 'home'})
            }
        },
        computed: {},
        components: {
            card: Card,
            opts
        }
    }

</script>

<style scoped lang="less">
    .user-center {
        width: 100%;
    }

    .footer {
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 12px;
        color: #C8C7CD;
        line-height: 40px;
    }

    .transitionName-enter-active {
        animation: slideInLeft 0.5s;
    }

    .transitionName-leave-active {
        animation: slideOutLeft 0.5s;
        animation-delay: 0.1s;
    }

</style>