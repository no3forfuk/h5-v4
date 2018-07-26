<template>
    <div class="add-element">
        <div class="add-header">
            <div class="add-left" @click="$emit('cancle')">
                <span style="color: #FF2C09;">取消</span>
            </div>
            <div class="add-right font-size-16" style="color: #FF2C09;" @click="$emit('confirmAddRank',selectList)">
                完成
            </div>
        </div>
        <div class="add-body">
            <h3>#{{value.ranking_name}}</h3>
            <div class="input-box">
                <input type="text" placeholder="为这个榜单添加新的成员" v-model="elemenName" @keyup="searchElement">
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
    import {searchElementByName} from '../../api/api'

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
                routerFrom: ''
            }
        },
        methods: {
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
            }
        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .add-element {
        width: 100%;
        height: 90%;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 600;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
        background-color: #fff;
        .add-header {
            display: flex;
            padding: 10px 20px;
            flex-direction: row;
            justify-content: space-between;
        }
        .add-body {
            width: 100%;
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