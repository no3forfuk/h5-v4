<template>
    <div class="header-ctrl-complete">
        <div class="cancel-btn" @click="$emit('cancel')">取消</div>
        <div class="comfirm-btn" @click="$emit('comfirm')">完成</div>
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
    .header-ctrl-complete {
        width: 100%;
        padding: 10px 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        overflow: hidden;
        color: #FF2C09;
    }
</style>