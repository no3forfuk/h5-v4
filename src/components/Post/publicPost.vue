<template>
    <div class="public-post">
        <div>
            <rcm-header>
                <span slot="text" class="color-cancel">取消</span>
                <span slot="right" class="color-cancel">完成</span>
            </rcm-header>
            <p class="ele-title">@元素标题</p>
            <div class="edit-box">
                <div contenteditable="true"
                     class="edit-body"
                     @focus="getEditorBoxFocus"
                     @blur="lostEditorBoxFocus">
                </div>
            </div>
        </div>
        <div class="edit-ctrl">
            aa
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        mounted() {
            this.$nextTick(() => {
                // $('.edit-body').css({
                //     maxHeight: 736 - 80 - 20
                // })
                $('.public-post').height(736)
            })
        },
        methods: {
            getEditorBoxFocus() {


            },
            lostEditorBoxFocus() {

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

    .edit-box {
        width: 100%;
        overflow-y: auto;
        max-height: 500px;
    }

    .edit-body {
        width: 100%;
        overflow-y: auto;
        max-height: 400px;
    }

    .edit-ctrl {
        width: 60%;
        height: 20px;
        border: 1px solid #ccc;
    }
</style>