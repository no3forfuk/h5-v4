<template>
    <div class="ele-header">
        <div class="top">
            <div class="ele-info">
                <p @click="$emit('openDetails','')" :style="showBGC">@{{value.element_name}}</p>
                <p @click="$emit('openDetails','')">{{value.element_desc}}</p>
                <div class="more-options">
                    <p @click="vote">投一票</p>
                    <div class="new-more-option">
                        <div class="collect" @click="doCollectElement">
                            <icon :value="'&#xe62b;'" class="font-size-16" :class="{'collected':isCollect}"></icon>
                            <span :class="{'collected':isCollect}">收藏</span>
                        </div>
                        <div class="more" @click="$emit('more')">
                            <icon :value="'&#xe62f;'" class="font-size-16"></icon>
                            <span>更多</span>
                        </div>
                    </div>
                </div>
            </div>
            <img :src="value.img" alt="" v-if="value.img">
        </div>
        <div class="center">
            <div class="vote">
                <p><span ref="voteNum">{{value.vote}}</span><i>票</i></p>
                <span>{{value.vote_user}}人投票</span>
            </div>
            <!--<div class="father-rank">-->
            <!--<ul>-->
            <!--<li v-for="(item,index) in fatherData" :key="index">-->
            <!--<router-link :to="{name:'secondRankList'}">-->
            <!--<div>-->
            <!--<span>#1</span>-->
            <!--<span>289</span>-->
            <!--<span>/1120</span>-->
            <!--</div>-->
            <!--<span>2017最最最最最最打脸对白</span>-->
            <!--</router-link>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</div>-->
        </div>
        <div class="bottom">
            <div class="add-element">
                <icon :value="'&#xe685;'" class="icon"></icon>
                <span @click.stop="addPost">说点什么，参与讨论</span>
            </div>
            <div class="sort-element">
                <transition name="sort-select">
                    <ul class="sort-select" v-if="selection.selectActive">
                        <li @click="selectType(selection.selectItems[0])"
                            :class="{'selected':selection.type == 1?true:false}">
                            <span><icon :value="'&#xe608;'"></icon></span>
                            <span>最热</span>
                        </li>
                        <li @click="selectType(selection.selectItems[1])"
                            :class="{'selected':selection.type == 2?true:false}">
                            <span><icon :value="'&#xe605;'"></icon></span>
                            <span>最新</span>
                        </li>
                    </ul>
                </transition>
                <div class="sort-ctrl" @click="toggleSort">
                    <span><icon :value="'&#xe638;'"></icon></span>
                    <span v-text="selection.value"></span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {elementCollect, elementVote} from '../../api/api'

    export default {
        data() {
            return {
                fatherData: [0, 0, 0, 0, 0, 0],
                selection: {
                    selectActive: false,
                    value: '最新',
                    type: 1,
                    selectItems: [
                        {
                            text: '最热',
                            type: 1
                        },
                        {
                            text: '最新',
                            type: 2
                        }
                    ]
                },
                isCollect: false,
                showBGC: ''
            }
        },
        computed: {},
        methods: {
            selectType(val) {
                this.selection.selectActive = false;
                this.selection.value = val.text
                this.selection.type = val.type
                this.$emit('sortPost', val.type)
            },
            doCollectElement() {
                if (sessionStorage.getItem('X-Auth-Token')) {
                    elementCollect({
                        element_id: this.$route.query.elementId
                    }).then(res => {
                        if (res.status == 200) {
                            if (res.data.status_code == 1) {
                                this.$toast({
                                    message: res.data.message,
                                    duration: 1000,
                                    position: 'middle'
                                })
                                this.isCollect = !this.isCollect
                                if (this.isCollect) {
                                    this.$count(['Element_Collect', 1])
                                }
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
                } else {
                    this.$store.commit('GOLOGIN', true)
                }
            },
            toggleSort() {
                this.selection.selectActive = !this.selection.selectActive;
            },
            addPost() {
                if (sessionStorage.getItem('X-Auth-Token')) {
                    this.$count(['Element_AddPost', 1])
                    this.$emit('addPost')
                } else {
                    this.$store.commit('GOLOGIN', true)
                }

            },
            vote() {
                if (!sessionStorage.getItem('X-Auth-Token')) {
                    this.$store.commit('GOLOGIN', true)
                } else {
                    this.$count(['Element_Vote', 1])
                    elementVote({
                        element_id: this.$route.query.elementId
                    }).then(res => {
                        if (res.status == 200) {
                            if (res.data.status_code == 1) {
                                this.$toast({
                                    message: '投票成功',
                                    duration: 1000,
                                    position: 'middle'
                                })
                                this.$refs.voteNum.innerText = parseInt(this.$refs.voteNum.innerText) + 1
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
                }
            }
        },
        props: ['value'],
        watch: {
            'value.element_name'(n, o) {
                if (n) {
                    this.showBGC = {
                        backgroundColor: '#fff'
                    }
                } else {
                    this.showBGC = {
                        backgroundColor: '#ccc'
                    }
                }
            },
            'value.collect'(val) {
                if (val == 0) {
                    this.isCollect = false
                } else {
                    this.isCollect = true
                }
            }
        }
    }

</script>

<style scoped lang="less">
    .collected {
        color: #FF2C09;
    }

    .ele-header {
        width: 100%;
        .top {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: flex-start;
            padding: 10px 20px 10px 20px;
            .ele-info {
                width: 100%;
                padding-right: 17px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                position: relative;
                p:nth-child(1) {
                    font-weight: bold;
                    line-height: 24px;
                    font-size: 20px;
                    padding: 4px 0px;
                }
                p:nth-child(2) {
                    color: #939398;
                    padding: 4px 0px;
                    font-size: 13px;
                    line-height: 14px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    box-sizing: content-box;
                    overflow: hidden;
                }
                .more-options {
                    width: 100%;
                    display: inline-flex;
                    justify-content: space-between;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    align-items: center;
                    p {
                        color: #FF2C09;
                        width: 75px;
                        height: 20px;
                        text-align: center;
                        border-radius: 5px;
                        line-height: 14px;
                        font-size: 13px;
                        background-color: #E4E4E4;
                    }
                    .new-more-option {
                        display: flex;
                        flex-direction: row;
                        .collect {
                            width: 30px;
                            display: flex;
                            flex-direction: column;
                            font-size: 12px;
                            justify-content: center;
                            align-items: center;
                        }
                        .more {
                            width: 30px;
                            display: flex;
                            flex-direction: column;
                            font-size: 12px;
                            justify-content: center;
                            align-items: center;
                            margin-left: 10px;
                        }
                    }
                }
            }
            img:nth-child(2) {
                width: 102px;
                height: 102px;
                border-radius: 4px;
                flex: 0 0 27%;
            }
        }
        .center {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            padding: 10px 20px;
            height: 65px;
            .vote {
                flex: 0 0 60px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                align-items: center;
                p:nth-child(1) {
                    span {
                        font-size: 24px;
                    }
                    i {
                        font-size: 12px;
                    }
                }
                span:nth-child(2) {
                    font-size: 12px;
                    color: #8E8F93;
                }
            }
            .father-rank {
                flex: 1;
                overflow: hidden;
                padding-left: 20px;
                ul {
                    display: flex;
                    overflow-x: auto;
                    padding-bottom: 10px;
                    li {
                        margin-left: 20px;
                        a {
                            display: block;
                            display: flex;
                            white-space: nowrap;
                            flex-direction: column;
                            color: #000;
                            > div:nth-child(1) {
                                span:nth-child(1) {
                                    font-size: 24px;
                                    font-weight: bold;
                                }
                            }
                            > span:nth-child(2) {
                                color: #AEAFB2;
                                font-size: 12px;
                            }
                        }
                    }
                }

            }
        }
        .bottom {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            .add-element {
                border: 1px solid rgba(0, 0, 0, 0.2);
                display: inline-flex;
                justify-content: left;
                align-items: baseline;
                flex-direction: row;
                border-radius: 4px;
                padding: 4px 15px 5px 5px;
                .icon {
                    color: #FF2C09;
                    margin: 0 5px;
                }
                span:nth-child(2) {
                    font-size: 14px;
                    color: #939398;
                }
            }
            .sort-element {
                background-color: #fff;
                display: flex;
                flex-direction: row;
                position: relative;
                .sort-ctrl {
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    span:nth-child(1) {
                        font-size: 20px;
                        line-height: 20px;
                        text-align: center;
                    }
                    span:nth-child(2) {
                        font-size: 12px;
                    }
                }
                .sort-select {
                    display: flex;
                    flex-direction: row;
                    li {
                        display: inline-block;
                        color: #FF2C09;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 0px 3px;
                        span:nth-child(1) {
                            font-size: 16px;
                            line-height: 23px;
                        }
                        span:nth-child(2) {
                            color: #000;
                            font-size: 12px;
                            line-height: 12px;
                        }
                    }
                }
            }
        }
    }

    .sort-select-enter-active {
        animation: fadeIn 0.5s;
    }

    .sort-select-leave-active {
        animation: fadeOut 0.5s;
    }
</style>