<template>
    <div>
        <div class="rcm-header">
            <div class="left">
                <slot name="back"></slot>
                <slot name="text"></slot>
            </div>
            <div class="right" @click="active">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="find-bottom">
            <slot name="find">
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
            active() {
                $('.find-bottom').slideToggle(200)
            }
        }
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