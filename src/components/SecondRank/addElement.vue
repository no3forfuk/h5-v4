<template>
    <div class="add-element">
        <div class="add-header">
            <span @click="$emit('cancel')">取消</span>
            <span @click="submitAddElement">完成</span>
        </div>
        <div class="add-body">
            <div class="input-box">
                <input type="text"
                       @focus="$count(['Rank_Lv2_AddElement_Input_Name',1])"
                       placeholder="为这个榜单添加新的成员"
                       @keyup="searchElement"
                       v-model="elemenName"
                       ref="inputElement">
            </div>
            <div class="easy-pic">
                <img src="" alt="" class="img-view" ref="viewBox" v-show="imgFile">
                <icon :value="'&#xe604;'" :style="addStyle" @click="choosePic"></icon>
                <input type="file"
                       ref="takePhotos"
                       name="file"
                       @change="viewPicture"
                       style="width: 0;height: 0;opacity: 0;position: absolute;top: 0;left: -9999px;">
            </div>
            <div class="element-desc" v-if="hasTitle">
                <textarea v-model="elementDesc"
                          @focus="$count(['Rank_Lv2_AddElement_Input_Desc',1])"
                          placeholder="介绍一下啊这个新成员吧"
                          ref="addDesc"></textarea>
            </div>
            <ul class="pick-element">
                <div class="pick-element-buffer">
                    <span v-for="(v,i) in selectList" :key="i">{{v.element_name}}
                        <icon @click="deleteElement(i)"
                              :value="'&#xe64c;'"></icon></span>
                </div>
                <li class="pick-element-item" v-for="(item,index) in elementList" :key="index"
                    @click="selectElement(item,index)">
                    <div class="top">
                        <span>{{item.element_name}}</span>
                        <!--<span>(桌游)</span>-->
                        <!--<span></span>-->
                    </div>
                    <icon :value="'&#xe611;'" :selectId="index" v-if="index !== iconList[index]"></icon>
                    <icon :value="'&#xe60a;'" style="color: #d3d3d3;" :selectId="index"
                          v-if="index === iconList[index]"></icon>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getRankList, addElement, searchElementByName, addElementMore} from '../../api/api'
    import {UTS_viewPicture, uploadFile} from '../../utils'
    import {SVS_addElementMore, SVS_addElement} from '../../Servers/API'

    export default {
        data() {
            return {
                elemenName: '',
                elementDesc: '',
                hasTitle: false,
                nextStepDom: '',
                elementList: [],
                selectList: [],
                iconList: {},
                tempArr: [],
                routerFrom: '',
                imgFile: '',
                img: ''
            }
        },
        computed: {
            addStyle() {
                return {
                    fontSize: '50px',
                    color: 'rgba(0,0,0,.2)',
                    marginLeft: '20px'
                }
            }
        },
        beforeDestroy() {
            // $(this.nextStepDom).unbind()
        },
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                // $('.add-body').height($(window).height() - 36)
                // this.nextStepDom = this.$parent.$refs.rcmHeaders.$refs.comfirm;
                // $(this.nextStepDom).on('click', () => {
                //     this.activeTextarea()
                // })
                // $(this.$refs.inputElement).on('keyup', () => {
                //     let params = {}
                //     params.like = this.elemenName
                //     searchElementByName(params).then(res => {
                //         if (res.status == 200 && res.data.status_code == 1) {
                //             this.elementList = res.data.data.data
                //         }
                //     }).catch(err => {
                //         throw err
                //     })
                // })

            })
        },
        methods: {
            submitAddElement() {
                if (this.selectList.length > 0) {
                    uploadFile(this, this.imgFile, (res, filename) => {
                        let arr = [], str = '';
                        for (let i = 0; i < this.selectList.length; i++) {
                            arr.push(this.selectList[i].id)
                        }
                        str = arr.join(',')
                        let params = {
                            ranking_id: this.$route.query.secondId,
                            list: str,
                            img: 'http://p8rk87lub.bkt.clouddn.com/' + filename
                        }
                        SVS_addElementMore(res => {
                            this.$toast({
                                message: res.message,
                                duration: 1000,
                                position: 'middle'
                            })
                            this.$emit('cancel')
                            this.$emit('refresh')
                        }, err => {
                            this.$toast({
                                message: err.message,
                                duration: 1000,
                                position: 'middle'
                            })
                        }, params)
                    })
                } else {
                    this.$count(['Rank_AddElement_Creat', 1])
                    if (this.elemenName.length > 0) {
                        this.hasTitle = true
                        if (this.elementDesc.length == 0) {
                            this.$toast({
                                message: '请介绍一下新元素吧',
                                duration: 1000,
                                position: 'middle'
                            })
                            return
                        }
                        uploadFile(this, this.imgFile, (response, filename) => {
                            let params = {};
                            params.element_name = this.elemenName
                            params.element_desc = this.elementDesc
                            params.ranking_id = this.$route.query.secondId
                            params.img = 'http://p8rk87lub.bkt.clouddn.com/' + filename
                            SVS_addElement(res => {
                                this.$toast({
                                    message: res.message,
                                    duration: 1000,
                                    position: 'middle'
                                })
                                this.$count(['Rank_AddElement_Success', 1])
                                this.$emit('cancel')
                                this.$emit('refresh')
                            }, err => {
                                this.$toast({
                                    message: err.message,
                                    duration: 1000,
                                    position: 'middle'
                                })
                            }, params)
                        })

                    } else {
                        this.$toast({
                            message: '请填写元素名称',
                            duration: 1000,
                            position: 'middle'
                        })
                    }

                }
            },
            searchElement() {
                let params = {}
                params.like = this.elemenName
                searchElementByName(params).then(res => {
                    if (res.status == 200 && res.data.status_code == 1) {
                        this.elementList = res.data.data.data
                    }
                }).catch(err => {
                    throw err
                })
            },
            viewPicture() {
                UTS_viewPicture(this.$refs.viewBox, this.$refs.takePhotos, () => {
                    this.imgFile = this.$refs.takePhotos.files[0]
                })
            },
            choosePic() {
                this.$refs.takePhotos.click()
            },
            deleteElement(index) {
                this.selectList.splice(index, 1)
                delete  this.iconList[this.tempArr[index]]
                this.tempArr.splice(index, 1)
            },
            selectElement(item, index) {
                this.$count(['Rank_AddElement_Select', 1])
                this.selectList.push(item)
                this.iconList[index] = index
                if (this.iconList[index] || this.iconList[index] == 0) {
                    this.tempArr.push(index)
                }
                this.selectList = [...new Set(this.selectList)];
            },
        }
    }

