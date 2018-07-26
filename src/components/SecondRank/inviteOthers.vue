<template>
    <div class="invite-other">
        <cancel-comfirm @cancel="$emit('cancel')" @comfirm="$emit('comfirm')"></cancel-comfirm>
        <div class="invite-body">
            <div style="padding:10px 20px;">
                <div class="search-input">
                    <icon :value="'&#xe704;'" class="search-icon"></icon>
                    <input type="search" placeholder="想邀请谁" v-model="searchKeyWords">
                </div>
            </div>
            <div class="invite-tab">
                <rcm-tab :tabItem="tabItem" @toggleTab="getInviteList" :initIndex="0">
                    <ul class="user-list" slot="tabContent">
                        <li v-for="(item,index) in userList"
                            class="user-list-item"
                            :key="index">
                            <user-card :value="item"></user-card>
                            <button class="item-btn" @click="invite(item)">邀请</button>
                        </li>
                    </ul>
                </rcm-tab>
            </div>
        </div>
    </div>
</template>

<script>
    import {SVS_inviteOthers, SVS_searchInvite, SVS_invite} from '../../Servers/API'

    export default {
        data() {
            return {
                tabItem: [
                    {
                        label: '热门邀请',
                        type: 1
                    },
                    {
                        label: '关注的',
                        type: 2
                    },
                    {
                        label: '粉丝',
                        type: 3
                    }
                ],
                searchKeyWords: '',
                userList: []
            }
        },
        created() {
            SVS_inviteOthers(this.getSuccess, this.getError, {type: 1})
        },
        mounted() {

        },
        methods: {
            invite(item) {
                SVS_invite(res => {
                    this.$toast({
                        message: '邀请成功',
                        duration: 1000,
                        position: 'middle'
                    })
                }, err => {
                    this.$toast({
                        message: err.message,
                        duration: 1000,
                        position: 'middle'
                    })
                }, {
                    user_id: item.id,
                    second_id: this.$route.query.secondId
                })
            },
            getSuccess(res) {
                this.userList = res.data
            },
            getError(err) {
                return
            },
            getInviteList(val) {
                this.userList = []
                SVS_inviteOthers(this.getSuccess, this.getError, {type: val.type})
            }
        },
        watch: {
            'searchKeyWords'(val) {
                if (val.length > 0) {
                    SVS_searchInvite(res => {
                        this.userList = res.data
                    }, err => {
                        return
                    }, {name: val})
                } else {
                    return
                }
            }
        }
    }

</script>

<style scoped lang="less">
    .invite-other {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .invite-body {
            width: 100%;
            height: calc(100% - 40px);
            .search-input {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: left;
                width: 100%;
                border: 1px solid #C8C7CD;
                border-radius: 4px;
                overflow: hidden;
                height: 30px;
                display: flex;
                .search-icon {
                    flex: 0 0 20px;
                    font-size: 16px;
                    padding: 5px;
                }
                input {
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    border: 0 none;
                    color: #929298;
                }
            }
            .invite-tab {
                width: 100%;
                height: calc(100% - 50px);
                .user-list {
                    width: 100%;
                    padding: 0 20px;
                    .user-list-item {
                        width: 100%;
                        padding: 10px 0px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .item-btn {
                            width: 70px;
                            height: 24px;
                            border: 0 none;
                            background-color: #D5D5D5;
                            color: #FF2C09;
                            font-size: 16px;
                            text-align: center;
                            line-height: 24px;
                            border-radius: 4px;
                        }
                    }
                }
            }
        }
    }
</style>