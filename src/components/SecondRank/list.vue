<template>
    <div class="second-list-root">
        <div class="list-head">
            <div class="add-element" @click="addElement">
                <icon :value="'&#xe685;'" class="icon"></icon>
                <span>添加新的排名</span>
            </div>
            <div class="sort-element">
                <div class="sort-ctrl" @click.stop="toggleSort">
                    <span><icon :value="'&#xe638;'"></icon></span>
                    <span v-text="selection.value"></span>
                </div>
                <transition name="sort-select">
                    <ul class="sort-select" v-if="selection.selectActive">
                        <span class="sanjiao"></span>
                        <li @click.stop="toggleSelect(index)"
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
        <div class="second-list-body">
            <mt-loadmore :bottom-method="loadBeforeDay"
                         :bottom-all-loaded="allLoaded"
                         :bottomDistance="pullHeight"
                         :auto-fill="false"
                         ref="loadmore">
                <ul class="list-body">
                    <cell v-for="(item,index) in value"
                          :value="item"
                          :index="index"
                          :key="index"></cell>
                    <div class="index-footer">
                        <p>每个榜单都会发现不同的玩法</p>
                    </div>
                </ul>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import cell from './listCell'

    export default {
        data() {
            return {
                allLoaded: false,
                pullHeight: 20,
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
        mounted() {
            this.$nextTick(() => {

            })
        },
        updated() {

        },
        created() {

        },
        methods: {
            sort(type) {
                if (type == 0) {
                    this.value = this.value.sort((a, b) => {
                        return b.exponent - a.exponent
                    })
                    return
                }
                if (type == 1) {
                    this.value = this.value.sort((a, b) => {
                        let strA = a.updated_at.replace(/\-/g, '/');
                        let strB = b.updated_at.replace(/\-/g, '/');
                        let msA = new Date(strA).getTime()
                        let msB = new Date(strB).getTime()
                        return msB - msA
                    })
                    return
                }
            },
            loadBeforeDay() {
                this.$emit('loadNextPage', 'a')
                this.$refs.loadmore.onBottomLoaded();
            },
            addElement() {
                if (sessionStorage.getItem('X-Auth-Token')) {
                    this.$count(['Ranking_Lv2_AddElement', 1])
                    this.$emit('openAddEle')
                } else {
                    this.$store.commit('GOLOGIN', true)
                }
            },
            toggleSort() {
                this.selection.selectActive = !this.selection.selectActive;
            },
            toggleSelect(i) {
                this.$count(['Ranking_Lv2_Sort_Element', 1])
                this.selection.selectActive = false;
                this.selection.value = this.selection.selectItems[i].text;
                this.sort(i)
            }
        },
        components: {
            cell
        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .second-list-root {
        width: 100%;
        overflow: hidden;
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
                    z-index: 100;
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
        .second-list-body {
            width: 100%;
            overflow-x: hidden;
            overflow-y: hidden;
        }
        .index-footer {
            width: 100%;
            height: 80px;
            margin-top: 10px;
            p {
                width: 100%;
                color: #C8C7CD;
                text-align: center;
                font-size: 12px;
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