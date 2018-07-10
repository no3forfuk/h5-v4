<template>
    <transition name="discuss">
        <div class="add-discuss">
            <div class="add-discuss-header">
                <span @click="$emit('cancleDiscuss','')">取消</span>
                <span @click="$emit('confirmDiscuss',discussText)">完成</span>
            </div>
            <div class="discuss-body">
                <div class="discuss-user">
                    <div class="left">
                        <img src="http://p9w69x04q.bkt.clouddn.com/you.jpg" alt="">
                        <span>广东猎人</span>
                    </div>
                    <span class="right">注册并享受更多好礼</span>
                </div>
                <div class="discuss-content">
                    <textarea v-model="discussText" ref="discussTextarea" id="discussTextarea"></textarea>
                    <span style="color: #D3D3D3;">{{wordLength}}/350</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        data() {
            return {
                discussText: '',
                wordLength: 0
            }
        },
        watch: {
            discussText(n, o) {
                this.wordLength = n.length;
            }
        }
    }

</script>

<style scoped lang="less">
    .add-discuss {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 100;
        .add-discuss-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 10px;
        }
        .discuss-body {
            padding: 10px;
            .discuss-user {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-bottom: 10px;
                .left {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: left;
                    align-items: center;
                    img {
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                    }
                    span {
                        margin-left: 10px;
                    }
                }
                .right {
                    padding: 2px 5px;
                    background-color: #E4E4E4;
                    color: #FF2C09;
                    font-weight: bold;
                    border-radius: 4px;
                }
            }
            .discuss-content {
                position: relative;
                width: 100%;
                height: 90px;
                border-radius: 6px;
                overflow: hidden;
                border: 1px solid #D6D6D6;
                padding: 1px 5px;
                textarea {
                    display: block;
                    width: 100%;
                    height: 80%;
                    border: 0 none;
                    resize: none;
                    border-radius: 7px;
                    font-size: 14px;
                }
                span {
                    position: absolute;
                    right: 3px;
                    bottom: 0;
                }
            }
        }

    }

    .discuss-enter-active {
        animation: slideInUp 0.4s;
        position: absolute;
    }

    .discuss-leave-active {
        animation: slideOutDown 0.4s;
        position: absolute;
    }
</style>