<template>
    <div class="second-discuss-page">
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
                <transition name="sort-select-type">
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
    </div>
</template>

<script>
    import discuessList from './discuessList'
    import {addComment, getDiscussList} from '../../api/api'
    import {SVS_getDiscussList} from '../../Servers/API'

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
                type: '',
                userName: '',
                userImg: ''
            }
        },
        created() {
            this.getRankDiscuss()
            if (sessionStorage.getItem('X-Auth-Token')) {
                this.isVisitor = false
                this.type = 1
                let user = this.$storage.GET_session('userInfo')
                this.userName = user.name
                this.userImg = user.avatar
            } else {
                this.isVisitor = true
                this.type = 2
            }
        },
        methods: {
            getRankDiscuss() {
                let params = {};
                params.level = 2;
                params.page = this.page;
                params.id = this.$route.query.secondId;
                SVS_getDiscussList(res => {
                    this.totalPage = res.data.last_page
                    this.crtPage = res.data.current_page
                    this.discussList = this.discussList.concat(res.data.data)
                    this.$store.commit('SET_GETDISCUSS', false)
                }, err => {
                    return
                }, params)
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
                this.$emit('openDis')
            }
        },
        watch: {
            discussText(n, o) {
                this.wordLength = n.length;
            },
            '$store.getters.GET_GETDISCUSS'(val) {
                if (val) {
                    this.discussList = []
                    this.discussText = ''
                    this.getRankDiscuss()
                } else {
                    return
                }
            }

        },
        components: {
            discuessList
        }
    }

</script>

<style scoped lang="less">
    .second-discuss-page {
        width: 100%;
        overflow: hidden;
    }

    .list-head {
        width: 100%;
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
        position: fixed;
        top: 0;
        left: 0;
        background-color: #fff;
        z-index: 900;
        .discuss-body {
            width: 100%;
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
    }

    .sort-select-leave-active {
        animation: fadeOut 0.5s;
    }

    .discuss-sort-enter-active {
        animation: slideInUp 0.4s;
    }

    .discuss-sort-leave-active {
        animation: slideOutDown 0.4s;
    }
</style>