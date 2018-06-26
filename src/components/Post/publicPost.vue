<template>
    <div class="public-post">
        <div class="top">
            <rcm-header>
                <span slot="back">取消</span>
                <span slot="right">完成</span>
            </rcm-header>
            <p>@元素名称</p>
        </div>
        <div class="center">
            <div contenteditable="true" class="edit-box" @focus="getEditBoxFocus" @blur="lostEditBoxFocus"></div>
        </div>
        <div class="footer">
            <icon :value="'&#xe649;'" @click="insertText" style="font-size: 40px"></icon>
            <icon :value="'&#xe615;'"></icon>
            <icon :value="'&#xe603;'"></icon>
            <icon :value="'&#xe628;'"></icon>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                lastEditRange: {}
            }
        },
        mounted() {
            this.$nextTick(() => {
                $('.public-post').height($(window).height())
            })
        },
        methods: {
            insertText() {
                let selection = window.getSelection();
                selection.removeAllRanges()
                selection.addRange(this.lastEditRange)
                const range = this.lastEditRange
                alert(range)
                $('.edit-box').focus()
                var textNode = range.startContainer;
                var rangeStartOffset = range.startOffset;
                textNode.insertData(rangeStartOffset, '\r\n')
                console.log(textNode);
            },
            getEditBoxFocus() {
                // $('.public-post').height()
                // setTimeout(() => {
                //     let height = $('.public-post')[0].clientHeight / 2
                //     $('.public-post').height(height)
                // }, 500)

                let selection = window.getSelection();
                selection.removeAllRanges()
                selection.addRange(this.lastEditRange)

            },
            lostEditBoxFocus() {
                let selection = window.getSelection();
                this.lastEditRange = selection.getRangeAt(0)
            }
        },
        watch: {}
    }

</script>

<style scoped lang="less">
    .public-post {
        width: 100%;
        position: relative;
        transition: all 0.5s;
        .center {
            width: 100%;
            border: 1px solid #000;
            .edit-box {
                width: 100%;
                height: 170px;
            }
        }
    }

    .footer {
        width: 100%;
        height: 40px;
        background-color: #ccc;
        position: absolute;
        bottom: 0;
        left: 0;
        i {
            padding: 0 5px;
        }
    }
</style>