<template>
    <div class="like-discuss">
        <div class="left" @click="$store.commit('SET_SOMEONEINFO',[false,userInfo])">
            <img :src="userInfo.avatar" alt="">
        </div>
        <div class="right">
            <div class="content">
                <p class="element">@{{element.element_name}}&nbsp;&nbsp;有了新的帖子</p>
            </div>
            <p class="time">{{value.created_at|timeformat}}</p>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                userInfo: ''
            }
        },
        created() {
            this.userInfo = this.$storage.GET_session('userInfo')

        },
        computed: {
            element() {
                return this.value.element
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
                .element {
                    font-size: 16px;
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