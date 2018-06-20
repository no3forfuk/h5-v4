<template>
    <div class="scroll-select">
        <div class="select-box">
            <icon :value="'&#xe790;'" class="icon"></icon>
            <ul>
                <li v-for="(item,index) in scrollData"
                    :key="index">
                    <span>{{item.value}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                scrollData: [
                    {
                        value: '热门'
                    },
                    {
                        value: '美食'
                    },
                    {
                        value: '旅游'
                    },
                    {
                        value: '音乐'
                    },
                    {
                        value: '电影'
                    },
                    {
                        value: '美女'
                    },
                    {
                        value: '游戏'
                    }
                ]
            }
        },
        computed: {}
    }

</script>

<style scoped lang="less">
    .scroll-select {
        display: flex;
        flex-direction: row;
        height: 300px;
        width: 100%;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        align-items: center;
        position: fixed;
        z-index: 2;
        bottom: 0;
        background-color: #fff;
        left: 0;
        .select-box {
            height: 20px;
            width: 100%;
            position: relative;
            .icon {
                position: absolute;
                top: 4px;
                left: 30%;
            }
            ul {
                width: 100%;
                height: 20px;
                li {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    text-align: center;
                }
            }
        }
    }

    .activeStyle12 {
        font-size: 12px;
        transform: rotateX(60deg);
    }

    .activeStyle14 {
        font-size: 14px;
        transform: rotateX(45deg);
    }

    .activeStyle16 {
        font-size: 16px;
        transform: rotateX(30deg);
    }

    .activeStyle {
        font-size: 18px;
    }

</style>