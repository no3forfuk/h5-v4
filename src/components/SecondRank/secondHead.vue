<template>
    <div class="second-head">
        <div class="left">
            <h2>#{{value.ranking_name}}</h2>
            <div class="desc">
                <p>{{value.ranking_desc}}</p>
            </div>
            <div class="more-options">
                <div class="collect">
                    <icon :value="'&#xe62b;'" class="font-size-16"></icon>
                    <span>收藏</span>
                </div>
                <div class="more">
                    <icon :value="'&#xe62f;'" class="font-size-16"></icon>
                    <span>更多</span>
                </div>
            </div>
        </div>
        <div class="right">
            <span>RCM评级</span>
            <span>{{value.rating}}</span>
            <span>8909(票)</span>
            <span>33(排名)</span>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        mounted() {
            this.$nextTick(() => {
                $('.desc p').css({
                    width: $(window).width() - 150
                })
            })
        },
        props: ['value']
    }

</script>

<style scoped lang="less">


    .second-head {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 15px 20px;
        justify-content: space-between;
        .left {
            flex: 1;
            padding-right: 10px;
            position: relative;
            h2 {
                font-weight: bold;
            }
            .desc {
                p {
                    height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .more-options {
                position: absolute;
                right: 10px;
                bottom: 0px;
                display: inline-flex;
                flex-direction: row;
                flex-wrap: nowrap;
                .collect {
                    width: 30px;
                    display: flex;
                    flex-direction: column;
                    font-size: 12px;
                    justify-content: center;
                    align-items: center;
                }

                .more {
                    width: 30px;
                    display: flex;
                    flex-direction: column;
                    font-size: 12px;
                    justify-content: center;
                    align-items: center;
                    margin-left: 10px;
                }
            }
        }
        .right {
            flex: 0 0 90px;
            height: 90px;
            border-radius: 2px;
            box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span:nth-child(1) {
                font-size: 14px;
            }
            span:nth-child(2) {
                color: #FF2C09;
                font-size: 24px;
            }
            span:nth-child(3) {
                font-size: 10px;
            }
            span:nth-child(4) {
                font-size: 8px;
            }
        }
    }
</style>