<template>
    <li>
        <div class="left" @click="didGreat" ref="likeTarget">
            <icon :value="'&#xe647;'" class="font-size-20"></icon>
            <span>{{value.like}}</span>
        </div>
        <div class="center">
            <user-card :value="value.user||value.visitor"></user-card>
            <p class="content">{{value.content}}</p>
        </div>
        <span class="right">{{value.created_at|timeformat}}</span>
    </li>
</template>

<script>
    import {doLikeDiscuss} from '../../../api/api'

    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {
            didGreat() {
                let params = {
                    comment_id: this.value.id,
                    user_type: 1
                }
                doLikeDiscuss(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.$toast({
                                message: '点赞成功',
                                duration: 1000,
                                position: 'middle'
                            })
                            this.$refs.likeTarget.style.color = '#FF2C09'
                            this.value.like = parseInt(this.value.like) + 1
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
        props: ['value', 'index']
    }

</script>

<style scoped lang="less">
    li {
        display: flex;
        padding: 10px 0;
        flex-direction: row;
        justify-content: space-between;
        .left {
            flex: 0 0 53px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .center {
            flex: 1;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            padding-bottom: 10px;
            .user {
                display: flex;
                flex-direction: row;
                justify-content: left;
                align-items: center;
                img {
                    width: 33px;
                    height: 33px;
                    border-radius: 50%;
                }
                .info {
                    margin-left: 5px;
                    p:nth-child(1) {
                        font-weight: bolder;
                    }
                    p:nth-child(2) {
                        color: #8B8B8B;
                        font-size: 12px;
                        line-height: 16px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        span:nth-child(2) {
                            display: inline-block;
                            width: 1px;
                            height: 12px;
                            background-color: #8B8B8B;
                            margin: 0 5px;
                        }
                    }
                }
            }
            .content {
                margin-top: 3px;
                text-align: justify;
            }
        }
        .right {
            font-size: 10px;
            padding-right: 10px;
            color: #8B8B8B;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
    }
</style>