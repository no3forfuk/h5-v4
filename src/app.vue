<template>
    <div class="app">
        <rcm-headers class="header"
                     ref="rcmHeaders"
                     :val="$route.meta"
                     :firstRank="firstRankList"
        ></rcm-headers>
        <!--<div class="app-mask"></div>-->
        <div class="app-body" :style="computerHeight">
            <transition :name="transitionName">
                <router-view class="router-view"></router-view>
            </transition>
        </div>
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
            this.$store.commit('SETDIRECTION', 'forward')
            this.init()
        },
        mounted() {
            this.$nextTick(() => {
                $('.app').css({
                    height: $(window).height()
                })
                this.loginByType()
            })
        },
        updated() {
            this.$nextTick(() => {
                // this.$store.commit('SETDIRECTION', 'forward')
                setTimeout(() => {
                    this.$store.commit('SETDIRECTION', 'forward')
                }, 1000)
            })
        },
        beforeDestroy() {

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
            computerHeight() {
                if (!this.$store.getters.TOPNAVSTATE) {
                    return {
                        height: $(window).height() - 33 + 'px'
                    }
                } else {
                    return {
                        height: $(window).height() - 68 + 'px'
                    }
                }
            },
            isLogin() {
                return this.$store.getters.GOLOGIN
            },
            transitionName() {
                if (this.$store.state.openUserCenter) {
                    return 'openuser'
                } else {
                    return this.$store.state.direction
                }
            }
        },
        watch: {
            '$route'(n, o) {

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
        .app-body {
            width: 100%;
            overflow-x: hidden;
            overflow-y: hidden;
            transition: all 0.3s;
        }
        .app-mask {
            width: 100%;
            height: 20px;
            position: absolute;
            left: 0;
            background: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
        }
    }

    /*前进进入*/
    .forward-enter-active,
    .userCenter-home-enter-active {
        animation: slideInRight 0.6s;
        position: absolute;
    }

    /*前进离开*/
    .forward-leave-active,
    .userCenter-home-leave-active {
        animation: slideOutLeft 0.6s;
        position: absolute;
    }

    /*后退进入*/
    .back-enter-active,
    .openuser-enter-active,
    .home-userCenter-enter-active {
        animation: slideInLeft 0.6s;
        position: absolute;
    }

    /*后退离开*/
    .back-leave-active,
    .openuser-leave-active,
    .home-userCenter-leave-active {
        animation: slideOutRight 0.6s;
        position: absolute;
    }

    .home-element-enter-active {
        animation: scaleToCenter 0.6s;
        position: absolute;
    }
</style>