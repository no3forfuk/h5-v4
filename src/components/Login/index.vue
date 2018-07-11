<template>
    <div class="login">
        <p style="font-size: 22px;line-height: 24px;padding: 10px">欢迎来到RCM</p>
        <div class="login-body">
            <div class="login-form">
                <div class="phone-number">
                    <input type="tel" placeholder="手机号" v-model="mobile">
                </div>
                <div class="pass-word">
                    <input type="password" placeholder="密码" v-model="password">
                </div>
            </div>
            <div class="login-opts">
                <div>
                    <button @click="loginByMobile">登入</button>
                </div>
                <div>
                    <span @click="goRegiser">注册RCM</span>
                    <span></span>
                    <span @click="resetPassword">忘记密码</span>
                </div>
            </div>
            <div class="login-tpye">
                <div class="wechat">
                    <span @click="loginByOther('weixin')"><i>微信登录</i><i>微信登录</i></span>
                </div>
                <span></span>
                <div class="tx-qq">
                    <span><i>QQ登录</i><i>QQ登录</i></span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {
        loginByPhone,
        setUserInfoAtFirst,
        getLoginCode,
        loginByOther,
        getUserInfo,
        firstUpdataUserInfo
    } from '../../api/api'

    export default {
        data() {
            return {
                mobile: '',
                password: '',
                code: '',
                routerFrom: ''
            }
        },
        mounted() {
            this.$nextTick(() => {
                $('.login').css({
                    height: $(window).height()
                })
                this.$store.commit('SETDIRECTION', 'forward')
            })
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.routerFrom = from.name
            })
        },
        beforeRouteLeave(to, from, next) {
            next()
        },
        methods: {
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
            loginByMobile() {
                if (this.mobile.length != 11) {
                    this.$toast({
                        message: '请输入有效的手机号码',
                        duration: 1000,
                        position: 'middle'
                    })
                    return
                } else if (this.password.length < 6) {
                    this.$toast({
                        message: '请输入有效的密码',
                        duration: 1000,
                        position: 'middle'
                    })
                } else if (this.password.length > 18) {
                    this.$toast({
                        message: '请输入有效的密码',
                        duration: 1000,
                        position: 'middle'
                    })
                } else {
                    let params = {}
                    params.mobile = this.mobile
                    params.password = this.MD5(this.password)
                    loginByPhone(params).then(res => {
                        if (res.status == 200) {
                            if (res.data.status_code == 1) {
                                sessionStorage.setItem('X-Auth-Token', res.data.data.token.access_token)
                                this.$store.commit('LOGIN')
                                if (this.routerFrom) {
                                    this.$router.replace({name: this.routerFrom, query: this.$route.query})
                                } else {
                                    this.$router.replace({name: 'hot'})
                                }
                                return
                            }
                            if (res.data.status_code == 11) {
                                sessionStorage.setItem('X-Auth-Token', res.data.data.token.access_token)
                                this.$store.commit('LOGIN')
                                firstUpdataUserInfo({
                                    name: '用户' + parseInt(new Date() / 1111)
                                }).then(res => {
                                    if (res.status == 200 && res.data.status_code == 1) {
                                        if (this.routerFrom) {
                                            this.$router.replace({name: this.routerFrom, query: this.$route.query})
                                        } else {
                                            this.$router.replace({name: 'hot'})
                                        }
                                    }
                                }).catch(err => {
                                    throw err
                                })
                                return
                            }
                            if (res.data.status_code == 0) {
                                this.$toast({
                                    message: res.data.message,
                                    duration: 1000,
                                    position: 'middle'
                                })
                            }
                        } else {
                            this.$toast({
                                message: '网络异常',
                                duration: 1000,
                                position: 'middle'
                            })
                        }
                    }).catch(err => {
                        throw err
                    })
                }
            },
            goRegiser() {
                this.$router.push({name: 'register'})
            },
            resetPassword() {
                this.$router.push({name: 'resetPassword'})
            },
            loginByOther(type) {
                location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa32e016674b63fbb&redirect_uri=http://test.bantangtv.com/#/login&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
            }
        },
        watch: {
            'location.href'(n, o) {
                this.code = this.GetQueryString(n, 'code');
                let params = {}
                params.type = 'weixin';
                params.code = this.code
                loginByOther(params).then(res => {

                }).catch(err => {
                    throw err
                })
            }
        }
    }

</script>

<style scoped lang="less">

    .login {
        width: 100%;
        overflow: hidden;
        position: relative;
        .login-body {
            width: 100%;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            padding: 0 10px;
            .login-form {
                width: 100%;
                padding: 0px 6px;
                margin-top: 40px;
                border-radius: 10px;
                border: 1px solid #DEDEDE;
                overflow: hidden;
                .phone-number {
                    width: 100%;
                    height: 49px;
                    border-bottom: 1px solid #DEDEDE;
                    padding: 6px 0;
                    input {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        -webkit-appearance: none;
                        border: 0 none;
                    }
                }
                .pass-word {
                    width: 100%;
                    height: 49px;
                    padding: 6px 0;
                    input {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        -webkit-appearance: none;
                        border: 0 none;
                    }
                }
            }
            .login-opts {
                width: 100%;
                margin-top: 25px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                height: 37px;
                div:nth-child(1) {
                    flex: 0.46;
                    width: 100%;
                    button {
                        width: 100%;
                        border: 0 none;
                        background-color: #F0882C;
                        height: 100%;
                        border-radius: 6px;
                        color: #fff;
                        font-size: 18px;
                    }
                }
                div:nth-child(2) {
                    flex: 0.46;
                    display: inline-flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    align-items: center;
                    span:nth-child(1) {
                        flex: 0.49;
                        white-space: nowrap;
                        line-height: 37px;
                        text-align: center;
                        font-weight: 700;
                    }
                    span:nth-child(2) {
                        flex: 0 0 1px;
                        display: block;
                        height: 12px;
                        background-color: #ccc;
                    }
                    span:nth-child(3) {
                        flex: 0.49;
                        white-space: nowrap;
                        line-height: 37px;
                        text-align: center;
                        font-weight: 700;
                        color: #D3D3D3;
                    }
                }
            }
            .login-tpye {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                flex-wrap: nowrap;
                padding: 0 10px;
                height: 40px;
                position: absolute;
                bottom: 40px;
                left: 0;
                right: 0;
                justify-content: space-between;
                .wechat {
                    flex: 0.49;
                    text-align: center;
                    span {
                        border-bottom: 10px solid #5CC248;
                        position: relative;
                        i:nth-child(1) {
                            position: absolute;
                            bottom: -10px;
                            left: 0;
                            color: #8B8B8B;
                            font-weight: 700;
                        }
                        i:nth-child(2) {
                            opacity: 0;
                        }
                    }
                }
                span:nth-child(2) {
                    flex: 0 0 2px;
                    height: 20px;
                    border-radius: 1px;
                    background-color: #ccc;
                    align-self: center;
                }
                .tx-qq {
                    flex: 0.49;
                    text-align: center;
                    span {
                        border-bottom: 10px solid #2CABF2;
                        position: relative;
                        i:nth-child(1) {
                            position: absolute;
                            bottom: -10px;
                            white-space: nowrap;
                            left: 0;
                            color: #8B8B8B;
                            font-weight: 700;
                        }
                        i:nth-child(2) {
                            opacity: 0;
                        }
                    }
                }
            }
        }

    }
</style>