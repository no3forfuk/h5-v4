<template>
    <div class="user-center">
        <rcm-header>
            <div slot="back" @click="goHome">
                <i style="font-family: iconfont">&#xe600;</i><span>首页</span>
            </div>
        </rcm-header>
        <div class="user-body">
            <card></card>
            <opts></opts>
            <footer class="footer">为了保证RCM榜单数据的客观真实，需要您的支持</footer>
        </div>
    </div>
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
        mounted() {
            this.$nextTick(() => {
                $('.user-center').height($(window).height())
                $('.user-body').height($(window).height() - 29)
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETROUTERFROM', from.name)
            this.$store.commit('SETROUTERTO', to.name)
            next()
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
        background-color: #fff;
    }

    .user-body {
        width: 100%;
        overflow-y: auto;
    }

    .footer {
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 12px;
        color: #C8C7CD;
        line-height: 40px;
    }


</style>