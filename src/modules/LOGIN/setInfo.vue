<template>
    <div class="set-info-root">
        <div class="user-photo">
            <img :src="avatar" ref="viewBox" alt="" @click="selectPhoto">
        </div>
        <div class="user-name">
            <input type="text" placeholder="起个响亮的昵称吧" v-model="userName">
        </div>
        <div class="set-info-opts">
            <button @click="submit">下一步</button>
        </div>
        <transition name="select-photo">
            <div class="selectPhotoType" v-if="activeSelectPhoto">
                <div @click="takePhoto">
                    从手机相册选择
                    <input type="file"
                           ref="takePhotos"
                           name="file"
                           @change="viewPicture"
                           style="width: 0;height: 0;opacity: 0;position: absolute;top: 0;left: -9999px;">
                </div>
                <div @click="randomPic">随机一个</div>
                <div @click="cancelSelect">取消</div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {editUserInfo, loginByPhone, getQiniuToken} from '../../api/api'
    import {uploadFile, UTS_viewPicture} from '../../utils'
    import {SNI_login, SNI_userInfo} from '../../Snippet'
    import {SVS_editUserInfo} from '../../Servers/API'

    export default {
        data() {
            return {
                activeSelectPhoto: false,
                avatar: 'http://p8rk87lub.bkt.clouddn.com/uploadImg.png',
                userName: '',
                imgFile: ''
            }
        },
        methods: {
            randomPic() {
                this.avatar = 'http://p8rk87lub.bkt.clouddn.com/visitor.jpg'
                this.activeSelectPhoto = false
            },
            submit() {
                if (this.imgFile) {
                    uploadFile(this, this.imgFile, this.afterUploadFile)
                } else {
                    this.afterSubmit({
                        name: this.userName,
                        avatar: this.avatar,
                        avatar_key: 'visitor.jpg'
                    })
                }
            },
            afterSubmit(params) {
                SVS_editUserInfo(res => {
                    this.$store.commit('GOLOGIN', false)
                    SNI_userInfo()
                }, err => {
                    this.$toast({
                        message: res.data.message,
                        duration: 1000,
                        position: 'middle'
                    })
                }, params)
            },
            afterUploadFile(data, fileName) {
                let params = {
                    name: this.userName,
                    avatar: 'http://p8rk87lub.bkt.clouddn.com/' + fileName,
                    avatar_key: data.key
                }
                this.afterSubmit(params)
            },
            viewPicture() {
                UTS_viewPicture(this.$refs.viewBox, this.$refs.takePhotos, () => {
                    this.activeSelectPhoto = false
                    this.imgFile = this.$refs.takePhotos.files[0]
                })
            },
            selectPhoto() {
                this.activeSelectPhoto = true
            },
            cancelSelect() {
                this.activeSelectPhoto = false
            },
            takePhoto() {
                this.$refs.takePhotos.click()
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
            height: 150px;
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
                border-bottom: 1px solid #DEDEDE;
                line-height: 50px;
                height: 33.333333333333%;
            }
            div:nth-child(2) {
                color: #FF2C09;
                width: 100%;
                text-align: center;
                font-size: 16px;
                border-bottom: 1px solid #DEDEDE;
                line-height: 50px;
                position: relative;
                height: 33.333333333333%;
            }
            div:nth-child(3) {
                color: #FF2C09;
                width: 100%;
                text-align: center;
                vertical-align: middle;
                line-height: 50px;
                font-size: 16px;
                height: 33.333333333333%;
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