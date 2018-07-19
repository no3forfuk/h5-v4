<template>
    <div class="add-element">
        <div class="add-body">
            <h3>#{{title}}</h3>
            <div class="input-box">
                <input type="text" placeholder="为这个榜单添加新的成员" v-model="elemenName" ref="inputElement">
            </div>
            <div class="easy-pic">
                <img src="" alt="" class="img-view" ref="viewBox">
                <icon :value="'&#xe604;'" :style="addStyle" @click="choosePic"></icon>
                <input type="file"
                       ref="takePhotos"
                       name="file"
                       @change="viewPicture"
                       style="width: 0;height: 0;opacity: 0;position: absolute;top: 0;left: -9999px;">
            </div>
            <div class="element-desc" v-if="hasTitle">
                <textarea v-model="elementDesc" placeholder="介绍一下啊这个新成员吧"></textarea>
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

    export default {
        data() {
            return {
                title: '',
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
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.routerFrom = from.name
            })

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
            $(this.nextStepDom).unbind()
        },
        created() {
            this.getRankInfo()
        },
        mounted() {
            this.$nextTick(() => {
                $('.add-body').height($(window).height() - 36)
                this.nextStepDom = this.$parent.$refs.rcmHeaders.$refs.comfirm;
                $(this.nextStepDom).on('click', () => {
                    this.activeTextarea()
                })
                $(this.$refs.inputElement).on('keyup', () => {
                    let params = {}
                    params.like = this.elemenName
                    searchElementByName(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.elementList = res.data.data.data
                        }
                    }).catch(err => {
                        throw err
                    })
                })

            })
        },
        methods: {
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
                this.selectList.push(item)
                this.iconList[index] = index
                if (this.iconList[index] || this.iconList[index] == 0) {
                    this.tempArr.push(index)
                }
                this.selectList = [...new Set(this.selectList)];
            },
            activeTextarea() {
                if (this.selectList.length) {
                    this.hasTitle = false;
                } else {
                    this.hasTitle = true;
                }
                this.nextStepDom.children[0].innerText = '完成';
                $(this.nextStepDom).unbind()
                $(this.nextStepDom).on('click', () => {
                    for (let i = 0; i < this.elementList.length; i++) {
                        if (this.elemenName == this.elementList[i].element_name) {
                            this.$toast({
                                message: '该元素已存在',
                                duration: 1000,
                                position: 'middle'
                            })
                            return
                        }
                    }
                    //addElementMore
                    if (this.selectList.length == 0) {
                        uploadFile(this, this.imgFile, (res, filename) => {
                            let params = {};
                            params.element_name = this.elemenName
                            params.element_desc = this.elementDesc
                            params.ranking_id = this.$route.query.secondId
                            params.img = 'http://p8rk87lub.bkt.clouddn.com/' + filename
                            addElement(params).then(res => {
                                if (res.status == 200) {
                                    if (res.data.status_code == 1) {
                                        this.$toast({
                                            message: '发布成功',
                                            duration: 1000,
                                            position: 'middle'
                                        })
                                        this.$router.replace({
                                            name: 'secondRankList',
                                            query: this.$route.query
                                        })
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
                        })
                    } else {
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
                            addElementMore(params).then(res => {
                                if (res.status == 200 && res.data.status_code == 1) {
                                    this.$toast({
                                        message: '添加成功',
                                        duration: 1000,
                                        position: 'middle'
                                    })
                                    this.$router.replace({
                                        name: 'secondRankList',
                                        query: this.$route.query
                                    })
                                } else {
                                    this.$toast({
                                        message: res.data.message,
                                        duration: 1000,
                                        position: 'middle'
                                    })
                                }
                            }).catch(err => {
                                throw err
                            })
                        })

                    }

                })
            },
            getRankInfo() {
                let params = {};
                params.id = this.$route.query.secondId
                params.level = 2
                getRankList(params).then(res => {
                    this.title = res.data.data.ranking_name
                }).catch(err => {
                    throw err
                })
            }
        }
    }

</script>

<style scoped lang="less">
    .easy-pic {
        width: 100%;
        display: flex;
        padding-right: 20px;
        justify-content: space-between;
        align-items: center;
        .img-view {
            width: 50px;
            height: 50px;
            border-radius: 2px;
            overflow: hidden;
            margin-left: 10px;
        }
    }

    .add-element {
        width: 100%;
        .add-body {
            width: 100%;
            overflow-y: auto;
            h3 {
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
            }
            .input-box {
                width: 100%;
                border-top: 1px solid rgba(0, 0, 0, .3);
                input {
                    width: 100%;
                    height: 24px;
                    border: 0 none;
                    text-indent: 1em;
                }
            }
            .element-desc {
                width: 100%;
                border-top: 1px solid rgba(0, 0, 0, .3);
                padding: 10px;
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
                    padding: 5px 15px;
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