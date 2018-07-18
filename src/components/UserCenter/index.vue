<template>
    <div class="user-center">
        <div class="user-body">
            <card :value="userData" v-if="userData"></card>
            <opts></opts>
            <footer class="footer">为了保证RCM榜单数据的客观真实，需要您的支持</footer>
        </div>
    </div>
</template>

<script>
    import Card from './idCard'
    import opts from './options'
    import {SVS_userInfo} from '../../Servers/API'
    import Storage from '../../Servers/Storage'
    import {SNI_userInfo} from '../../Snippet'

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

        },
        mounted() {
            this.$nextTick(() => {
                $('.user-center').height($(window).height())
                $('.user-body').height($(window).height() - 36)
            })
        },
        beforeRouteEnter(to, from, next) {
            let userInfo = Storage.GET_session('userInfo')
            if (userInfo) {
                next(vm => {
                    vm.userData = userInfo
                })
            } else {
                SVS_userInfo(res => {
                    next(vm => {
                        vm.userData = res.data
                        Storage.SET_session('userInfo', res.data)
                    })
                }, err => {
                    throw err
                })
            }
        },
        beforeRouteLeave(to, from, next) {
            next()
        },
        beforeDestroy() {
            this.$store.commit('SETOPENUSERCENTER', true)
        },
        methods: {},
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