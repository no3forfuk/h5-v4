<template>
    <div class="app">
        <rcm-headers class="header"
                     ref="rcmHeaders"
                     :val="$route.meta"
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
    import {SNIPPET_LOGIN} from './Snippet'
    import {getLoginCode} from './api/api'

    export default {
        data() {
            return {
                leftText: '',
                isIndex: true,
                backTarget: '',
                hasNav: true,
                rightText: '',
                direction: '',
                code: ''
            }
        },
        created() {

            this.$store.commit('SETDIRECTION', 'forward')
            //是否登录过
            if (localStorage.getItem('TICKET')) {
                const loginParams = JSON.parse(localStorage.getItem('TICKET'))
                let data = {
                    mobile: loginParams.mobile,
                    password: this.MD5(loginParams.password)
                }
                SNIPPET_LOGIN(data)
            }
            //是否登陆
        },
        mounted() {
            this.$nextTick(() => {
                $('.app').css({
                    height: $(window).height()
                })
                this.loginByType()
                if (this.code) {
                    // getLoginCode('weixin', this.code).then(res => {
                    //     if (res.status == 200 && res.data.status_code == 1) {
                    //         console.log(res);
                    //     } else {
                    //         return
                    //     }
                    // }).catch(err => {
                    //     throw err
                    // })
                } else {

                }
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
            pageScroll() {

            },
            loginByType() {
                this.code = this.GetQueryString(location.href, 'code')
                if (!this.code) return
                let type = sessionStorage.getItem('loginType')
                let url = sessionStorage.getItem('crtUrl')
                if (!type) return
                // getLoginCode(type, this.code).then(res => {
                //     if (res.status == 200 && res.data.status_code == 1) {
                //         sessionStorage.setItem('X-Auth-Token', res.data.data.token.access_token)
                //         sessionStorage.setItem('userInfo', JSON.stringify(res.data.data.user))
                //         location.href = url
                //     } else {
                //         return
                //     }
                // }).catch(err => {
                //     throw err
                // })
            },
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