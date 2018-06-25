<template>
    <div class="tabs">
        <ul>
            <li v-for="(item,index) in tabData"
                ref="lis"
                :key="index"
                @click="toggleTab(index)">
                {{item.title}}
            </li>
            <span :style="spanPosition"></span>
        </ul>
        <transition name="transitonName" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                liOffsetX: 2,
                tabData: [
                    {
                        title: '全部',
                        routerName: 'myselfAll',
                        index: 0
                    },
                    {
                        title: '评论',
                        routerName: 'myselfComment',
                        index: 1
                    },
                    {
                        title: '建榜',
                        routerName: 'myselfBuildRank',
                        index: 2
                    },
                    {
                        title: '调查',
                        routerName: 'myselfExamine',
                        index: 3
                    },
                    {
                        title: '帖子',
                        routerName: 'myselfPost',
                        index: 4
                    }
                ],
                tabIndex: 0.1
            }
        },
        methods: {
            //切换路由
            toggleRouter(i) {
                const routerName = this.tabData[i].routerName;
                this.$router.replace({name: routerName})
            },
            //切换tab页签
            toggleTab(i) {
                this.tabIndex = i;
            },
            //设置下标span位置
            setSpanPosition(i) {
                if (i < 0) return
                let width = $(this.$refs.lis[i]).width();
                let left = this.$refs.lis[i].offsetLeft - 20;
                let X = (width - 16) / 2;
                this.liOffsetX = left + X;
            },
            //初始化下标span位置
            initSpanPosition() {
                for (let i = 0; i < this.tabData.length; i++) {
                    if (this.$route.name == this.tabData[i].routerName) {
                        this.setSpanPosition(i)
                        this.tabIndex = i;
                        break;
                    } else {
                        this.tabIndex = 0;
                    }
                }
            },
            //左右滑动切换路由
            slideToggle() {
                let idx = this.tabIndex;
                let changeRange;
                $('.tabs-view').on('touchstart', e => {
                    e.preventDefault()
                    //记录手指进入位置和span的位置
                    let enterX = e.changedTouches[0].pageX;
                    let crtX = this.liOffsetX;
                    //添加手指移动事件
                    $('.tabs-view').on('touchmove', e => {
                        e.preventDefault()
                        //获取移动距离
                        let changeX = e.changedTouches[0].pageX - enterX;
                        //定义移动比例
                        let rate = $(window).width() / ($(this.$refs.lis[idx]).width() + 20);
                        changeRange = changeX / rate;
                        this.liOffsetX = crtX + changeRange;
                    })
                })
                //添加手指离开事件
                $('.tabs-view').on('touchend', e => {
                    e.preventDefault()
                    if (changeRange > 10 && this.tabIndex > 0) {
                        this.tabIndex--;
                    }
                    if (changeRange < -10 && this.tabIndex + 1 < this.tabData.length) {
                        this.tabIndex++;
                    }
                    this.setSpanPosition(this.tabIndex)
                })
            }

        },
        mounted() {
            this.$nextTick(() => {
                this.initSpanPosition()
                this.slideToggle()
            })
        },
        computed: {
            //span动态位置
            spanPosition() {
                return {
                    transform: 'translateX(' + this.liOffsetX + 'px)'
                }
            }
        },
        watch: {
            tabIndex(n, o) {
                if (n < 0) return
                if (n + 1 > this.tabData.length) return
                this.toggleRouter(n)
                this.setSpanPosition(n)
            }
        }
    }

</script>

<style scoped lang="less">
    .transitonName-enter-active {
        animation: fadeIn 0.2s;
    }

    .transitonName-leave-active {
        animation: fadeOut 0.2s;
    }

    .router-view {
        width: 100%;
    }

    .tabs-view {
        width: 100%;

    }

    .tabs {
        width: 100%;
        padding: 10px 0px;
        ul {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            padding: 0 20px;
            border-bottom: 1px solid #CDCED4;
            position: relative;
            span {
                display: block;
                width: 16px;
                height: 1px;
                background-color: #7D09FF;
                position: absolute;
                bottom: 0px;
                transition: all 0.5s;
            }
            li {
                margin-right: 20px;
                white-space: nowrap;
            }
        }
    }
</style>