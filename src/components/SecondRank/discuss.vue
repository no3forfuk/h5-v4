<template>
    <div>
        <div class="list-head">
            <div class="add-element" @click="activeDiscuss">
                <icon :value="'&#xe685;'" class="icon"></icon>
                <span>说点什么，参与讨论</span>
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
        <discuess-list ref="discuessList" :value="discussList"></discuess-list>
        <transition name="discuss">
            <div class="add-discuss" v-show="discussIsOpen">
                <rcm-header>
                    <span slot="back" @click.stop="cancelDiscuss" class="color-cancel">取消</span>
                    <span slot="right" @click.stop="confirmDiscuss" class="color-cancel">完成</span>
                </rcm-header>
                <div class="discuss-body">
                    <div class="discuss-user">
                        <div class="left">
                            <img src="http://p9w69x04q.bkt.clouddn.com/you.jpg" alt="">
                            <span>广东猎人</span>
                        </div>
                        <span class="right" v-if="isVisitor" @click="goRegister">注册并享受更多好礼</span>
                    </div>
                    <div class="discuss-content">
                        <textarea v-model="discussText" ref="discussTextarea" id="discussTextarea"></textarea>
                        <span style="color: #D3D3D3;">{{wordLength}}/350</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import discuessList from './discuessList'
    import {addComment, getDiscussList} from '../../api/api'

    export default {
        data() {
            return {
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
                discussIsOpen: false,
                wordLength: 0,
                discussText: '',
                page: 1,
                crtPage: 1,
                discussList: [],
                isVisitor: false,
                type: ''
            }
        },
        created() {
            this.getRankDiscuss()
            if (sessionStorage.getItem('X-Auth-Token')) {
                this.isVisitor = false
                this.type = 1
            } else {
                this.isVisitor = true
                this.type = 2
            }
        },
        methods: {
            goRegister() {
                this.$router.push({
                    name: 'register',
                    query: this.$route.query
                })
            },
            getRankDiscuss() {
                this.$indicator.open({
                    text: '加载中',
                    spinnerType: 'fading-circle'
                })
                let params = {};
                params.level = 2;
                params.page = this.page;
                params.id = this.$route.query.secondId;
                getDiscussList(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.totalPage = res.data.data.last_page
                            this.crtPage = res.data.data.current_page
                            this.discussList = this.discussList.concat(res.data.data.data)
                            this.$indicator.close()
                        } else {

                        }

                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            },
            sort(type) {
                if (type == 0) {
                    this.discussList = this.discussList.sort((a, b) => {
                        return b.like - a.like
                    })
                    return
                }
                if (type == 1) {
                    this.discussList = this.discussList.sort((a, b) => {
                        let strA = a.updated_at.replace(/\-/g, '/');
                        let strB = b.updated_at.replace(/\-/g, '/');
                        let msA = new Date(strA).getTime()
                        let msB = new Date(strB).getTime()
                        return msB - msA
                    })
                    return
                }
            },
            toggleSort() {
                this.selection.selectActive = !this.selection.selectActive;
            },
            toggleSelect(i) {
                this.selection.selectActive = false;
                this.selection.value = this.selection.selectItems[i].text;
                this.sort(i)
            },
            activeDiscuss() {
                this.discussIsOpen = true;
            },
            cancelDiscuss() {
                this.discussIsOpen = false;
            },
            getTextareaFocus() {

            },
            confirmDiscuss() {
                if (this.discussText.length == 0) {
                    this.$toast({
                        message: '评论不能为空',
                        duration: 1000,
                        position: 'middle'
                    })
                    return
                }
                let params = {};
                params.content = this.discussText;
                params.comment_type = 2;
                params.ranking_id = parseInt(this.$route.query.secondId);
                params.type = this.type;
                addComment(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.getRankDiscuss()
                            this.discussText = ''
                            this.discussIsOpen = false;
                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            }

        },
        watch: {
            discussText(n, o) {
                this.wordLength = n.length;
            }
        },
        components: {
            discuessList
        }
    }

</script>

<style scoped lang="less">
    .list-head {
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
            flex: 0 0 24px;
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
                background-color: #fff;
                position: absolute;
                right: 0px;
                top: 40px;
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

    .add-discuss {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 100;
        .discuss-body {
            padding: 10px;
            .discuss-user {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                padding-bottom: 10px;
                .left {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: left;
                    align-items: center;
                    img {
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                    }
                    span {
                        margin-left: 10px;
                    }
                }
                .right {
                    padding: 2px 5px;
                    background-color: #E4E4E4;
                    color: #FF2C09;
                    font-weight: bold;
                    border-radius: 4px;
                }
            }
            .discuss-content {
                position: relative;
                width: 100%;
                height: 90px;
                border-radius: 6px;
                overflow: hidden;
                border: 1px solid #D6D6D6;
                padding: 1px 5px;
                textarea {
                    display: block;
                    width: 100%;
                    height: 80%;
                    border: 0 none;
                    resize: none;
                    border-radius: 7px;
                    font-size: 14px;
                }
                span {
                    position: absolute;
                    right: 3px;
                    bottom: 0;
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

    .discuss-enter-active {
        animation: slideInUp 0.4s;
        position: absolute;
    }

    .discuss-leave-active {
        animation: slideOutDown 0.4s;
        position: absolute;
    }
</style>