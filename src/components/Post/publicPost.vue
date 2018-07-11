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
            <p>@{{elementDetails.element_name}}</p>
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
                outLinkNewHtml: ''
            }
        },
        created() {
            let params = {}
            params.id = this.$route.query.elementId;
            getElementDetails(params).then(res => {
                if (res.status == 200) {
                    if (res.data.status_code == 1) {
                        this.elementDetails = res.data.data
                    }
                }
            }).catch(err => {
                throw err
            })
        },
        beforeRouteLeave(to, from, next) {
            next()
        },
        mounted() {
            this.$nextTick(() => {
                $('.outlink-mark').height($(window).height())
                $('.center').height($(window).height() - $('.edit-box').offset().top)
                $('.edit-box').height($('.center').height() - $('.footer-placeholder').height())
                this.$parent.$refs.rcmHeaders.$refs.comfirm.onclick = () => {
                    for (let i = 0; i < this.imgFileArr.length; i++) {
                        this.uploadFile(this.imgFileArr[i], i)
                    }
                    for (let i = 0; i < this.videoFileArr.length; i++) {
                        this.uploadFile(this.videoFileArr[i], i)
                    }
                    if (this.imgFileArr.length == 0 && this.videoFileArr.length == 0) {
                        this.type = 1
                        this.confirmPublic()
                    }
                }
            })
        },
        methods: {
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
                $('.edit-box').append(this.outLinkNewHtml)
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
            confirmPublic() {
                let params = {};
                let newHtml = $('.edit-box').html().replace(/[\r\n]/g, '')
                params.post_content = encodeURIComponent(newHtml);
                if (params.post_content.length == 0) {
                    this.$toast({
                        message: '您没有输入任何东西',
                        duration: 1000,
                        position: 'middle'
                    })
                    return
                }
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
                            this.$toast({
                                message: '发布成功',
                                duration: 1000,
                                position: 'middle'
                            })
                            this.$router.back()
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
                this.$indicator.open({
                    spinnerType: 'fading-circle'
                })
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
                    this.$indicator.close()
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
                    $('.edit-box').append(this.imgNewHtml)
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
    .outlink-mark {
        width: 100%;
        position: fixed;
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
                line-height: 38px;
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