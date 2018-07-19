<template>
    <div class="like-discuss">
        <div class="left">
            <img :src="user.avatar" alt="">
        </div>
        <div class="right">
            <div class="content">
                <span>{{user.name}}</span>&nbsp;&nbsp;
                <span>回复了你的榜单</span>&nbsp;&nbsp;
                <p class="rank">#{{rank.ranking_name}}</p>
                <p class="dis-content">{{content.content}}</p>
            </div>
            <p class="time">{{value.created_at|timeformat}}</p>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        created() {

        },
        computed: {
            user() {
                return this.value.from_user
            },
            content() {
                return this.value.comment
            },
            rank() {
                return this.value.second
            }

        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .like-discuss {
        width: 100%;
        display: flex;
        padding: 10px 0;
        .left {
            flex: 0 0 70px;
            overflow: hidden;
            padding: 0 10px;
            img {
                width: 53px;
                height: 53px;
                border-radius: 50%;
            }
        }
        .right {
            width: calc(100% - 70px);
            padding-right: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, .2);
            .content {
                span {
                    font-weight: bold;
                    font-size: 16px;
                }
                span:nth-child(3) {
                    font-size: 16px;
                    font-weight: normal;
                    color: #FF2C09;
                }
                .rank {
                    font-size: 14px;
                    padding: 5px 0;
                    font-weight: bold;
                }
                .dis-content {
                    color: #FF2C09;
                }
            }
            .time {
                margin-top: 10px;
                font-size: 12px;
                color: #8B8B8B;
            }
        }
    }
</style>