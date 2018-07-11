<template>
    <div class="rank-discuss-list">
        <mt-loadmore :bottom-method="loadNextPage"
                     :bottom-all-loaded="allLoaded"
                     :bottomDistance="pullHeight"
                     :auto-fill="false"
                     ref="loadmore">
            <ul>
                <li v-for="(item,index) in value" :key="index">
                    <div class="left" @click="didGreat(index,item)" ref="likes">
                        <icon :value="'&#xe647;'" class="font-size-20"></icon>
                        <span>{{item.like}}</span>
                    </div>
                    <div class="center">
                        <user-card :value="item.visitor"></user-card>
                        <p class="content">{{item.content}}</p>
                    </div>
                    <span class="right">{{item.created_at|timeformat}}</span>
                </li>
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
                $('.rank-discuss-list').height($(window).height() - $('.rank-discuss-list')[0].offsetTop)
            })
        },
        created() {
            console.log(this.value);
        },
        methods: {
            loadNextPage() {
                this.$refs.loadmore.onBottomLoaded();
            },
            didGreat(index, item) {
                this.$refs.likes[index].style.color = '#FF2C09'
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
        overflow-y: auto;
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
    }
</style>