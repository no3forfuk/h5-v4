<template>
    <div class="element-details">
        <icon :value="'&#xe6b5;'" @click="closeDetails" class="icon-close">关闭</icon>
        <img :src="value.img" alt="" v-if="value.img">
        <h4 class="title">@{{value.element_name}}</h4>
        <p class="content">
            {{value.element_desc}}</p>
        <div class="builder">
            <h4 class="builder-header">排名创建者</h4>
            <user-card></user-card>
        </div>
        <div class="builder">
            <h4 class="builder-header">最后维护者</h4>
            <user-card></user-card>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        mounted() {

        },
        methods: {
            closeDetails() {
                this.$emit('openDetails', false)
            }
        },
        props: ['value'],
        components: {}
    }

</script>

<style scoped lang="less">
    .element-details {
        width: 100%;
        height: 90%;
        position: absolute;
        background-color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, .2);
        bottom: 0;
        left: 0;
        z-index: 20;
        .icon-close {
            position: absolute;
            display: block;
            width: 20px;
            height: 20px;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            top: 15px;
            right: 15px;
            color: #ABABAB;
            background-color: #fff;
            border-radius: 50%;
        }
        img {
            max-width: 100%;
        }
        .title {
            font-size: 16px;
            font-weight: bold;
            padding: 20px;
        }
        .content {
            padding: 0 20px;
        }
        .builder {
            width: 100%;
            padding: 20px 20px 10px 20px;
            .builder-header {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
</style>