<template>
    <div class="second-discuss-page">
        <div class="list-head">
            <div class="add-element" @click="activeDiscuss">
                <icon :value="'&#xe685;'" class="icon"></icon>
                <span>说点什么，参与讨论</span>
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
                discussIsOpen: false,
                wordLength: 0,
                discussText: '',
                page: 1,
                crtPage: 1,
                discussList: [],
                isVisitor: false,
                type: '',
                userName: '',
                userImg: '',
                totalDis: 0
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
                    this.$emit('getDisNum', res.data.total)
                    this.totalPage = res.data.last_page
                    this.crtPage = res.data.current_page
                    this.discussList = this.discussList.concat(res.data.data)
                    this.$store.commit('SET_GETDISCUSS', false)
                    this.sort(1)
                }, err => {
                    return
                }, params)
            },
            selectType(val) {
                this.selection.selectActive = false;
                this.selection.value = val.text
                this.selection.type = val.type
                this.sort(val.type)
            },
            sort(type) {
                if (type == 1) {
                    this.discussList = this.discussList.sort((a, b) => {
                        return b.like - a.like
                    })
                    return
                }
                if (type == 2) {
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
        },
        props: ['value']
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