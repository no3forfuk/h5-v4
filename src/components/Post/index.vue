<template>
    <div class="post">
        <div class="post-scroll-box">
            <div class="post-user">
                <user-card :value="postDetails.user"></user-card>
            </div>
            <pre class="post-content" v-html="content"></pre>
            <h3 class="discuss-title">评论(<span>{{postDetails.comment_num}}</span>)</h3>
            <ul class="discuss-list">
                <discuss-card v-for="(item,index) in postDiscussList" :key="index" :value="item"></discuss-card>
                <p class="post-footer">{{footerText}}</p>
            </ul>
        </div>
        <div class="discuss-box-placeholder"></div>
        <div class="discuss-box">
            <div class="mock-input" @click="addPostDiscuss">
                <span>回复</span>
                <span>{{user.name}} <i>:</i></span>
                <span>{{discussContext}}</span>
            </div>
            <div class="send-box" @click="submitDisCuss">发送</div>
        </div>
        <discuss-page v-show="activeDiscuss" @cancleDiscuss="cancle" @confirmDiscuss="setText"></discuss-page>
    </div>
</template>

<script>
    import discussCard from '../common/DiscussCard/index'
    import discussPage from './postDiscuss'
    import {getPostDetailsById, getDiscuss, addComment} from '../../api/api'
    import {sharePage} from '../../utils'

    export default {
        data() {
            return {
                postDetails: {},
                postDiscussList: [],
                content: '',
                footerText: '很难选 很无趣 你可能需要RCM',
                discussContext: '',
                user: {},
                activeDiscuss: false,
                share: {
                    title: '',
                    desc: ''
                },
            }
        },
        mounted() {
            this.$nextTick(() => {
                $('.post').height($(window).height() - $('.post')[0].offsetTop);
                $('.post-scroll-box').height($('.post').height() - 51)
            })
        },
        created() {
            this.getPostDetails();
            this.getPostDiscuss();
        },
        methods: {
            sharePage() {
                let vm = this;
                let url = location.href;
                let title = this.share.title;
                let desc = this.share.desc;
                let type = 'link';
                sharePage(vm, url, title, desc, type)
            },
            submitDisCuss() {
                let params = {}
                params.comment_type = 3;
                params.post_id = this.$route.query.postId;
                params.content = this.discussContext;
                addComment(params).then(res => {
                    if (res.stutas == 200) {
                        if (res.data.status_code == 1) {
                            this.discussContext = ''
                            this.getPostDiscuss()
                        } else {

                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            },
            setText(val) {
                this.activeDiscuss = false
                this.discussContext = val;
                this.submitDisCuss()
            },
            cancle() {
                this.activeDiscuss = false
            },
            addPostDiscuss() {
                this.activeDiscuss = true;
            },
            getPostContent(val) {
                let reg = /\</g;
                if (val.match(reg)) {
                    this.content = val
                } else {
                    this.content = decodeURIComponent(val)
                }
            },
            getPostDetails() {
                let params = {};
                params.id = this.$route.query.postId
                getPostDetailsById(params).then(res => {
                    this.postDetails = res.data.data;
                    console.log(this.postDetails);
                    this.user = res.data.data.user
                    this.getPostContent(this.postDetails.post_content)
                }).catch(err => {
                    throw err
                })
            },
            getPostDiscuss() {
                let params = {}
                params.level = 3;
                params.id = this.$route.query.postId;
                getDiscuss(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.postDiscussList = res.data.data.data
                            if (this.postDiscussList.length > 0) {
                                this.footerText = '很难选 很无趣 你可能需要RCM'
                            } else {
                                this.footerText = '该榜单还没有评论 快抢沙发吧'
                            }
                        } else {

                        }

                    } else {

                    }
                }).catch(err => {
                    throw err;
                })

            }
        },
        components: {
            discussCard,
            discussPage
        }
    }

</script>

<style scoped lang="less">
    .post-scroll-box {
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .post {
        width: 100%;
        position: relative;
    }

    .post-user {
        width: 100%;
        padding: 10px;
    }

    .post-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 40px;
        padding-right: 10px;
    }

    .discuss-title {
        font-size: 16px;
        font-weight: bold;
        padding: 10px 15px;
    }

    .discuss-list {
        width: 100%;
        overflow-y: auto;
    }

    .post-footer {
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
        color: rgba(0, 0, 0, .3);
    }

    .discuss-box-placeholder {
        width: 100%;
        height: 58px;
        background-color: #fff;
    }

    .discuss-box {
        width: 100%;
        height: 51px;
        background-color: #F8F8F8;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 10;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding-top: 7px;
        padding-left: 14px;
        .mock-input {
            height: 36px;
            background-color: #fff;
            border-radius: 2px;
            border: 1px solid rgba(0, 0, 0, .2);
            display: flex;
            flex-direction: row;
            align-items: baseline;
            overflow: hidden;
            line-height: 36px;
            flex: 0 0 85%;
            span:nth-child(1) {
                color: #C3C2C2;
                margin-left: 7px;
                white-space: nowrap;
                flex: 0 0 30px;
            }
            span:nth-child(2) {
                margin-left: 5px;
                flex: 0 0 auto;
                color: #C3C2C2;
                i {
                    color: #C3C2C2;
                }
            }
            span:nth-child(3) {
                color: #C3C2C2;
                flex: 0 0 75%;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .send-box {
            font-size: 16px;
            color: #797979;
            flex: 0 0 15%;
            text-align: center;
            line-height: 36px;
        }
    }
</style>