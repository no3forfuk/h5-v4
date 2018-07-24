<template>
    <div class="add-rank-page">
        <div class="add-rank-header">
            <span @click="$emit('cancel')">取消</span>
            <span @click="comfirmAddRank">完成</span>
        </div>
        <div class="input-rank-name">
            <span>#</span>
            <input type="text" placeholder="榜单好玩重要，名字帅更重要" v-model="rankName">
        </div>
        <div class="input-rank-desc">
            <textarea v-model="rankDesc" placeholder="让大家快速GET到有趣的点"></textarea>
        </div>
        <transition name="slide-select">
            <scroll-select @change="getFatherId" v-if="selectFather" @comfirm="confirmSelectFather"></scroll-select>
        </transition>
        <transition name="slide-element">
            <add-element v-show="nextAddElemet"
                         :value="{'ranking_name':rankName}"
                         @confirmAddRank="addElementList"
                         @cancle="cancleAddElement"></add-element>
        </transition>
    </div>
</template>

<script>
    import {addRank, addElementMore} from '../../api/api'
    import scrollSelect from './scrollSelect'
    import addElement from './addRankElement'

    export default {
        data() {
            return {
                rightDom: '',
                rankName: '',
                rankDesc: '',
                fatherId: '',
                selectFather: false,
                nextAddElemet: false,
                newSecondId: ''
            }
        },
        methods: {
            comfirmAddRank() {
                if (this.rankName == '') {
                    this.$toast({
                        message: '榜单名不能为空',
                        duration: 1000,
                        position: 'middle'
                    })
                    return
                }
                if (this.rankDesc == '') {
                    this.$toast({
                        message: '请填写榜单描述',
                        duration: 1000,
                        position: 'middle'
                    })
                    return
                }
                if (this.fatherId) {
                    let params = {};
                    params.ranking_name = this.rankName
                    params.ranking_desc = this.rankDesc
                    params.ranking_pid = this.fatherId
                    addRank(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.$toast({
                                message: '添加成功',
                                duration: 1000,
                                position: 'middle'
                            })
                            this.newSecondId = res.data.data.ranking_id
                            this.nextAddElemet = true
                        } else {
                            this.$toast({
                                message: res.data.message,
                                duration: 1000,
                                position: 'middle'
                            })
                        }
                    }).catch(err => {
                        return
                    })
                } else {
                    this.selectFather = true
                }
            },
            addElementList(val) {
                if (val.length > 0) {
                    let arr = []
                    for (let i = 0; i < val.length; i++) {
                        arr.push(val[i].id)
                    }
                    let str = arr.join(',')
                    let params = {
                        ranking_id: this.newSecondId,
                        list: str
                    }
                    addElementMore(params).then(res => {
                        if (res.status == 200 && res.data.status_code == 1) {
                            this.$toast({
                                message: '添加成功',
                                duration: 1000,
                                position: 'middle'
                            })
                            this.$emit('cancel')
                            this.$router.push({
                                name: 'secondRankList',
                                query: {
                                    secondId: this.newSecondId,
                                    firstId: this.fatherId,
                                }
                            })
                        } else {
                            this.$toast({
                                message: res.data.message,
                                duration: 1000,
                                position: 'middle'
                            })
                        }
                    }).catch(err => {
                        return
                    })
                } else {
                    this.$emit('cancel')
                    this.$router.push({
                        name: 'secondRankList',
                        query: {
                            secondId: this.newSecondId,
                            firstId: this.fatherId,
                        }
                    })
                }
            },
            submitAddRank(val) {
                let params = {};
                params.ranking_desc = this.rankDesc
                params.ranking_pid = this.fatherId
                addRank(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.$toast({
                                message: '添加成功',
                                duration: 1000,
                                position: 'middle'
                            })
                            this.$router.push({
                                name: 'secondRankList',
                                query: {
                                    secondId: res.data.data.ranking_id,
                                    firstId: this.fatherId
                                }
                            })
                        } else {

                        }
                    } else {
                        this.$toast({
                            message: '网络异常',
                            duration: 1000,
                            position: 'middle'
                        })
                    }
                }).catch(err => {
                    this.$toast({
                        message: '网络异常',
                        duration: 1000,
                        position: 'middle'
                    })
                })
                this.nextAddElemet = false
            },
            cancleAddElement() {
                this.$emit('cancel')
                this.$router.push({
                    name: 'secondRankList',
                    query: {
                        secondId: this.newSecondId,
                        firstId: this.fatherId,
                    }
                })
            },
            confirmSelectFather() {
                this.selectFather = false
            },
            getFatherId(val) {
                this.fatherId = val.id
            }
        },
        components: {
            scrollSelect,
            addElement
        }
    }

</script>

<style scoped lang="less">
    .add-rank-page {
        width: 100%;
        .add-rank-header {
            padding: 10px 20px;
            color: #FF2C09;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
    }

    .input-rank-name {
        width: 100%;
        padding: 10px 20px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: left;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        input {
            border: 0 none;
            display: inline-block;
            width: 100%;
            background-color: #fff;
            text-indent: 5px;
        }
    }

    .input-rank-desc {
        width: 100%;
        height: 80px;
        padding: 10px 20px;
        textarea {
            border: 0 none;
            width: 100%;
            text-indent: 5px;
        }
    }

    .slide-select-enter-active {
        animation: slideInUp 0.4s;
        position: absolute;
    }

    .slide-select-leave-active {
        animation: slideOutDown 0.4s;
        position: absolute;
    }

    .slide-element-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    .slide-element-leave-active {
        animation: slideOutRight 0.4s;
        position: absolute;
    }
</style>