<template>
    <div class="user-center">
        <div class="user-body">
            <card :value="userData"></card>
            <opts></opts>
            <footer class="footer">为了保证RCM榜单数据的客观真实，需要您的支持</footer>
        </div>
    </div>
</template>

<script>
    import Card from './idCard'
    import opts from './options'
    import {getUserInfo} from '../../api/api'

    export default {
        data() {
            return {
                direction: '',
                userData: ''
            }
        },
        methods: {
            go() {
                this.direction = 'home'
            }
        },
        created() {
            getUserInfo().then(res => {
                this.userData = res.data.data
                let str = JSON.stringify(res.data.data)
                sessionStorage.setItem('userInfo', str)
            }).catch(err => {
                throw err
            })
        },
        mounted() {
            this.$nextTick(() => {
                $('.user-center').height($(window).height())
                $('.user-body').height($(window).height() - 29)
            })
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETOPENUSERCENTER', false)
            this.$store.commit('SETDIRECTION', 'forward')
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