<template>
    <div class="second-head">
        <div class="left">
            <h2>#最适合带妹子的桌游</h2>
            <div class="desc">
                <p>收集了一些带妹子的桌游带妹子的桌游带妹子的桌游带妹子的桌游带妹子的桌游带妹子的桌游带妹子的桌游带妹子的桌游带妹子的桌游带妹子的桌游带妹子的桌游带妹子的桌游</p>
            </div>
        </div>
        <div class="right">
            <span>RCM评级</span>
            <span>S+</span>
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
        }
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