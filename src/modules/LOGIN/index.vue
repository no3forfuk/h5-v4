<template>
    <!--<transition name="login">-->
    <!--<div class="login-mark">-->
    <!--<div class="login-mark-back" @click="close"></div>-->
    <div class="login-module">
        <div class="login-header">
            <icon :value="'&#xe6b5;'"
                  @click="close"
                  style="color:#ABABAB;font-size:16px;font-weight: 700"></icon>
        </div>
        <div class="login-title">
            <p v-text="loginTitle"></p>
        </div>
        <div class="login-module-body">
            <transition name="active-body">
                <login v-if="step == 1"
                       @goRegister="goRegister"
                       @goResetPwd="goReset"
                       @goSetInfo="goSetInfo"></login>
                <register v-if="step == 2" @goSetUserInfo="goSetInfo"></register>
                <set-info v-if="step == 3" :value="loginInfo"></set-info>
                <reset-pwd v-if="step == 4"></reset-pwd>
            </transition>
        </div>
    </div>
    <!--</div>-->
    <!--</transition>-->
</template>

<script>
    import login from './login'
    import register from './register'
    import setInfo from './setInfo'
    import resetPwd from './resetPassword'

    export default {
        data() {
            return {
                step: 1,
                loginInfo: {}
            }
        },
        mounted() {
            this.$nextTick(() => {
            })
        },
        methods: {
            close() {
                this.$store.commit('GOLOGIN', false)
            },
            goRegister() {
                this.step = 2
            },
            goSetInfo(val) {
                this.loginInfo = val
                this.step = 3
            },
            goReset() {
                this.step = 4
            }
        },
        computed: {
            loginTitle() {
                if (this.step == 1) {
                    return '欢迎回到RCM'
                }
                if (this.step == 2) {
                    return '加入RCM'
                }
                if (this.step == 3) {
                    return '设置个人资料'
                }
                if (this.step == 4) {
                    return '重置密码'
                }
            }
        },
        components: {
            register,
            login,
            setInfo,
            resetPwd
        }
    }

</script>

<style scoped lang="less">

    .login-module {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, .2);
        background-color: #fff;
        z-index: 10;
        .login-header {
            padding: 14px;
            width: 100%;
            height: 46px;
            display: flex;
            flex-direction: row;
            justify-content: left;
        }
        .login-title {
            height: 40px;
            padding: 0 20px;
            font-weight: 400;
            font-size: 30px;
        }
        .login-module-body {
            width: 100%;
        }
    }

    .active-body-enter-active {
        position: absolute;
        animation: slideInRight 0.6s;
    }

    .active-body-leave-active {
        position: absolute;
        animation: slideOutLeft 0.6s;
    }

    .login-enter-active {
        position: absolute;
        animation: slideInUp 0.6s;
    }

    .login-leave-active {
        position: absolute;
        animation: slideOutDown 0.6s;
    }
</style>