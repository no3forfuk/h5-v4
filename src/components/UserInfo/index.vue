<template>
    <transition name="transitionName" mode="in-out">
        <div class="user-info">
            <rcm-header :routerTo="'userCenter'">
                <icon :value="'&#xe600;'"
                      class="font-size-20"
                      @click="goBack"
                      slot="back"></icon>
                <span slot="text">我的</span>
            </rcm-header>
            <edit-pic :value="userpic"></edit-pic>
            <edit-username @click="editStart" :value="username"></edit-username>
            <edit-userfav @click="editStart" :value="userfav"></edit-userfav>
            <edit-usersign @click="editStart" :value="usersign"></edit-usersign>
            <div class="belt"></div>
            <div class="confirm">完 成</div>
            <div class="belt"></div>
            <div class="footer"><p>用爱喂食挚爱，那么TA将GO BIG</p></div>
            <transition name="editModal">
                <div class="modal-edit" v-show="editActive">
                    <rcm-header>
                    <span slot="text"
                          class="font-size-16"
                          @click="editCancel"
                          style="color:#FF2C09;">取消</span>
                        <span slot="right"
                              class="font-size-16"
                              @click="editComplete"
                              style="color:#FF2C09;">完成</span>
                    </rcm-header>
                    <div class="modal-body">
                        <div class="input-box">
                            <input type="text"
                                   placeholder="有趣的昵称很重要哦！"
                                   v-model="username"
                                   ref="username"
                                   v-show="editItem == 'username'">
                            <input type="text"
                                   placeholder="输入自己的个性签名"
                                   v-model="usersign"
                                   v-show="editItem == 'usersign'">
                            <input type="text"
                                   v-model="userfav"
                                   disabled
                                   placeholder="选择一个自己的擅长领域"
                                   v-show="editItem == 'userfav'">
                        </div>
                        <scroll-select></scroll-select>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    import editPic from './editPic'
    import editUsername from './editUsername'
    import editUserfav from './editUserfav'
    import editUsersign from './editUsersign'
    import scrollSelect from './scrollSelect'

    export default {
        data() {
            return {
                editActive: false,
                editItem: '',
                username: '修改昵称',
                usersign: '修改个性签名',
                userpic: '修改头像',
                userfav: '修改擅长领域',
                temp: {}
            }
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETROUTERFROM', from.name)
            this.$store.commit('SETROUTERTO', to.name)
            next()
        },
        methods: {
            editStart(msg) {
                this.editItem = msg;
                this.editActive = true;
                this.temp = {[msg]: this[msg]};
                this[msg] = '';
            },
            editComplete() {
                this.editActive = false;
            },
            editCancel() {
                this.editActive = false;
                for (let k in this.temp) {
                    this[k] = this.temp[k]
                }
            },
            goBack() {
                this.$router.back()
            }
        },
        mounted() {

        },
        components: {
            editPic,
            editUsername,
            editUserfav,
            editUsersign,
            scrollSelect
        }
    }

</script>

<style scoped lang="less">
    .user-info {
        width: 100%;
    }

    .modal-edit {
        width: 100%;
        height: 100%;
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        padding: 10px;
        .modal-body {
            padding: 10px;
            width: 100%;
            .input-box {
                width: 100%;
                border: 1px solid #C8C7CD;
                input {
                    width: 100%;
                    height: 32px;
                    border: 0 none;
                    color: #000;
                    opacity: 1;
                    background-color: #fff;
                }
            }
        }

    }

    .belt {
        width: 100%;
        height: 7px;
        background-color: #C8C7CD;
    }

    .footer {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        p {
            font-size: 12px;
            color: #D9D9D9;
            margin: 0 auto;
        }
    }

    .confirm {
        width: 100%;
        display: flex;
        justify-content: center;
        color: #FF0000;
        font-size: 20px;
        line-height: 24px;
        padding: 10px;
    }

    .transitionName-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    .transitionName-leave-active {
        animation: slideOutLeft 0.4s;
        position: absolute;
    }

    .editModal-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    .editModal-leave-active {
        animation: slideOutRight 0.4s;
        position: absolute;
    }
</style>