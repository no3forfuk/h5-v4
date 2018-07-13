<template>
    <div class="register">
        <div class="register-body">
            <div class="register-form">
                <div class="phone-number">
                    <input type="tel" placeholder="请输入手机号" v-model="phoneNumber">
                </div>
                <div class="pass-word">
                    <input type="password" placeholder="创建一个登录密码" v-model="password">
                </div>
                <div class="short-msg">
                    <input type="nubmer" placeholder="短信验证码" v-model="yzm">
                    <span @click="getYZM">{{yzmText}}</span>
                </div>
            </div>
            <div class="register-opts">
                <div>
                    <button @click="submitRegister">下一步</button>
                </div>
            </div>
        </div>
        <div class="register-footer">
            <div class="protocol">
                <span>点击[下一步]，表示您已阅读并同意<i>用户使用协议</i></span>
            </div>
        </div>
    </div>
</template>

<script>
    import {registerByPhone, getYZM, firstUpdataUserInfo, loginByPhone} from '../../api/api'

    export default {
        data() {
            return {
                phoneNumber: '',
                password: '',
                yzm: '',
                yzmText: '获取验证码',
                time: 60,
                timer: null,
                lock: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                $('.register').css({
                    height: $(window).height() - 33
                })
            })
        },
        methods: {
            getYZM() {
                if (!this.lock) {
                    this.time = 60
                    if (this.phoneNumber.length !== 11) {
                        this.$toast({
                            message: '请输入有效手机号码',
                            position: 'middle',
                            duration: 1000
                        })

                    } else if (this.password.length < 6) {
                        this.$toast({
                            message: '密码长度不能少于6位',
                            position: 'middle',
                            duration: 1000
                        })
                    } else if (this.password.length > 18) {
                        this.$toast({
                            message: '密码长度不能超过18位',
                            position: 'middle',
                            duration: 1000
                        })
                    } else {
                        this.timer = setInterval(() => {
                            this.time--;
                            this.yzmText = this.time + 's后重新获取'
                        }, 1000)
                        let params = {};
                        params.mobile = this.phoneNumber
                        getYZM(params).then(res => {
                            if (res.status == 200) {
                                if (res.data.status_code == 1) {
                                    this.$toast({
                                        message: '验证码已发送，请注意查收',
                                        position: 'middle',
                                        duration: 1000
                                    })
                                } else {
                                    this.$toast({
                                        message: res.data.message,
                                        position: 'middle',
                                        duration: 1000
                                    })
                                }
                            } else {
                                this.$toast({
                                    message: '网络异常',
                                    position: 'middle',
                                    duration: 1000
                                })
                            }
                        }).catch(err => {
                            this.$toast({
                                message: '网络异常',
                                position: 'middle',
                                duration: 1000
                            })
                        })
                    }
                } else {
                    return
                }

            },
            submitRegister() {
                let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (this.phoneNumber.length !== 11) {
                    this.$toast({
                        message: '请输入有效手机号码',
                        position: 'middle',
                        duration: 1000
                    })
                } else if (!reg.test(this.phoneNumber)) {
                    this.$toast({
                        message: '请输入有效手机号码',
                        position: 'middle',
                        duration: 1000
                    })
                } else if (this.password.length < 6) {
                    this.$toast({
                        message: '密码长度不能少于6位',
                        position: 'middle',
                        duration: 1000
                    })
                } else if (this.password.length > 18) {
                    this.$toast({
                        message: '密码长度不能超过18位',
                        position: 'middle',
                        duration: 1000
                    })
                } else if (this.yzm.length == 0) {
                    this.$toast({
                        message: '请输入验证码',
                        position: 'middle',
                        duration: 1000
                    })
                } else {
                    let params = {}
                    params.mobile = this.phoneNumber
                    params.password = this.password
                    params.mobile_code = this.yzm
                    registerByPhone(params).then(res => {
                        if (res.status == 200) {
                            if (res.data.status_code == 1) {
                                this.$toast({
                                    message: '注册成功',
                                    position: 'middle',
                                    duration: 1000
                                })
                                loginByPhone({
                                    mobile: this.phoneNumber,
                                    password: this.MD5(this.password)
                                }).then(res => {
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
                                                        this.$router.replace({
                                                            name: this.routerFrom,
                                                            query: this.$route.query
                                                        })
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
                                    this.$toast({
                                        message: '网络异常',
                                        position: 'middle',
                                        duration: 1000
                                    })
                                })
                            } else {
                                this.$toast({
                                    message: res.data.message,
                                    position: 'middle',
                                    duration: 1000
                                })
                            }
                        } else {
                            this.$toast({
                                message: '网络异常',
                                position: 'middle',
                                duration: 1000
                            })
                        }
                    }).catch(err => {
                        this.$toast({
                            message: '网络异常',
                            position: 'middle',
                            duration: 1000
                        })
                    })
                }
            }
        },
        watch: {
            'time'(val) {
                if (0 < val < 60) {
                    this.lock = true
                }
                if (0 > val) {
                    this.yzmText = '重新获取';
                    this.lock = false
                    window.clearInterval(this.timer)
                    this.timer = null
                }
            }
        }
    }

</script>

<style scoped lang="less">
    .register {
        width: 100%;
        overflow: hidden;
        position: relative;
        .register-body {
            width: 100%;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            padding: 0 10px;
            .register-form {
                width: 100%;
                padding: 0px 6px;
                margin-top: 40px;
                border-radius: 10px;
                border: 1px solid #DEDEDE;
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
                .short-msg {
                    width: 100%;
                    height: 49px;
                    padding: 6px 0;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    align-items: center;

                    input {
                        display: inline-block;
                        height: 100%;
                        -webkit-appearance: none;
                        border: 0 none;
                    }
                    span:nth-child(2) {
                        white-space: nowrap;
                        text-align: center;
                        margin-right: 20px;
                    }
                }
            }
            .register-opts {
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
            }

        }
        .register-footer {
            width: 100%;
            position: absolute;
            bottom: 30px;
            left: 0;
            text-align: center;
            color: #8B8B8B;
            .protocol {
                text-align: center;
                span {
                    i {
                        text-decoration: underline;
                    }
                }
            }
        }
    }
</style>