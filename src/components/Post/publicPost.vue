<template>
    <div class="public-post">
        <input type="file"
               ref="imgFile"
               @change="viewImg"
               style="width: 0px;height:0px;overflow: hidden;position: absolute;"
               id="inputImg">
        <input type="file"
               ref="videoFile"
               @change="viewVideo"
               style="width: 0px;height:0px;overflow: hidden;position: absolute;"
               id="inputVideo">
        <div class="top">
            <rcm-header>
                <span slot="back" @click="cancelPublic">取消</span>
                <span slot="right" @click="confirmPublic">完成</span>
            </rcm-header>
            <p>@元素名称</p>
        </div>
        <div class="center">
            <div contenteditable="true" class="edit-box"
                 v-html="postContent"
                 @click="saveFocusPosition"
                 @focus="getEditBoxFocus"
                 @blur="lostEditBoxFocus"></div>
        </div>
        <div class="footer">
            <icon :value="'&#xe649;'" @click="insertText" class="font-size-28"></icon>
            <icon :value="'&#xe615;'" @click="insertImg" class="font-size-28"></icon>
            <icon :value="'&#xe603;'" @click="insertVideo" class="font-size-28"></icon>
            <icon :value="'&#xe628;'" class="font-size-28"></icon>

        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                lastEditRange: {},
                postContent: '',
                imgNum: 0,
                imgOldHtml: '',
                imgNewHtml: '',
                videoNum: 0,
                videoNewHtml: ''
            }
        },
        mounted() {
            this.$nextTick(() => {
                $('.public-post').height($(window).height())
            })
        },
        methods: {
            cancelPublic() {

            },
            confirmPublic() {
                console.log($('.edit-box').html());
            },
            getRangePosition(element) {

            },
            insertVideo() {
                this.$refs.videoFile.click()
            },
            viewVideo() {
                const flies = new FileReader();
                flies.onload = data => {
                    this.videoNum++
                    this.videoNewHtml = `
                      <video src="" id="video${this.videoNum}" controls="controls" style="max-width:300px;"></video>
                `
                    $('.edit-box').append(this.videoNewHtml)
                    $(`#video${this.videoNum}`)[0].src = data.target.result
                    this.$refs.videoFile.value = ''
                }
                if (this.$refs.videoFile.files[0]) {
                    flies.readAsDataURL(this.$refs.videoFile.files[0])
                } else {
                    return
                }
            },
            insertText() {

            },
            insertImg() {
                this.$refs.imgFile.click()
            },
            viewImg() {
                const flies = new FileReader();
                flies.onload = data => {
                    this.imgNum++
                    this.imgNewHtml = `
                      <br>
                      <img src="" alt="" style="max-width:300px;margin: 0 auto;border-radius: 4px;" id="img${this.imgNum}">
                `
                    $('.edit-box').append(this.imgNewHtml)
                    $(`#img${this.imgNum}`)[0].src = data.target.result
                    this.$refs.imgFile.value = ''
                }
                if (this.$refs.imgFile.files[0]) {
                    flies.readAsDataURL(this.$refs.imgFile.files[0])
                } else {
                    return
                }
            },
            getEditBoxFocus() {

                // $('.public-post').height()
                // setTimeout(() => {
                //     let height = $('.public-post')[0].clientHeight / 2
                //     $('.public-post').height(height)
                // }, 500)

            },
            lostEditBoxFocus() {
                $('.edit-box').on('keyup', null)
            },
            saveFocusPosition() {
                if (window.getSelection) {
                    let range, selection;
                    selection = window.getSelection();
                    this.lastEditRange = selection.getRangeAt(0);
                    $('.edit-box').on('keyup', () => {
                        this.lastEditRange = selection.getRangeAt(0);
                    })
                }
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
                text-align: left;
                overflow-x: hidden;
                overflow-y: auto;
            }
        }
    }

    .footer {
        width: 100%;
        height: 40px;
        background-color: #ccc;
        /*position: absolute;*/
        /*bottom: 0;*/
        /*left: 0;*/
        i {
            padding: 0 5px;
        }
    }
</style>