<template>
    <div class="tabs-div">
        <ul class="second-tabs">
            <li v-for="(item,index) in tabData"
                ref="lis"
                :class="{'scale':index == tabIndex}"
                @click="toggleTabs(index)"
                :key="index">
                {{item.title}}
            </li>
            <span class="__" :style="spanPosition"></span>
        </ul>
        <!--<transition name="transitionName" mode="out-in">-->
        <router-view class="second-view" :value="value" @loadNextPage="updataListPage"></router-view>
        <!--</transition>-->
    </div>
</template>

<script>

    export default {
        data() {
            return {
                liOffsetX: 0,
                tabIndex: 0.1,
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
        props: ['value']
    }

</script>

<style scoped lang="less">
    .tabs-div {
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }

    .scale {
        transform: scale(1.2);
    }

    .second-tabs {
        width: 100%;
        border-bottom: 1px solid #CDCED4;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: left;
        align-items: center;
        padding: 0 10px;
        position: relative;
        li {
            padding: 0 10px;
            transition: all 0.5s;
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

    .transitionName-enter-active {
        animation: fadeIn 0.3s;
        position: absolute;
    }

    .transitionName-leave-active {
        animation: fadeOut 0.3s;
        position: absolute;
    }
</style>