<template>
    <div class="post-list-loadmore">
        <mt-loadmore :bottom-method="loadNextPagePost"
                     :bottom-all-loaded="allLoaded"
                     :bottomDistance="pullHeight"
                     :auto-fill="false"
                     ref="loadmore">
            <ul class="post-list">
                <li v-for="(item,index) in value" :key="index">
                    <div class="left">
                        <icon :value="'&#xe64b;'" class="font-size-20"></icon>
                        <span>{{item.comment_num}}</span>
                    </div>
                    <div class="right" @click="clickItem">
                        <router-link
                                :to="{name:'post',query:{postId:item.id,secondId:$route.query.secondId,firstId:$route.query.firstId,idx:$route.query.idx,elementId:$route.query.elementId},params:{postDetails:item}}">
                            <text-post v-if="item.type == 1" :value="item"></text-post>
                            <img-post v-if="item.type == 2" :value="item"></img-post>
                            <img-text v-if="item.type == 3" :value="item"></img-text>
                            <video-post v-if="item.type == 4" :value="item"></video-post>
                            <ext-web v-if="item.type == 5" :value="item"></ext-web>
                        </router-link>
                        <div class="user">
                            <div>
                                <img :src="item.avatar || 'http://p8rk87lub.bkt.clouddn.com/visitor.jpg'" alt="">
                                <span>{{item.create_user}}</span>
                            </div>
                            <span>{{item.created_at|timeformat}}</span>
                        </div>
                    </div>
                </li>
                <div class="elementpage-footer">支持优秀的就是在拒绝粗糙的</div>
            </ul>
        </mt-loadmore>
    </div>

</template>

<script>
    import textPost from './textPost'
    import imgPost from './imgPost'
    import imgText from './imgTextPost'
    import extWeb from './extWeb'
    import videoPost from './videoPost'

    export default {
        data() {
            return {
                allLoaded: false,
                pullHeight: 20
            }
        },
        created() {
        },
        mounted() {
            this.$nextTick(() => {

            })
        },
        methods: {
            loadNextPagePost() {
                this.$emit('loadmorePost', '')
                this.$refs.loadmore.onBottomLoaded();
            },
            clickItem() {
                this.$count(['Element_To_Post', 1])
                this.$store.commit('SET_TRANSITIONTYPE', 'forward')
            }
        },
        updated() {

        },
        props: ['value'],
        components: {
            textPost,
            imgText,
            imgPost,
            extWeb,
            videoPost
        }
    }

</script>

<style scoped lang="less">
    .post-list-loadmore {
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .post-list {
        width: 100%;
        li {
            width: 100%;
            padding: 10px 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .left {
                flex: 0 0 37px;
                display: flex;
                flex-direction: column;
                align-items: center;
                span:nth-child(2) {
                    font-size: 12px;
                    color: #8B8B8B;
                }
            }
            .right {
                flex: 1;
                padding-right: 10px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                overflow: hidden;
                a {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    color: #000;
                }
                .user {
                    display: flex;
                    padding: 10px 0px;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    div:nth-child(1) {
                        line-height: 18px;
                        img {
                            width: 18px;
                            height: 18px;
                            border-radius: 50%;
                        }
                        span {
                            font-size: 12px;
                            margin-left: 2px;
                        }
                    }
                }
                span {
                    font-size: 12px;
                }
            }
        }
    }

    .elementpage-footer {
        width: 100%;
        text-align: center;
        height: 40px;
        font-size: 12px;
        color: #D9D9D9;
        margin-bottom: 20px;
    }
</style>