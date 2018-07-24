<template>
    <div class="rank-discuss-list">
        <mt-loadmore :bottom-method="loadNextPage"
                     :bottom-all-loaded="allLoaded"
                     :bottomDistance="pullHeight"
                     :auto-fill="false"
                     ref="loadmore">
            <ul class="rank-discuss-ul">
                <li v-for="(item,index) in value" :key="index">
                    <div class="left" @click="didGreat(index,item)" ref="likes">
                        <icon :value="'&#xe647;'" class="font-size-20"></icon>
                        <span>{{item.like}}</span>
                    </div>
                    <div class="center">
                        <user-card :value="item.user"></user-card>
                        <p class="content">{{item.content}}</p>
                    </div>
                    <span class="right">{{item.updated_at|timeformat}}</span>
                </li>
                <div class="index-footer">
                    <p>自我认知的过程就像在做一个排行榜</p>
                </div>
            </ul>
        </mt-loadmore>
    </div>
</template>

<script>
    import {doLikeDiscuss} from '../../api/api'

    export default {
        name: 'discussList',
        data() {
            return {
                list: [],
                allLoaded: false,
                pullHeight: 20
            }
        },
        mounted() {
            this.$nextTick(() => {
                $('.rank-discuss-ul').height($(window).height() - 230)
            })
        },
        created() {

        },
        methods: {
            loadNextPage() {
                this.$refs.loadmore.onBottomLoaded();
            },
            didGreat(index, item) {
                this.$refs.likes[index].style.color = '#FF2C09'
                let spanDom = this.$refs.likes[index].children[1]
                let params = {
                    comment_id: item.id,
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
                            spanDom.innerText = parseInt(spanDom.innerText) + 1
                        } else {
                            this.$toast({
                                message: '操作太快，休息一会',
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
                    throw err
                })
            }
        },
        computed: {},
        props: ['value']
    }

</script>

<style scoped lang="less">
    .activeColor {
        color: #FF2C09;
    }

    .rank-discuss-list {
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    ul {
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
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
                color: #8B8B8B;
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
        .index-footer {
            width: 100%;
            height: 80px;
            margin-top: 10px;
            p {
                width: 100%;
                color: #C8C7CD;
                text-align: center;
                font-size: 12px;
            }
        }
    }
</style>