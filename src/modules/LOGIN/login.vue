<template>
    <div class="login-root">
        <div class="login-body">
            <div class="login-form">
                <div class="phone-number">
                    <input type="tel" placeholder="手机号" v-model="phone">
                </div>
                <div class="pass-word">
                    <input type="password" placeholder="密码" v-model="pwd">
                </div>
            </div>
        </div>
        <div class="login-opts">
            <div>
                <button @click="loginByMobile">
                    登入
                </button>
            </div>
            <div>
                <span @click="$emit('goRegister')">注册RCM</span>
                <span></span>
                <span @click="$emit('goResetPwd')">忘记密码</span>
            </div>
        </div>
        <div class="login-tpye">
            <div class="wechat" @click="loginByOther('weixin')">
                <span><i>微信登录</i><i>微信登录</i></span>
            </div>
            <span></span>
            <div class="tx-qq" @click="loginByOther('qq')" id="qqLoginBtn">
                <span><i>QQ登录</i><i>QQ登录</i></span>
            </div>
        </div>
    </div>
</template>

<script>
    import {loginByPhone} from '../../api/api'

    export default {
        data() {
            return {
                phone: '',
                pwd: '',
                type: '',
                code: ''

            }
        },
        mounted() {
            this.$nextTick(() => {

            })
        },
        methods: {
            loginByMobile() {
                let params = {
                    mobile: this.phone,
                    password: this.MD5(this.pwd)
                }
                loginByPhone(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            sessionStorage.setItem('X-Auth-Token', res.data.data.token.access_token)
                            this.$store.commit('LOGIN', true)
                            this.$store.commit('GOLOGIN', false)
                            localStorage.setItem('TICKET', JSON.stringify({
                                mobile: this.phone,
                                password: this.pwd
                            }))
                            this.$toast({
                                message: '登录成功',
                                duration: 1000,
                                position: 'middle'
                            })
                        } else if (res.data.status_code == 11) {
                            sessionStorage.setItem('X-Auth-Token', res.data.data.token.access_token)
                            this.$store.commit('LOGIN', true)
                            localStorage.setItem('TICKET', JSON.stringify({
                                mobile: this.phone,
                                password: this.pwd
                            }))
                            this.$emit('goSetInfo', params)
                        } else {
                            this.$toast({
                                message: res.data.message,
                                duration: 1000,
                                position: 'middle'
                            })
                        }
                    } else {
                        return
                    }
                }).catch(err => {
                    throw err
                })
            },
            loginByOther(type) {
                this.type = type
                this.$store.commit('SETLOGINTYPE', type)
                sessionStorage.setItem('loginType', type)
                sessionStorage.setItem('crtUrl', location.href)
                if (this.type == 'weixin') {
                    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx50d671a0a75e1115&redirect_uri=http://test.bantangtv.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                }
                if (this.type == 'qq') {
                    // console.log('b');
                    // console.log(QC);
                    // let opts = {
                    //     appId: '101476497',
                    //     redirectURI: 'http://test.bantangtv.com/#/hot'
                    // }
                    // QC.Login.showPopup(opts, window)
                    location.href = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=10147649&redirect_uri=http://test.bantangtv.com/#/hot&state=rcm`
                }
            }
        },
        watch: {}
    }

</script>

<style scoped lang="less">
    .login-root {
        width: 100%;
        height: 100%;
        background-color: #fff;
        .login-body {
            width: 100%;
            padding: 15px 20px 25px 20px;
            .login-form {
                width: 100%;
                padding: 0px 6px;
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
        }

        .login-opts {
            width: 100%;
            padding: 0 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            height: 41px;
            div:nth-child(1) {
                flex: 0.46;
                width: 100%;
                button {
                    width: 100%;
                    border: 0 none;
                    background-color: #FFCECE;
                    height: 100%;
                    border-radius: 4px;
                    color: #FF2C09;
                    text-align: center;
                    font-weight: bold;
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
                padding-left: 40px;
                span {
                    border-bottom: 10px solid #5CC248;
                    position: relative;
                    i:nth-child(1) {
                        position: absolute;
                        bottom: -8px;
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
                height: 16px;
                border-radius: 1px;
                background-color: #ccc;
                align-self: center;
            }
            .tx-qq {
                flex: 0.49;
                text-align: center;
                padding-right: 40px;
                span {
                    border-bottom: 10px solid #2CABF2;
                    position: relative;
                    i:nth-child(1) {
                        position: absolute;
                        bottom: -8px;
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

</style>