<template>
    <div class="user-card">
        <img src="http://p9w69x04q.bkt.clouddn.com/you.jpg" alt="">
        <div class="user-info">
            <h6>名称</h6>
            <p>
                <span>#榜单</span>
                <span></span>
                <span>签名</span>
            </p>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style scoped lang="less">
    .user-card {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: left;
        align-items: center;
        img {
            width: 33px;
            height: 33px;
            border-radius: 50%;
        }
        .user-info {
            margin-left: 8px;
            h6 {
                font-size: 12px;
                font-weight: bold;
            }
            p {
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
</style>