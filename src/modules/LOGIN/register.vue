<template>
    <div class="register-root">
        <div class="register-body">
            <div class="register-form">
                <div class="phone-number">
                    <input type="tel" placeholder="手机号" v-model="phoneNumber">
                </div>
                <div class="pass-word">
                    <input type="password" placeholder="您的密码" v-model="password">
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
    import {SVS_register, SVS_getYZM, SVS_loginByTel} from '../../Servers/API'
    import {SNI_userInfo} from '../../Snippet'

    export default {
        data() {
            return {
                phoneNumber: '',
                password: '',
                yzm: '',
                yzmText: '获取验证码',
                time: 60,
                timer: null,
                lock: false//验证码发送按钮开关
            }
        },
        mounted() {

        },
        methods: {
            //获取验证码
            getYZM() {
                if (!this.lock) {
                    //开关打开时
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
                        //开关关闭
                        this.timer = setInterval(() => {
                            this.time--;
                            this.yzmText = this.time + 's后重新获取'
                        }, 1000)
                        let params = {};
                        params.mobile = this.phoneNumber
                        SVS_getYZM((res) => {
                            this.$toast({
                                message: '验证码已发送，请注意查收',
                                position: 'middle',
                                duration: 1000
                            })
                        }, (err) => {
                            this.$toast({
                                message: err.message,
                                position: 'middle',
                                duration: 1000
                            })
                        }, params)
                    }
                } else {
                    return
                }

            },
            //登陆逻辑
            login() {
                let loginInfo = {
                    mobile: this.phoneNumber,
                    password: this.MD5(this.password)
                }
                SVS_loginByTel(res => {
                    this.$storage.SET_session('X-Auth-Token', res.data.token.access_token)
                    this.$storage.SET_local('TICKET', loginInfo)
                    this.$store.commit('LOGIN', true)
                    SNI_userInfo()
                }, err => {
                    this.$storage.SET_session('X-Auth-Token', err.data.token.access_token)
                    this.$storage.SET_local('TICKET', loginInfo)
                    this.$store.commit('LOGIN', true)
                    this.$emit('goSetUserInfo', loginInfo)
                }, loginInfo)
            },
            submitRegister() {
                if (this.phoneNumber.length !== 11) {
                    this.$toast({
                        message: '请输入有效手机号码',
                        position: 'middle',
                        duration: 1000
                    })

                } else if (this.yzm.length == 0) {
                    this.$toast({
                        message: '请输入验证码',
                        position: 'middle',
                        duration: 1000
                    })
                }
                else if (this.password.length < 6) {
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
                    let params = {
                        mobile: this.phoneNumber,
                        password: this.MD5(this.password),
                        mobile_code: this.yzm
                    }
                    SVS_register((res) => {
                        //注册成功之后 自动登陆
                        this.login()
                    }, err => {
                        this.$toast({
                            message: err.message,
                            duration: 1000,
                            position: 'middle'
                        })
                    }, params)
                }
            },
        },
        watch: {
            'time'(val) {
                //根据time的值改变开关状态
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
    .register-root {
        width: 100%;
        height: 100%;
        .register-body {
            width: 100%;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            padding: 15px 20px;
            .register-form {
                width: 100%;
                padding: 0px 6px;
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
                        text-align: center;
                        background-color: #FFCECE;
                        height: 100%;
                        border-radius: 4px;
                        color: #FF2C09;
                        font-size: 18px;
                        font-weight: 700;
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