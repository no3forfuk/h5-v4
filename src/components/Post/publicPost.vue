<template>
    <div class="public-post">
        <div class="top">
            <rcm-header>
                <span slot="text">取消</span>
                <span slot="right">完成</span>
            </rcm-header>
            <p>@元素名称</p>
        </div>
        <div class="center">
            <div contenteditable="true" class="edit-box" @focus="getEditBoxFocus" @blur="lostEditBoxFocus"></div>
        </div>
        <div class="footer" @click="aa"></div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        mounted() {
            this.$nextTick(() => {
                $('.public-post').height($(window).height())
            })
        },
        methods: {
            aa() {
                alert($(window).height())
            },
            getEditBoxFocus() {
                // $('.public-post').height()
                setTimeout(() => {
                    let height = $('.public-post')[0].clientHeight / 2

                    $('.public-post').height(height)
                }, 1000)

            },
            lostEditBoxFocus() {
                $('.public-post').height($(window).height())
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
        height: 20px;
        background-color: #ccc;
        position: absolute;
        bottom: 0;
        left: 0;
    }
</style>