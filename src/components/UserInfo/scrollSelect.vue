<template>
    <div class="scroll-select">
        <p>修改擅长榜单</p>
        <div class="select-box">
            <ul>
                <li v-for="(item,index) in scrollData"
                    ref="lis"
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
                ulTranslateY: 0,
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
        mounted() {
            this.$nextTick(() => {

            })
        },
        computed: {},
        methods: {},
        computed: {}
    }

</script>

<style scoped lang="less">
    .scroll-select {
        .mark-top {
            width: 100%;
            height: 140px;
            position: fixed;
            bottom: 140px;
            left: 0;
            z-index: 4;
            background: linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1));
        }
        .mark-bottom {
            width: 100%;
            height: 120px;
            position: fixed;
            bottom: 0px;
            left: 0;
            z-index: 4;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1));
        }
        height: 300px;
        width: 100%;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        overflow: hidden;
        position: absolute;
        z-index: 2;
        bottom: 0;
        background-color: #fff;
        left: 0;
        p {
            width: 100%;
            text-align: center;
        }
        .select-box {
            height: 300px;
            width: 100%;
            position: relative;
            overflow-y: auto;
            .icon {
                position: absolute;
                top: 4px;
                left: 30%;
            }
            ul {
                width: 100%;
                padding-top: 140px;
                padding-bottom: 140px;
                transition: all 0.5s;
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