<template>
    <div class="set-info-root">
        <div class="user-photo">
            <img src="http://p8rk87lub.bkt.clouddn.com/uploadImg.png" ref="viewBox" alt="" @click="selectPhoto">
        </div>
        <div class="user-name">
            <input type="text" placeholder="起个响亮的昵称吧" v-model="userName">
        </div>
        <div class="set-info-opts">
            <button @click="uploadPic27Niu">下一步</button>
        </div>
        <transition name="select-photo">
            <div class="selectPhotoType" v-if="activeSelectPhoto">
                <div @click="takePhpto">
                    拍照
                    <input type="file"
                           ref="takePhoto"
                           name="file"
                           capture="camera"
                           style="width: 0;height: 0;opacity: 0;position: absolute;top: 0;left: -9999px;">
                </div>
                <div @click="selectFromAlbum">从手机相册选择
                    <input type="file"
                           @change="viewPicture('album')"
                           ref="album"
                           style="width: 0;height: 0;opacity: 0;position: absolute;top: 0;left: -9999px;"
                           name="file"
                           accept="image/*">
                </div>
                <div>随机一个</div>
                <div @click="cancelSelect">取消</div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {firstUpdataUserInfo, loginByPhone, getQiniuToken} from '../../api/api'

    export default {
        data() {
            return {
                activeSelectPhoto: false,
                avatar: '',
                userName: ''
            }
        },
        methods: {
            uploadPic27Niu(val) {
                let file = this.$refs.album.files[0];
                getQiniuToken().then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            let token = res.data.data.qiniu_token;
                            let strFileName = 'user/' + file.name
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
                                    self.avatar = 'http://p8rk87lub.bkt.clouddn.com/' + strFileName
                                    self.submitRegister()
                                }
                            }
                            let observable = this.qiniu.upload(file, strFileName, token, putExtra, config);
                            let subscription = observable.subscribe(observer);
                        }
                    }
                }).catch(err => {
                    throw err
                })
            },
            viewPicture(val) {
                const flies = new FileReader();
                flies.onload = data => {
                    this.$refs.viewBox.src = data.target.result
                }
                if (val == 'album') {
                    flies.readAsDataURL(this.$refs.album.files[0])
                }
            },
            submitRegister() {
                let params = {
                    name: this.userName,
                    avatar: this.avatar
                }
                if (this.userName.length == 0) {
                    this.$toast({
                        message: '昵称不能为空',
                        duration: 1000,
                        position: 'middle'
                    })
                    return
                }
                firstUpdataUserInfo(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.$store.commit('GOLOGIN', false)
                        } else {
                            this.$toast({
                                message: res.data.message,
                                duration: 1000,
                                position: 'middle'
                            })
                        }
                    } else {
                        return
                    }
                }).catch(err => {
                    throw err
                })

            },
            selectPhoto() {
                this.activeSelectPhoto = true
            },
            cancelSelect() {
                this.activeSelectPhoto = false
            },
            takePhpto() {
                this.$refs.takePhoto.click()
            },
            selectFromAlbum() {
                this.$refs.album.click()
            }
        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .set-info-root {
        width: 100%;
        height: 100%;
        position: relative;
        .user-photo {
            padding: 20px 40px;
            img {
                width: 112px;
                height: 112px;
                border-radius: 50%;
            }
        }
        .user-name {
            width: 100%;
            padding: 0 30px;
            input {
                width: 100%;
                border: 0 none;
                background-color: #fff;
                font-size: 16px;
                border-bottom: 1px solid rgba(0, 0, 0, .2);
                padding-bottom: 13px;
            }
        }
        .set-info-opts {
            width: 100%;
            margin-top: 25px;
            display: flex;
            flex-direction: row;
            padding-left: 20px;
            flex-wrap: nowrap;
            justify-content: space-between;
            height: 37px;
            button {
                width: 100%;
                flex: 0 0 46%;
                border: 0 none;
                text-align: center;
                background-color: #FFCECE;
                height: 100%;
                border-radius: 4px;
                color: #FF2C09;
                font-size: 18px;
                font-weight: 700;
            }
        }
        .selectPhotoType {
            width: 100%;
            height: 193px;
            position: absolute;
            left: 0;
            bottom: 0;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, .2);
            background-color: #fff;
            z-index: 11;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 20px;
            justify-content: space-between;
            div:nth-child(1) {
                color: #FF2C09;
                width: 100%;
                text-align: center;
                font-size: 16px;
                line-height: 50px;
                border-bottom: 1px solid #DEDEDE;
                height: 50px;
            }
            div:nth-child(2) {
                color: #FF2C09;
                width: 100%;
                text-align: center;
                font-size: 16px;
                line-height: 50px;
                border-bottom: 1px solid #DEDEDE;
                position: relative;
                height: 50px;
            }
            div:nth-child(3) {
                color: #FF2C09;
                line-height: 50px;
                width: 100%;
                text-align: center;
                font-size: 16px;
                border-bottom: 1px solid #DEDEDE;
                height: 50px;
            }
            div:nth-child(4) {
                color: #FF2C09;
                line-height: 50px;
                width: 100%;
                text-align: center;
                font-size: 16px;
                height: 50px;
            }
        }

    }

    .select-photo-enter-active {
        animation: slideInUp 0.5s;
        position: absolute;
    }

    .select-photo-leave-active {
        animation: slideOutDown 0.5s;
        position: absolute;
    }
</style>