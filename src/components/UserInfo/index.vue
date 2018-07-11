<template>
    <transition name="transitionName" mode="in-out">
        <div class="user-info">
            <edit-pic :value="userpic" :img="userInfo.avatar" @savePic="uploadPic27Niu"></edit-pic>
            <!--<edit-username @click="editStart" :value="userInfo.name"></edit-username>-->
            <edit-userfav @click="editFav" :value="userInfo.get_expert.ranking_name"></edit-userfav>
            <edit-usersign @click="editSign" :value="userInfo.signature"></edit-usersign>
            <div class="belt"></div>
            <div class="confirm">退出登陆</div>
            <div class="belt"></div>
            <div class="footer"><p>用爱喂食挚爱，那么TA将GO BIG</p></div>
            <transition name="editModal">
                <div class="modal-edit" v-show="editActive">
                    <rcm-header>
                    <span slot="back"
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
                                   v-model="userInfo.signature"
                                   v-show="editItem == 'usersign'">
                            <input type="text"
                                   v-model="userInfo.get_expert.ranking_name"
                                   disabled
                                   placeholder="选择一个自己的擅长领域"
                                   v-show="editItem == 'userfav'">
                        </div>
                        <scroll-select v-if="editItem == 'userfav'" @change="selectFav"></scroll-select>
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
    import {editUserInfo, getQiniuToken, getUserInfo} from '../../api/api'
    import {inheritObject, timeFormat} from '../../utils'

    export default {
        data() {
            return {
                editActive: false,
                userInfo: {},
                editItem: '',
                username: '修改昵称',
                usersign: '修改个性签名',
                userpic: '修改头像',
                userfav: '修改擅长领域',
                temp: {},
                expert: '',
                avatar_key: '',
                avatar: '',
                defaultData: {
                    avatar: 'http://p8rk87lub.bkt.clouddn.com/visitor.jpg',
                    avatar_key: 'visitor.jpg',
                    email: '',
                    get_expert: {
                        ranking_name: '暂无',
                        id: NaN
                    },
                    name: '用户' + parseInt(new Date() / 123),
                    signature: '该用户什么也不想说',
                    updated_at: timeFormat('-')
                }
            }
        },
        created() {
            this.initData()
        },
        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETROUTERFROM', from.name)
            this.$store.commit('SETROUTERTO', to.name)
            next()
        },
        methods: {
            initData() {
                let obj = JSON.parse(sessionStorage.getItem('userInfo'));
                this.userInfo = inheritObject(obj, this.defaultData)
            },
            editFav(msg) {
                this.editItem = 'userfav';
                this.editActive = true;
                this.userInfo.get_expert.ranking_name = msg
            },
            editSign(msg) {
                this.editItem = 'usersign';
                this.editActive = true;
                this.userInfo.signature = msg
            },
            uploadPic27Niu(val) {
                let file = val;
                getQiniuToken().then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            let token = res.data.data.qiniu_token;
                            let strFileName = 'user/' + file.name
                            let putExtra = {
                                fname: "",
                                params: {},
                                mimeType: null
                            };
                            let config = {
                                useCdnDomain: true,
                                region: this.qiniu.region.z2
                            };
                            var self = this;
                            let observer = {
                                next(res) {

                                },
                                error(err) {
                                    throw err;
                                },
                                complete(res) {
                                    self.userInfo.avatar = 'http://p8rk87lub.bkt.clouddn.com/' + strFileName
                                    self.userInfo.avatar_key = 'http://p8rk87lub.bkt.clouddn.com/' + res.key
                                    self.submitEdit()
                                }
                            }
                            let observable = this.qiniu.upload(file, strFileName, token, putExtra, config);
                            let subscription = observable.subscribe(observer);
                        }
                    }
                }).catch(err => {
                    throw err
                })
            },
            selectFav(val) {
                this.userInfo.get_expert = val
            },
            submitEdit() {
                let params = {
                    id: this.userInfo.id,
                    avatar: this.userInfo.avatar,
                    avatar_key: this.userInfo.avatar_key,
                    avatar_key: this.userInfo.avatar_key,
                    signature: this.userInfo.signature,
                    expert: this.userInfo.get_expert.id,
                }
                editUserInfo(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.$toast({
                                message: '修改成功',
                                duration: 1000
                            })
                            getUserInfo().then(res => {
                                this.userInfo = res.data.data
                                let str = JSON.stringify(res.data.data)
                                sessionStorage.setItem('userInfo', str)
                            }).catch(err => {
                                throw err
                            })
                        }
                    }
                }).catch(err => {
                    throw err
                })
            },
            editStart(msg) {
                this.editItem = msg;
                this.editActive = true;
                this.temp = {[msg]: this[msg]};
                this[msg] = '';
            },
            editComplete() {
                this.editActive = false;
                this.submitEdit()
            },
            editCancel() {
                this.editActive = false;
                for (let k in this.temp) {
                    this[k] = this.temp[k]
                }
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