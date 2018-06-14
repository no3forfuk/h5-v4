<template>
    <div class="rcm-header">
        <slot name="left">
            <div class="left font-size-16">
                <i style="font-family: iconfont" class="font-size-20">&#xe609;</i><span>首页</span>
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
        }
    };
</script>
<style scoped lang="less" src="./style.less">
</style>