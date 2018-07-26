<template>
    <div class="reset-root">
        <div class="register-body">
            <div class="register-form">
                <div class="phone-number">
                    <input type="tel"
                           placeholder="手机号"
                           @focus="$count(['Reset_Input_Tel',1])"
                           v-model="phoneNumber">
                </div>
                <div class="short-msg">
                    <input type="nubmer"
                           @focus="$count(['Reset_Input_YZM',1])"
                           placeholder="输入短信验证码"
                           v-model="yzm">
                    <span @click="getYZM">{{yzmText}}</span>
                </div>
                <div class="pass-word">
                    <input type="password"
                           placeholder="设置新的密码"
                           v-model="password">
                </div>
            </div>
            <div class="register-opts">
                <div>
                    <button @click="submitReSet">下一步</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getYZM, resetPwd} from '../../api/api'

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
        methods: {
            getYZM() {
                if (!this.lock) {
                    $count(['Reset_Get_YZM', 1])
                    this.time = 60
                    if (this.phoneNumber.length !== 11) {
                        this.$toast({
                            message: '请输入有效手机号码',
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
            submitReSet() {
                let params = {
                    mobile: this.phoneNumber,
                    password: this.password,
                    mobile_code: this.yzm
                }
                if (this.yzm.length == 0) {
                    this.$toast({
                        message: '请输入有效的短信验证码',
                        position: 'middle',
                        duration: 1000
                    })
                    return
                }
                if (this.phoneNumber.length !== 11) {
                    this.$toast({
                        message: '请输入有效手机号码',
                        position: 'middle',
                        duration: 1000
                    })
                    return
                }
                this.$count(['Reset_Next', 1])
                resetPwd(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.$toast({
                                message: res.data.message,
                                duration: 1000,
                                position: 'middle'
                            })
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
    .reset-root {
        width: 100%;
        height: 100%;
        background-color: #fff;
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
                    border-bottom: 1px solid #DEDEDE;
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
    }
</style>