<template>
    <div class="user-fav" @click="$emit('click','a')">
                <span class="font-size-16">
                    <input type="text"
                           disabled
                           v-model="label" placeholder="修改擅长领域">
                </span>
        <icon :value="'&#xe601;'" class="font-size-20"></icon>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                label: '修改擅长领域'
            }
        },
        created() {

        },
        props: ['value'],
        watch: {
            'value'(val) {
                this.label = val
            }
        }
    }

</script>

<style scoped lang="less">
    .user-fav {
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