<template>
    <div class="post-page">
        <rcm-head :type="'back'" @linkTo="back"></rcm-head>
        <div class="post-scroll-box"
             :class="{noscroll:activeDiscuss}">
            <div class="post-user">
                <user-card :value="user" v-if="user"></user-card>
            </div>
            <div class="post-content" v-html="content"></div>
            <div class="post-create-time"><span>{{postDetails.created_at}}</span></div>
            <h3 class="discuss-title">评论(<span>{{postDiscussList.length}}</span>)</h3>
            <ul class="discuss-list">
                <discuss-card v-for="(item,index) in postDiscussList" :key="index" :value="item"
                              :index="index"></discuss-card>
                <p class="post-footer">{{footerText}}</p>
            </ul>
        </div>
        <div class="discuss-box">
            <div class="mock-input" @click="addPostDiscuss">
                <span>回复</span>
                <span>{{user.name}} <i>:</i></span>
                <span>{{discussContext}}</span>
            </div>
            <div class="send-box" @click="submitDisCuss">发送</div>
        </div>
        <rcm-popup :show="activeDiscuss"
                   @close="activeDiscuss = false"
                   :type="'full'">
            <discuss-page slot="fullPage"
                          @cancleDiscuss="cancle"
                          @confirmDiscuss="setText">
            </discuss-page>
        </rcm-popup>
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
                enterTime: 0,
                leaveTime: 0
            }
        },
        mounted() {
            this.$nextTick(() => {
                $('.post-page').height($(window).height())
            })
        },
        created() {
            this.getPostDetails();
            this.getPostDiscuss();
            //统计Post浏览次数
            this.$count(['Reading_Post_Num', 1])
            this.enterTime = new Date().getTime()
        },
        beforeDestroy() {
            //统计Post浏览时长
            this.leaveTime = new Date().getTime()
            let time = Math.round((this.leaveTime - this.enterTime) / 1000)
            this.$count(['Reading_Post_Time', time])
        },
        computed: {},
        methods: {
            back() {
                this.$store.commit('SET_TRANSITIONTYPE', 'back')
                this.$router.push({
                    name: 'element',
                    query: this.$route.query
                })
            },
            sharePage() {
                let vm = this;
                let url = location.href;
                let title = this.share.title;
                let desc = this.share.desc;
                let type = 'link';
            },
            submitDisCuss() {
                let params = {}
                if (this.discussContext.length == 0) {
                    this.$toast({
                        message: '评论不能为空',
                        duration: 1000,
                        position: 'middle'
                    })
                    return
                }
                if (sessionStorage.getItem('X-Auth-Token')) {
                    params.type = 1
                } else {
                    params.type = 2
                }
                params.comment_type = 3;
                params.post_id = this.$route.query.postId;
                params.content = this.discussContext;
                addComment(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.getPostDiscuss()
                            this.$toast({
                                message: '评论成功',
                                duration: 1000,
                                position: 'middle'
                            })
                            this.$count(['Post_Reply', 1])
                            this.discussContext = ''
                            this.activeDiscuss = false
                        } else {
                            this.$toast({
                                message: res.data.message,
                                duration: 1000,
                                position: 'middle'
                            })
                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            },
            setText(val) {
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
                let reg = /\s+/g;
                this.content = val.replace(reg, ' ')
            },
            getPostDetails() {
                let params = {};
                params.id = this.$route.query.postId
                getPostDetailsById(params).then(res => {
                    this.postDetails = res.data.data;
                    this.user = res.data.data.user
                    this.getPostContent(this.postDetails.post_content)
                    sharePage(this, location.href, document.title, res.data.data.post_content, 'link', res.data.data.img)
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
                                this.footerText = '该帖子还没有评论 快抢沙发吧'
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

<style lang="less">


    .post-scroll-box {
        width: 100%;
        height: calc(100% - 92px);
        overflow-x: hidden;
        overflow-y: auto;
    }

    .post-page {
        width: 100%;
        height: 100%;
    }

    .post-user {
        width: 100%;
        padding: 10px;
    }

    .post-create-time {
        margin-left: 40px;
        color: #6A6A6A;
        margin-top: 10px;
        font-size: 14px;
    }

    .post-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 40px;
        padding-right: 10px;
        font-size: 16px;
        color: #6A6A6A;
        h1 {
            font-size: 16px;
        }
        img {
            max-width: 80%;
            border-radius: 4px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
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
        padding: 10px 0px;
        font-size: 14px;
        margin-bottom: 20px;
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