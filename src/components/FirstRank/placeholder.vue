<template>
    <div class="index-placeholder">
        <div v-for="(item,index) in list"
             :key="index"
             class="item">
            <div class="left"></div>
            <div class="right">
                <div class="title"></div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                list: [0, 0, 0, 0, 0]
            }
        }
    }

</script>

<style scoped lang="less">
    .index-placeholder {
        width: 100%;
        height: 100%;
        padding: 10px;
        background-color: #fff;
        .item {
            width: 100%;
            height: 112px;
            margin-top: 10px;
            display: flex;
            flex-direction: row;
            .left {
                flex: 0 0 30px;
                width: 30px;
                height: 30px;
                background-color: rgba(0, 0, 0, .08);
            }
            .right {
                flex: 1;
                padding: 0 10px;
                padding-right: 20px;
                .title {
                    display: flex;
                    height: 15px;
                    background-color: rgba(0, 0, 0, .08);
                }
                ul {
                    padding: 10px 0;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    overflow: hidden;
                    li {
                        width: 70px;
                        height: 70px;
                        border-radius: 4px;
                        background-color: rgba(0, 0, 0, .08);
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>