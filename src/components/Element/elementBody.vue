<template>
    <ul>
        <li v-for="(item,index) in postLists">
            <div class="left">
                <icon :value="'&#xe64b;'" class="font-size-20"></icon>
                <span>125</span>
            </div>
            <div class="right">
                <router-link :to="{name:''}">
                    <text-post v-if="item.type == 1"></text-post>
                    <img-text v-if="item.type == 2"></img-text>
                    <img-post v-if="item.type == 3"></img-post>
                    <ext-web v-if="item.type == 4"></ext-web>
                    <video-post v-if="item.type == 5"></video-post>
                </router-link>
                <div class="user">
                    <div>
                        <img src="http://p9w69x04q.bkt.clouddn.com/you.jpg" alt="">
                        <span>名称</span>
                    </div>
                    <span>时间</span>
                </div>
            </div>
        </li>
    </ul>
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
                postLists: [
                    {
                        type: 1
                    },
                    {
                        type: 2
                    },
                    {
                        type: 3
                    },
                    {
                        type: 4
                    },
                    {
                        type: 5
                    }
                ]
            }
        },
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
    ul {
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
                    padding-right: 10px;
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
</style>