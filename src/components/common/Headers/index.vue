<template>
    <div class="rcm-header">
        <slot name="left">
            <div class="left font-size-16">
                <i style="font-family: iconfont" class="font-size-24">&#xe609;</i>
            </div>
        </slot>
        <slot name="right">
            <div class="right font-size-16 color-header">

            </div>
        </slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },

    };
</script>
<style scoped lang="less">
    .rcm-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
    }
</style>