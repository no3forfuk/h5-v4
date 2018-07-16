<template>
    <div class="ele-header">
        <div class="top">
            <div class="ele-info">
                <p @click="$emit('openDetails','')" :style="showBGC">@{{value.element_name}}</p>
                <p @click="$emit('openDetails','')">{{value.element_desc}}</p>
                <p @click="vote">投一票</p>
                <div class="more-options">
                    <div class="collect" @click="doCollectElement">
                        <icon :value="'&#xe62b;'" class="font-size-16" :class="{'collected':isCollect}"></icon>
                        <span :class="{'collected':isCollect}">收藏</span>
                    </div>
                    <div class="more">
                        <icon :value="'&#xe62f;'" class="font-size-16"></icon>
                        <span>更多</span>
                    </div>
                </div>
            </div>
            <img :src="value.img" alt="" v-if="value.img">
        </div>
        <div class="center">
            <div class="vote">
                <p><span>{{value.vote}}</span><i>票</i></p>
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
                <div class="sort-ctrl" @click="toggleSort">
                    <span><icon :value="'&#xe638;'"></icon></span>
                    <span v-text="selection.value"></span>
                </div>
                <transition name="sort-select" mode="in-out">
                    <ul class="sort-select" v-if="selection.selectActive">
                        <span class="sanjiao"></span>
                        <li @click="toggleSelect(index)"
                            :key="index"
                            v-for="(item,index) in selection.selectItems">
                            <span>{{item.text}}</span>
                            <icon :value="'&#xe680;'"
                                  v-if="selection.value == item.text">
                            </icon>
                        </li>
                    </ul>
                </transition>
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
                    value: '最热',
                    selectItems: [
                        {
                            text: '最热'
                        },
                        {
                            text: '最新'
                        }
                    ]
                },
                isCollect: false,
                showBGC: ''
            }
        },
        computed: {},
        methods: {
            initCollectState(val) {
                if (val) {
                    this.isCollect = true
                } else {
                    this.isCollect = false
                }
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
            toggleSelect(i) {
                this.selection.selectActive = false;
                this.selection.value = this.selection.selectItems[i].text;
                this.$emit('sortPost', i)
            },
            addPost() {
                if (sessionStorage.getItem('X-Auth-Token')) {
                    this.$router.push({
                        name: 'addPost',
                        query: this.$route.query
                    })
                } else {
                    this.$store.commit('GOLOGIN', true)
                }

            },
            vote() {
                if (!sessionStorage.getItem('X-Auth-Token')) {
                    this.$store.commit('GOLOGIN', true)
                } else {
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
            align-items: center;
            padding: 10px 20px;
            .ele-info {
                padding-right: 15px;
                overflow: hidden;
                position: relative;
                .more-options {
                    position: absolute;
                    right: 10px;
                    bottom: 0px;
                    z-index: 2;
                    display: inline-flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
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
                p:nth-child(1) {
                    font-weight: bold;
                    line-height: 24px;
                    font-size: 20px;
                    transition: all 1s;
                }
                p:nth-child(2) {
                    color: #939398;
                    margin: 5px 0;
                    max-height: 60px;
                    overflow: hidden;
                }
                p:nth-child(3) {
                    color: #FF2C09;
                    margin-top: 20px;
                    width: 80px;
                    text-align: center;
                    border-radius: 6px;
                    padding: 4px 18px;
                    background-color: #E4E4E4;
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
                position: relative;
                background-color: #fff;
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
                    width: 66px;
                    height: 40px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    position: absolute;
                    right: 0px;
                    top: 40px;
                    background-color: #fff;
                    z-index: 100;
                    .sanjiao {
                        display: block;
                        width: 10px;
                        height: 10px;
                        border-top: 1px solid rgba(0, 0, 0, 0.1);
                        border-right: 1px solid rgba(0, 0, 0, 0.1);
                        background-color: #fff;
                        position: absolute;
                        top: -5px;
                        right: 10px;
                        transform: rotate(-45deg);
                    }
                    li {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        justify-content: space-between;
                        align-items: baseline;
                        span {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

    .sort-select-enter-active {
        animation: fadeIn 0.5s;
        position: absolute;
    }

    .sort-select-leave-active {
        animation: fadeOut 0.5s;
        position: absolute;
    }
</style>