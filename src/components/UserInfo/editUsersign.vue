<template>
    <div class="user-sign" @click="$emit('click',value)">
                <span class="font-size-16">
                    <input type="text"
                           disabled
                           v-model="value">
                </span>
        <icon :value="'&#xe601;'" class="font-size-20"></icon>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .user-sign {
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