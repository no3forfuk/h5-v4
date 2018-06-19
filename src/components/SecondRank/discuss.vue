<template>
    <div>
        <div class="list-head">
            <div class="add-element">
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
        <discuess-list></discuess-list>
    </div>
</template>

<script>
    import discuessList from './discuessList'

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
            }
        },
        methods: {
            toggleSort() {
                this.selection.selectActive = !this.selection.selectActive;
            },
            toggleSelect(i) {
                this.selection.selectActive = false;
                this.selection.value = this.selection.selectItems[i].text;
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
                position: absolute;
                right: 0px;
                top: 40px;
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

    .sort-select-enter-active {
        animation: fadeIn 0.5s;
        position: absolute;
    }

    .sort-select-leave-active {
        animation: fadeOut 0.5s;
        position: absolute;
    }
</style>