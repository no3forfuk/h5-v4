<template>
    <div class="add-post-page">
        <div class="add-header">
            <span @click="$emit('cancel')">取消</span>
            <span @click="submitAddPost">完成</span>
        </div>
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
            <div class="public-post-center">
                <div contenteditable="true"
                     class="public-post-edit-box"
                     v-html="postContent"
                     @click="saveFocusPosition"
                     @focus="getEditBoxFocus"
                     @blur="lostEditBoxFocus">
                </div>
                <!--<div class="footer-placeholder"></div>-->
                <div class="footer">
                    <icon :value="'&#xe615;'" @click="insertImg" class="font-size-28"></icon>
                    <icon :value="'&#xe603;'" @click="insertVideo" class="font-size-28"></icon>
                    <icon :value="'&#xe628;'" @click="insertOutLink" class="font-size-28"></icon>
                </div>
            </div>
            <transition name="out-link">
                <div class="outlink-mark" v-show="activeOutLink">
                    <div class="outlink-box">
                        <input type="text" placeholder="请输入链接名称" v-model="outLinkName">
                        <span></span>
                        <input type="text" placeholder="请输入链接地址" v-model="outLinkAddress">
                        <span></span>
                        <button type="button" @click="confirmOutLink">完成</button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import {publicPost, getQiniuToken, getElementDetails} from '../../api/api'
    import {uploadFile} from '../../utils/index'

    export default {
        data() {
            return {
                lastEditRange: {},
                qiniuToken: '',
                postContent: '',
                imgNum: 0,
                imgNewHtml: '',
                imgFileArr: [],
                videoNum: 0,
                videoNewHtml: '',
                videoFileArr: [],
                type: 1,
                img: '',
                video: '',
                out_link: '',
                link_title: '',
                link_desc: '',
                elementDetails: {},
                activeOutLink: false,
                outLinkName: '',
                outLinkAddress: '',
                outLinkNum: 0,
                outLinkNewHtml: '',
                outLinkArr: [],
                comfirmBtnDom: ''
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            submitAddPost() {
                for (let i = 0; i < this.videoFileArr.length; i++) {
                    this.type = 4
                    this.uploadFile(this.videoFileArr[i], i)
                    return
                }
                for (let i = 0; i < this.imgFileArr.length; i++) {
                    this.type = 3
                    this.uploadFile(this.imgFileArr[i], i)
                    return
                }
                if (this.outLinkArr.length > 0) {
                    this.type = 5
                    this.confirmPublic({
                        post_content: $('.public-post-edit-box').html().replace(/[\r\n]/g, ''),
                        element_id: parseInt(this.$route.query.elementId),
                        type: 5,
                        out_link: this.outLinkAddress,
                        link_title: this.outLinkName
                    })
                    return
                }
                if (this.imgFileArr.length == 0 && this.videoFileArr.length == 0) {
                    this.type = 1
                    this.confirmPublic({
                        post_content: $('.public-post-edit-box').html().replace(/[\r\n]/g, ''),
                        element_id: parseInt(this.$route.query.elementId),
                        type: 1
                    })
                    return
                }
            },
            insertOutLink() {
                this.activeOutLink = true
            },
            confirmOutLink() {
                this.activeOutLink = false
                this.outLinkNewHtml = `
                    <div>
                        <a href="${this.outLinkAddress}">${this.outLinkName}</a>
                    </div>
                `
                $('.public-post-edit-box').append(this.outLinkNewHtml)
                this.outLinkArr.push(this.outLinkNewHtml)
            },
            cancelPublic() {

            },
            postType() {
                if ($('img').length == 0 && $('video').length == 0) {
                    this.type = 1
                    return
                }
                if ($('video').length > 0) {
                    this.type = 4
                    return
                }
                if ($('img').length > 0) {
                    this.img = $('img')[0].src
                    this.type = 3
                    return
                }
            },
            dataURLtoBlob(dataurl) {
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type: mime});
            },
            confirmPublic(data) {
                if (data.post_content.length == 0) {
                    this.$toast({
                        message: '您没有输入任何东西',
                        duration: 1000,
                        position: 'middle'
                    })
                    return
                }
                publicPost(data).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.$toast({
                                message: '发布成功',
                                duration: 1000,
                                position: 'middle'
                            })
                            this.$emit('cancel')
                            this.$emit('refresh')
                        } else {
                            this.$toast({
                                message: res.data.message,
                                duration: 1000,
                                position: 'middle'
                            })
                        }
                    } else {
                        this.$toast({
                            message: '网络异常',
                            duration: 1000,
                            position: 'middle'
                        })
                    }
                }).catch(err => {
                    throw err
                })

            },
            getRangePosition(element) {

            },
            uploadFile(file, i) {
                this.$indicator.open({
                    text: '请稍后...',
                    spinnerType: 'fading-circle'
                })
                getQiniuToken().then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.qiniuToken = res.data.data.qiniu_token;
                            let token = res.data.data.qiniu_token;
                            let strFileName = 'post/' + this.$route.query.elementId + '/' + file.name
                            let putExtra = {
                                fname: "",
                                params: {},
                                mimeType: null
                            };
                            let config = {
                                useCdnDomain: true,
                                region: this.qiniu.region.z2
                            };
                            var self = this;
                            let observer = {
                                next(res) {

                                },
                                error(err) {
                                    throw err;
                                },
                                complete(res) {
                                    self.$indicator.close()
                                    if (self.type == 3) {
                                        let urlStr = 'http://p8rk87lub.bkt.clouddn.com/' + strFileName
                                        let imgDom = '#img' + (i + 1)
                                        $(imgDom)[0].src = urlStr;
                                        self.confirmPublic({
                                            post_content: $('.public-post-edit-box').html().replace(/[\r\n]/g, ''),
                                            element_id: parseInt(self.$route.query.elementId),
                                            type: 3,
                                            img: urlStr
                                        })
                                    }
                                    if (self.type == 4) {
                                        let urlStr = 'http://p8rk87lub.bkt.clouddn.com/' + strFileName
                                        let videoDom = '#video' + (i + 1)
                                        $(videoDom)[0].src = urlStr;
                                        self.confirmPublic({
                                            post_content: $('.public-post-edit-box').html().replace(/[\r\n]/g, ''),
                                            element_id: parseInt(self.$route.query.elementId),
                                            type: 4,
                                            video: urlStr
                                        })
                                    }

                                }
                            }
                            let observable = this.qiniu.upload(file, strFileName, token, putExtra, config);
                            let subscription = observable.subscribe(observer);
                        } else {

                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
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
                    $('.public-post-edit-box').append(this.videoNewHtml)
                    this.videoFileArr.push(this.$refs.videoFile.files[0])
                    $(`#video${this.videoNum}`)[0].src = data.target.result
                    this.$refs.videoFile.value = ''
                }
                if (this.$refs.videoFile.files[0]) {
                    flies.readAsDataURL(this.$refs.videoFile.files[0])
                } else {
                    return
                }
            },
            insertImg() {
                this.$refs.imgFile.click()
            },
            viewImg() {
                this.$indicator.open({
                    spinnerType: 'fading-circle'
                })
                const flies = new FileReader();
                flies.onload = data => {
                    this.imgNum++
                    this.imgNewHtml = `
                      <div>
                        <img src="" alt="" style="max-width:300px;border-radius: 4px;" id="img${this.imgNum}">
                      </div>
                `
                    $('.public-post-edit-box').append(this.imgNewHtml)
                    this.imgFileArr.push(this.$refs.imgFile.files[0])
                    $(`#img${this.imgNum}`)[0].src = data.target.result
                    this.$refs.imgFile.value = ''
                    this.$indicator.close()
                }
                if (this.$refs.imgFile.files[0]) {
                    flies.readAsDataURL(this.$refs.imgFile.files[0])
                } else {
                    return
                }
            },
            getEditBoxFocus() {
                if ($(window).width() > 400) {
                    $('.public-post-center').height(275)
                    $('.public-post-edit-box').height(235)
                } else {
                    $('.public-post-center').height(237)
                    $('.public-post-edit-box').height(197)
                }
            },
            lostEditBoxFocus() {
                $('.public-post-center').height($('.public-post').height())
                $('.public-post-edit-box').height($('.public-post').height())
            },
            saveFocusPosition() {
                // if (window.getSelection) {
                //     let range, selection;
                //     selection = window.getSelection();
                //     this.lastEditRange = selection.getRangeAt(0);
                //     $('.public-post-edit-box').on('keyup', () => {
                //         // this.postContent = $('.public-post-edit-box').html()
                //         this.lastEditRange = selection.getRangeAt(0);
                //     })
                // }
            }
        },
        watch: {}
    }

