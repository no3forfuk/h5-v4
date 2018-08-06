<template>
    <div class="tabs-div">
        <ul class="second-tabs">
            <li v-for="(item,index) in tabData"
                ref="lis"
                :class="{'scale':index == tabIndex}"
                @click="toggleTabs(index)"
                :key="index">
                {{item.title}}
                <span class="notice" v-if="index == 1 && disNum > 0">{{disNum}}</span>
            </li>
            <span class="__" :style="spanPosition"></span>
        </ul>
        <div class="second-tabs-body">
            <transition name="active-tab" mode="out-in">
                <router-view class="second-view" :value="value"
                             :totalItems="totalItems"
                             @getDisNum="setNum"
                             @sortList="sortElement"
                             @loadNextPage="updataListPage"
                             @loadAll="$emit('loadMore')"
                             @openDis="$emit('openDis')" @openAddEle="$emit('openAddEle')"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                liOffsetX: 0,
                tabIndex: 0.1,
                disNum: 0,
                tabData: [
                    {
                        title: '排名',
                        routerName: 'secondRankList'
                    },
                    {
                        title: '讨论',
                        routerName: 'secondRankDiscuss'
                    },
                    {
                        title: '活动',
                        routerName: 'secondRankActivity'
                    }
                ]
            }
        },
        methods: {
            setNum(val) {
                this.disNum = val
            },
            sortElement(val) {
                this.$emit('sortElement', val)
            },
            updataListPage(val) {
                this.$emit('nextListPage', '')
            },
            toggleTabs(i) {
                this.tabIndex = i;
                this.toggleRouter(i);
                this.setSpanPosition(i);
            },
            toggleRouter(i) {
                this.$router.replace({
                    name: this.tabData[i].routerName,
                    query: this.$route.query,
                    params: {secondList: this.value}
                })
            },
            setSpanPosition(i) {
                let width = $(this.$refs.lis[i]).width();
                let left = this.$refs.lis[i].offsetLeft;
                let X = (width - 12) / 2;
                this.liOffsetX = left + X;
            },
            init() {
                //初始化tabIndex
                for (let i = 0; i < this.tabData.length; i++) {
                    if (this.$route.name == this.tabData[i].routerName) {
                        this.setSpanPosition(i)
                        this.tabIndex = i
                    }
                }
            }
        },
        computed: {
            spanPosition() {
                return {
                    transform: 'translateX(' + this.liOffsetX + 'px)'
                }
            },
            heightSTyle() {

                return {}
            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {
                this.init()
            })
        },
        wathch: {},
        props: ['value', 'totalItems']
    }

</script>

<style scoped lang="less">
    .tabs-div {
        width: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .notice {
        color: #fff;
        background-color: #FF5151;
        height: 10px;
        font-size: 8px;
        line-height: 10px;
        border-radius: 4px;
        position: absolute;
        padding: 0 2px;
        top: -2px;
        right: 3px;
        z-index: 10;
    }

    .scale {
        transform: scale(1.2);
        color: #000 !important;
    }

    .second-tabs {
        width: 100%;
        border-bottom: 1px solid #CDCED4;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: left;
        align-items: center;
        padding: 4px 10px;
        position: relative;
        li {
            padding: 0 10px;
            font-size: 16px;
            color: #939398;
            transition: all 0.5s;
            position: relative;
        }
        .__ {
            width: 12px;
            height: 1px;
            background-color: #7D09FF;
            position: absolute;
            bottom: 0px;
            transition: all 0.5s;
        }
    }

    .active-tab-enter-active {
        animation: fadeIn 1s;
    }

    .tactive-tab-leave-active {
        animation: fadeOut 1s;
    }
</style>