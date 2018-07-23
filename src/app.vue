<template>
    <div id="app">
        <transition :name="transitionName">
            <router-view></router-view>
        </transition>
        <rcm-login v-if="isLogin"></rcm-login>
    </div>
</template>

<script>
    import {SNI_login} from './Snippet'
    import {SVS_loginByOther, SVS_firstRankList} from './Servers/API'


    export default {
        data() {
            return {
                firstRankList: [],//一级榜单列表
                leftText: '',
                isIndex: true,
                backTarget: '',
                hasNav: true,
                rightText: '',
                direction: '',
                code: ''
            }
        },
        beforeCreate() {

        },
        created() {
            this.init()

        },
        mounted() {
            this.$nextTick(() => {
                $('#app').css({
                    height: $(window).height()
                })
                this.loginByType()
            })

        },
        methods: {
            //第三方登陆
            loginByType() {
                this.code = this.GetQueryString(location.href, 'code')
                if (!this.code) return
                let type = sessionStorage.getItem('loginType')
                let url = sessionStorage.getItem('crtUrl')
                if (!type) return
                SVS_loginByOther(res => {
                    this.$storage.SET_session('X-Auth-Token', res.data.token.access_token)
                    this.$storage.SET_session('userInfo', res.data.user)
                }, err => {
                    return
                }, {
                    type: type,
                    code: this.code
                })
            },
            //获取地址栏code
            GetQueryString(url, name) {
                let index = url.indexOf('?')
                let str = url.substring(index + 1);
                let arr = str.split('&');
                let result = {};
                arr.forEach((item) => {
                    let a = item.split('=');
                    result[a[0]] = a[1];
                })
                return result[name];
            },
            init() {
                //存在登陆信息时自动登陆
                SNI_login(this.$storage.GET_local('TICKET'))
                //获取一级榜单列表
                SVS_firstRankList(res => {
                    this.$storage.SET_session('firstRank', res.data.data)
                    this.firstRankList = res.data.data
                })
            }
        },
        computed: {
            isLogin() {
                return this.$store.getters.GOLOGIN
            },
            transitionName() {
                return this.$store.getters.GET_TRANSITIONTYPE
            }
        },
        watch: {}
    }

</script>

<style scoped lang="less">
    #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .u-center-enter-active, .back-enter-active {
        animation: slideInLeft 0.6s;
        position: absolute;
    }

    .u-center-leave-active, .back-leave-active {
        animation: slideOutRight 0.6s;
        position: absolute;
    }

    .center-home-enter-active, .forward-enter-active {
        animation: slideInRight 0.6s;
        position: absolute;
    }

    .center-home-leave-active, .forward-leave-active {
        animation: slideOutLeft 0.6s;
        position: absolute;
    }

</style>