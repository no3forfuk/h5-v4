<template>
    <div class="add-element">
        <rcm-header>
            <span slot="text">返回</span>
            <span slot="right">下一步</span>
        </rcm-header>
        <div class="add-body">
            <h3>#最适合带妹的桌游</h3>
            <div class="input-box">
                <input type="text" placeholder="为这个榜单添加新的成员">
            </div>
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
    .add-element {
        width: 100%;
        .add-body {
            width: 100%;
            h3 {
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
            }
            .input-box {
                width: 100%;
                border-top: 1px solid rgba(0, 0, 0, .3);
                input {
                    width: 100%;
                    height: 24px;
                    border: 0 none;
                    text-indent: 1em;
                }
            }
        }
    }
</style>