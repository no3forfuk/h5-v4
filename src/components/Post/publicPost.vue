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
            <p>@元素名称</p>
        </div>
        <div class="center">
            <div contenteditable="true" class="edit-box"
                 v-html="postContent"
                 @click="saveFocusPosition"
                 @focus="getEditBoxFocus"
                 @blur="lostEditBoxFocus">
            </div>
            <div class="footer-placeholder"></div>
            <div class="footer">
                <icon :value="'&#xe615;'" @click="insertImg" class="font-size-28"></icon>
                <icon :value="'&#xe603;'" @click="insertVideo" class="font-size-28"></icon>
                <icon :value="'&#xe628;'" class="font-size-28"></icon>
            </div>
        </div>

    </div>
</template>

<script>
    import {publicPost, getQiniuToken} from '../../api/api'
    import {uploadFile} from '../../utils/index'

    export default {
        data() {
            return {
                lastEditRange: {},
                qiniuToken: '',
                postContent: '',
                imgNum: 0,
                imgOldHtml: '',
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
                link_desc: ''
            }
        },
        beforeRouteLeave(to, from, next) {
            next()
        },
        mounted() {
            this.$nextTick(() => {
                $('.center').height($(window).height() - $('.edit-box').offset().top)
                $('.edit-box').height($('.center').height() - $('.footer-placeholder').height())
                this.$parent.$refs.rcmHeaders.$refs.comfirm.onclick = () => {
                    console.log(this.videoFileArr);
                    for (let i = 0; i < this.imgFileArr.length; i++) {
                        this.uploadFile(this.imgFileArr[i], i)
                    }
                    for (let i = 0; i < this.videoFileArr.length; i++) {
                        this.uploadFile(this.videoFileArr[i], i)
                    }

                }
            })
        },
        methods: {
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
            confirmPublic() {
                let params = {};
                let newHtml = $('.edit-box').html().replace(/[\r\n]/g, '')
                params.post_content = encodeURIComponent(newHtml);
                params.element_id = parseInt(this.$route.query.elementId);
                params.type = this.type;
                params.img = this.img;
                params.video = this.video;
                params.out_link = this.out_link;
                params.link_title = this.link_title;
                params.link_desc = this.link_desc;
                publicPost(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {

                        }

                    } else {

                    }
                }).catch(err => {
                    throw err
                })

            },
            getRangePosition(element) {

            },
            uploadFile(file, i) {
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
                                    self.postType()
                                    if (self.type == 3) {
                                        let urlStr = 'http://p8rk87lub.bkt.clouddn.com/' + strFileName
                                        let imgDom = '#img' + (i + 1)
                                        $(imgDom)[0].src = urlStr;
                                    }

                                    if (self.type == 4) {
                                        let urlStr = 'http://p8rk87lub.bkt.clouddn.com/' + strFileName
                                        let videoDom = '#video' + (i + 1)
                                        $(videoDom)[0].src = urlStr;
                                    }
                                    self.confirmPublic()
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
                    $('.edit-box').append(this.videoNewHtml)
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
                const flies = new FileReader();
                flies.onload = data => {
                    this.imgNum++
                    this.imgNewHtml = `
                      <div>
                        <img src="" alt="" style="max-width:300px;border-radius: 4px;" id="img${this.imgNum}">
                      </div>
                `
                    $('.edit-box').append(this.imgNewHtml)
                    this.imgFileArr.push(this.$refs.imgFile.files[0])
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
                //获取屏幕宽度
                $('.center').height(200)
                $('.edit-box').height(200 - $('.footer-placeholder').height())
                setTimeout(() => {
                    $('.edit-box')[0].scrollTop = $('.edit-box')[0].scrollHeight
                    $('.app')[0].scrollTop = 0 + 'px'
                }, 100)
            },
            lostEditBoxFocus() {
                $('.edit-box').on('keyup', null)
                $('.center').height($(window).height() - $('.center').offset().top)
                $('.edit-box').height($(window).height() - $('.footer-placeholder').height() - $('.center').offset().top)
            },
            saveFocusPosition() {
                if (window.getSelection) {
                    let range, selection;
                    selection = window.getSelection();
                    this.lastEditRange = selection.getRangeAt(0);
                    $('.edit-box').on('keyup', () => {
                        // this.postContent = $('.edit-box').html()
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
        height: 100%;
        background-color: #fff;
        .top {
            padding: 5px 10px;
            p {
                font-size: 16px;
            }
        }
        .center {
            width: 100%;
            position: relative;
            border-top: 1px solid rgba(0, 0, 0, 0.2);
            transition: all 0.8s;
            .edit-box {
                width: 100%;
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
        background-color: #ccc;
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
</style>