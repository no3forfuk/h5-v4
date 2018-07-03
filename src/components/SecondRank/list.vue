<template>
    <div>
        <div class="list-head">
            <div class="add-element" @click="addElement">
                <icon :value="'&#xe685;'" class="icon"></icon>
                <span>添加新的排名</span>
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
        <ul class="list-body">
            <cell v-for="(item,index) in $parent.value.data"
                  :value="item"
                  :index="index"
                  :key="index"></cell>
        </ul>
    </div>
</template>

<script>
    import cell from './listCell'

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
        created() {

        },
        methods: {
            getList() {

            },
            addElement() {
                this.$router.push({name: 'addElement'})
            },
            toggleSort() {
                this.selection.selectActive = !this.selection.selectActive;
            },
            toggleSelect(i) {
                this.selection.selectActive = false;
                this.selection.value = this.selection.selectItems[i].text;
            }
        },
        components: {
            cell
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
            background-color: #fff;
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
                background-color: #fff;
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

    .list-body {
        width: 100%;
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