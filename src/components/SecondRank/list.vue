<template>
    <div class="second-list-root">
        <div class="list-head">
            <div class="add-element" @click="addElement">
                <icon :value="'&#xe685;'" class="icon"></icon>
                <span>添加新的排名</span>
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
                <div class="sort-ctrl" @click.stop="toggleSort">
                    <span><icon :value="'&#xe638;'"></icon></span>
                    <span v-text="selection.value"></span>
                </div>
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
                          :total="totalItems"
                          :showborder="showborder"
                          @loadMore="loadMoreElement"
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
                allLoaded: true,
                pullHeight: 20,
                showborder: false,
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
            loadMoreElement() {
                this.allLoaded = false
                this.showborder = true
                this.$emit('loadAll')
            },
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
            selectType(val) {
                this.$count(['Ranking_Lv2_Sort_Element', 1])
                this.selection.selectActive = false;
                this.selection.value = val.text
                this.selection.type = val.type
                this.$emit('sortList', val.type)
            }
        },
        components: {
            cell
        },
        props: ['value', 'totalItems']
    }

</script>

<style scoped lang="less">
    .selected {
        background-color: rgba(0, 0, 0, .2) !important;
    }

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
            padding: 7px 20px;
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
                        color: #777;
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