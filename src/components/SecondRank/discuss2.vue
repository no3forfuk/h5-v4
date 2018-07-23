<template>
    <div class="dis-modal-rank">
        <div class="dis-modal-header">
            <span @click="$emit('cancel')">取消</span>
            <span @click="comfirm">完成</span>
        </div>
        <div class="dis-modal-body">
            <div class="dis-user">
                <div class="user-left">
                    <img :src="user.avatar" alt="">
                    <span v-text="user.name"></span>
                </div>
                <div class="user-right" v-if="isVisitor">
                    <span class="" @click="goRegister">注册并享受更多好礼</span>
                </div>
            </div>
            <div class="discuss-content">
                <textarea v-model="discussText" ref="discussTextarea" id="discussTextarea"></textarea>
                <span style="color: #D3D3D3;font-size: 12px">{{discussText.length}}/350</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {SVS_addComment} from '../../Servers/API'

    export default {
        data() {
            return {
                discussText: '',
            }
        },
        created() {

        },
        computed: {
            isVisitor() {
                return this.$storage.GET_session('X-Auth-Token') ? false : true
            },
            userType() {
                return this.$storage.GET_session('X-Auth-Token') ? 1 : 2
            },
            user() {
                let user = this.$storage.GET_session('userInfo')
                if (user) {
                    return {
                        avatar: user.avatar,
                        name: user.name
                    }
                } else {
                    return {
                        avatar: 'http://p8rk87lub.bkt.clouddn.com/visitor.jpg',
                        name: '广东猎人'
                    }
                }
            }
        },
        methods: {
            goRegister() {
                this.$emit('cancel')
                this.$store.commit('GOLOGIN', true)
            },
            comfirm() {
                let params = {
                    content: this.discussText,
                    comment_type: 2,
                    ranking_id: this.$route.query.secondId,
                    type: this.userType
                }
                SVS_addComment(res => {
                    this.$toast({
                        message: res.message,
                        duration: 1000,
                        position: 'middle'
                    })
                    this.$emit('cancel', true)
                    this.$store.commit('SET_GETDISCUSS', true)
                }, err => {
                    this.$toast({
                        message: err.message,
                        duration: 1000,
                        position: 'middle'
                    })
                }, params)
            }
        },
        watch: {
            'discussText.length'(val) {
                if (val > 350) {

                }
            }
        }
    }

</script>

<style scoped lang="less">
    .dis-modal-rank {
        width: 100%;
        background-color: #fff;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        height: 100%;
        .dis-modal-header {
            padding: 10px 20px;
            color: #FF2C09;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .dis-modal-body {
            width: 100%;
            padding: 10px 20px;
            .dis-user {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                .user-left {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: left;
                    align-items: center;
                    img {
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                    }
                    span {
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .user-right {
                    padding: 2px 5px;
                    background-color: #E4E4E4;
                    color: #FF2C09;
                    font-size: 12px;
                    font-weight: bold;
                    border-radius: 4px;
                }
            }
            .discuss-content {
                position: relative;
                margin-top: 10px;
                width: 100%;
                height: 90px;
                border-radius: 6px;
                overflow: hidden;
                border: 1px solid #D6D6D6;
                padding: 1px 5px;
                textarea {
                    display: block;
                    width: 100%;
                    height: 80%;
                    border: 0 none;
                    resize: none;
                    border-radius: 7px;
                    font-size: 14px;
                }
                span {
                    position: absolute;
                    right: 3px;
                    bottom: 0;
                }
            }
        }
    }
</style>