</script>

<style scoped lang="less">
    .easy-pic {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px 0;
        .img-view {
            width: 50px;
            border: 0 none;
            height: 50px;
            border-radius: 2px;
            overflow: hidden;
        }
    }

    .add-element {
        width: 100%;
        background-color: #fff;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding: 10px;
        height: 100%;
        .add-header {
            padding: 10px 20px;
            color: #FF2C09;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .add-body {
            width: 100%;
            overflow-y: auto;
            height: calc(100% - 51px);
            h3 {
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
            }
            .input-box {
                width: 100%;
                border-bottom: 1px solid rgba(0, 0, 0, 0.18);
                input {
                    width: 100%;
                    height: 24px;
                    border: 0 none;
                    text-indent: 1em;
                    font-size: 14px;
                }
            }
            .element-desc {
                width: 100%;
                padding: 10px;
                border: 1px solid rgba(0, 0, 0, .08);
                textarea {
                    width: 100%;
                    height: 80px;
                    border: 0 none;
                    background-color: #fff;
                }
            }
            .pick-element {
                width: 100%;
                .pick-element-item {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding: 5px;
                }
            }
            .pick-element-buffer {
                width: 100%;
                padding: 5px 15px;
                span {
                    background-color: #d3d3d3;
                    margin: 2px;
                }
            }
        }
    }
</style>