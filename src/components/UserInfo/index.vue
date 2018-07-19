<template>
    <transition name="transitionName" mode="in-out">
        <div class="user-info">
            <edit-pic :img="userInfo.avatar" @editConfirm="submitEdit"></edit-pic>
            <!--<edit-username @click="editStart" :value="userInfo.name"></edit-username>-->
            <edit-userfav @click="editFavorite" :value="fav"></edit-userfav>
            <edit-usersign @click="editSign" :value="signature"></edit-usersign>
            <div class="belt"></div>
            <div class="confirm" @click="logOut">退出登陆</div>
            <div class="belt"></div>
            <div class="footer"><p>用爱喂食挚爱，那么TA将GO BIG</p></div>
            <transition name="editModal">
                <div class="modal-edit" v-if="editActive">
                    <rcm-header>
                    <span slot="back"
                          class="font-size-16"
                          @click="editCancel"
                          style="color:#FF2C09;">取消</span>
                        <span slot="right"
                              class="font-size-16"
                              @click="submitEdit"
                              style="color:#FF2C09;">完成</span>
                    </rcm-header>
                    <div class="modal-body">
                        <div class="input-box">
                            <!--<input type="text"-->
                            <!--placeholder="有趣的昵称很重要哦！"-->
                            <!--v-model="username"-->
                            <!--ref="username"-->
                            <!--v-show="editItem == 'username'">-->
                            <input type="text"
                                   placeholder="输入自己的个性签名"
                                   v-model="signature"
                                   v-show="editType == 'sign'">
                            <input type="text"
                                   v-model="fav"
                                   disabled
                                   placeholder="选择一个自己的擅长领域"
                                   v-show="editType == 'fav'">
                        </div>
                        <scroll-select v-if="editType == 'fav'" @change="selectFav"></scroll-select>
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
    import {editUserInfo, getUserInfo} from '../../api/api'
    import {uploadFile, timeFormat} from '../../utils'
    import {SNI_userInfo} from '../../Snippet'

    export default {
        data() {
            return {
                editActive: false,
                userInfo: {},
                editType: 'pic',
                fav: '',
                expert: '',
                signature: ''

            }
        },
        created() {

        },
        beforeRouteEnter(to, from, next) {
            if (sessionStorage.getItem('userInfo')) {
                next(vm => {
                    let userObj = JSON.parse(sessionStorage.getItem('userInfo'))
                    vm.userInfo = userObj;
                })
            } else {
                getUserInfo().then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        next(vm => {
                            let userInfoStr = JSON.stringify(res.data.data)
                            sessionStorage.setItem('userInfo', userInfoStr)
                            vm.userData = res.data.data
                        })
                    } else {
                        return
                    }
                }).catch(err => {
                    throw err
                })
            }
        },
        beforeRouteLeave(to, from, next) {
            next()
        },
        methods: {
            selectFav(val) {
                this.fav = val.ranking_name
                this.expert = val.id
            },
            submitEdit(val) {
                if (val.type == 'pic') {
                    uploadFile(this, val.value, this.editPic)
                    return
                }
                if (this.editType == 'fav') {
                    let submitData = {
                        expert: this.expert
                    }
                    this.editComplete(submitData)
                    return
                }
                if (this.editType == 'sign') {
                    let submitData = {
                        signature: this.signature
                    }
                    this.editComplete(submitData)
                    return
                }

            },
            editFavorite() {
                this.editActive = true
                this.editType = 'fav'
            },
            editSign(val) {
                this.editType = 'sign'
                this.editActive = true;
                this.signature = val
            },
            editPic(params, fileName) {
                const submitData = {
                    avatar: 'http://p8rk87lub.bkt.clouddn.com/' + fileName,
                    avatar_key: 'http://p8rk87lub.bkt.clouddn.com/' + params.key
                }
                this.editComplete(submitData)
            },
            editComplete(params) {
                editUserInfo(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.$toast({
                                message: '修改成功',
                                duration: 1000
                            })
                            this.editActive = false;
                            SNI_userInfo()
                            // getUserInfo().then(res => {
                            //     this.userInfo = res.data.data
                            //     let str = JSON.stringify(res.data.data)
                            //     sessionStorage.setItem('userInfo', str)
                            // }).catch(err => {
                            //     throw err
                            // })
                        }
                    }
                }).catch(err => {
                    throw err
                })
            },
            editCancel() {
                this.editActive = false;
            },
            logOut() {
                sessionStorage.removeItem('X-Auth-Token')
                sessionStorage.removeItem('userInfo')
                this.$router.replace('hot')
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
        bottom: 0;
        left: 0;
        z-index: 2;
        padding: 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, .2);
        .modal-body {
            padding: 10px;
            width: 100%;
            .input-box {
                width: 100%;
                overflow: hidden;
                border-radius: 4px;
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
        animation: slideInUp 0.4s;
        position: absolute;
    }

    .editModal-leave-active {
        animation: slideOutDown 0.4s;
        position: absolute;
    }
</style>