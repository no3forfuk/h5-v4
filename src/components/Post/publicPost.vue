<template>
    <div style="position: relative;" class="public-post">
        <rcm-header>
            <span slot="text" class="color-cancel">取消</span>
            <span slot="right" class="color-cancel">完成</span>
        </rcm-header>
        <p class="ele-title">@元素标题</p>
        <div contenteditable="true" class="edit-body" @focus="getEditorBoxFocus" @blur="lostEditorBoxFocus"></div>
        <div class="edit-ctrl"></div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        mounted() {
            this.$nextTick(() => {
                $('public-post').css({
                    height: 300
                })
            })
        },
        methods: {
            getEditorBoxFocus() {
                $('.edit-ctrl').css({
                    position: 'fixed'
                })
            },
            lostEditorBoxFocus() {
                $('.edit-ctrl').css({
                    position: 'absolute'
                })
            }
        },
        watch: {}
    }

</script>

<style scoped lang="less">
    .public-post {
        width: 100%;
        position: relative;
        .ele-title {
            width: 100%;
            padding: 10px;
            font-weight: bold;
            font-size: 16px;
        }
    }

    .edit-body {
        width: 100%;
        height: 300px;
        border: 1px solid #ccc;
    }

    .edit-ctrl {
        width: 60%;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 20px;
        border: 1px solid #ccc;
    }
</style>