<template>
    <div class="user-name" @click="$emit('click')">
                <span class="font-size-16">
                    <input type="text"
                           disabled
                           v-model="label">
                </span>
        <icon :value="'&#xe601;'" class="font-size-20"></icon>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                label: '查看我的ID'
            }
        },
        created() {

        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .user-name {
        width: 100%;
        padding: 15px 26px 15px 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        input {
            background-color: #fff;
            border: 0 none;
            color: #000;
            opacity: 1;
        }
    }
</style>