</script>

<style scoped lang="less">
    .add-post-page {
        width: 100%;
        height: 100%;
        .add-header {
            padding: 10px 20px;
            color: #FF2C09;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }

    .outlink-mark {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 10000;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        .outlink-box {
            width: 200px;
            border-radius: 6px;
            border: 1px solid #999;
            background-color: #eee;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            overflow: hidden;
            span {
                width: 96%;
                height: 1px;
                display: block;
                background-color: #d3d3d3;
            }
            input {
                width: 98%;
                height: 38px;
                border-radius: 6px;
                background-color: #eee;
                font-size: 16px;
                line-height: 16px;
                border: 0 none;
                color: #000;
            }
            button {
                border: 0 none;
                width: 100%;
                text-align: center;
                height: 30px;
            }
        }
    }

    .public-post {
        width: 100%;
        background-color: #fff;
        height: calc(100% - 41px);
        .public-post-center {
            width: 100%;
            height: 100%;
            position: relative;
            border-top: 1px solid rgba(0, 0, 0, 0.2);
            transition: all 0.8s;
            .public-post-edit-box {
                width: 100%;
                height: 205px;
                text-align: left;
                overflow-x: hidden;
                overflow-y: auto;
                transition: all 0.8s;
                padding: 0 5px;
            }
        }
    }

    .footer-placeholder {
        transition: all 0.8s;
        width: 100%;
        height: 40px;
    }

    .footer {
        transition: all 0.8s;
        width: 100%;
        height: 40px;
        background-color: rgba(0, 0, 0, .1);
        position: absolute;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        bottom: 0;
        left: 0;
        i {
            padding: 0 5px;
        }
    }

    .out-link-enter-active {
        animation: pulse 0.4s;
        position: absolute;
    }

    .out-link-leave-active {
        animation: slideOutDown 0.4s;
        position: absolute;
    }
</style>