<template>
    <li>
        <div class="left">
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

    export default {
        data() {
            return {}
        },
        created() {

        },
        props: ['value']
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