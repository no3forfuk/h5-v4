<template>
    <ul>
        <li>
            <div class="left" @click="didGreat">
                <icon :value="'&#xe647;'" class="font-size-20" :style="activeStyle"></icon>
                <span :style="activeStyle">123</span>
            </div>
            <div class="center">
                <div class="user">
                    <img src="http://p9w69x04q.bkt.clouddn.com/you.jpg" alt="">
                    <div class="info">
                        <p>名称</p>
                        <p>
                            <span>#榜单</span>
                            <span></span>
                            <span>签名</span>
                        </p>
                    </div>
                </div>
                <p class="content">
                    内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
            </div>
            <span class="right">3小时前</span>
        </li>
    </ul>
</template>

<script>

    export default {
        data() {
            return {
                greatActive: false
            }
        },
        methods: {
            didGreat() {
                this.greatActive = true;
            }
        },
        computed: {
            activeStyle() {
                return this.greatActive ? {
                    color: '#FF2C09'
                } : {}
            }
        }
    }

</script>

<style scoped lang="less">
    .activeColor {
        color: #FF2C09;
    }

    ul {
        width: 100%;
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
                i {
                    color: #000;
                }
                span {
                    color: #8B8B8B;
                }
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