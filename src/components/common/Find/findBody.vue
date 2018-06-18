<template>
    <div class="header-find">
        <span class="prevmask" v-if="leftBoundary"></span>
        <span class="nextmask" v-if="rightBoundary"></span>
        <div class="find-nav" @scroll="navScroll">
            <ul class="li-buffer">
                <li v-for="(item,index) in rankData"
                    ref="lis"
                    :class="{scalePulse:crtIndex == index}"
                    @click="toggleLi(index)"
                    :key="index">
                    {{item.name}}
                </li>
                <span :style="spanPosition"></span>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getFirstRank} from '../../../api/api'

    export default {
        data() {
            return {
                crtIndex: 0,
                crtPositon: 0,
                leftBoundary: true,
                rightBoundary: false,
                rankData: [
                    {
                        name: '热门榜单',
                        id: 1
                    },
                    {
                        name: '最热',
                        id: 2
                    },
                    {
                        name: '最冷门',
                        id: 3
                    },
                    {
                        name: '动漫',
                        id: 4
                    },
                    {
                        name: 'NBA',
                        id: 5
                    },
                    {
                        name: '世界杯',
                        id: 6
                    },
                    {
                        name: '热门榜单',
                        id: 7
                    },
                    {
                        name: '热门榜单',
                        id: 8
                    },
                    {
                        name: '热门榜单',
                        id: 9
                    }

                ]
            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {
                this.setCrtPosition(0);
                this.initUlWidth()
                this.judgeBoundary()

            })
        },
        methods: {
            toggleLi(i) {
                this.crtIndex = i;
            },
            initCrtPosition() {

                for (let i = 0; i < rankData.length; i++) {

                }
            },
            getFirstRank() {
                const params = {};
                params.id = 3;
                params.level = 1;
                params.page = 1;
                getFirstRank(params).then(res => {
                    console.log(res);
                }).catch(err => {
                    throw err;
                })
            },
            navScroll() {
                this.judgeBoundary()
            },
            initUlWidth() {
                let lastLiWidth = $(this.$refs.lis[(this.rankData.length - 1)]).width();
                let lastLiLeft = this.$refs.lis[(this.rankData.length - 1)].offsetLeft;
                let width = lastLiWidth + lastLiLeft;
                $('.li-buffer').width(width);
            },
            setCrtPosition(i) {
                let width = $(this.$refs.lis[i]).width();
                let left = this.$refs.lis[i].offsetLeft;
                let X = (width - 12) / 2;
                this.crtPositon = left + X;
                // console.log(this.navScrollPosition);
            },
            setSelectLiPosition(i) {
                //TODO
                //点击li使li居中
            },
            judgeBoundary(i) {
                let ulWidth = $('.li-buffer').width();
                let windowWidth = $(window).width();
                let rightOffset = ulWidth - windowWidth + 10;
                let scrollX = parseInt($('.find-nav').scrollLeft());
                if (scrollX > 10) {
                    this.leftBoundary = true;
                } else {
                    this.leftBoundary = false;
                }
                if (scrollX < rightOffset) {
                    this.rightBoundary = true;
                } else {
                    this.rightBoundary = false;
                }

            }
        },
        computed: {
            spanPosition() {
                return {
                    transform: 'translateX(' + this.crtPositon + 'px)'
                }
            },
            navScrollPosition() {
                let x = parseInt($('.find-nav').scrollLeft());
                return x
            }
        },
        watch: {
            crtIndex(n, o) {
                this.setCrtPosition(n);
                this.setSelectLiPosition(n);
                this.judgeBoundary()
                this.getFirstRank()
            }
        }
    }

</script>

<style scoped lang="less">
    .scalePulse {
        animation: pulse 0.7s;
    }

    .header-find {
        width: 100%;
        overflow: hidden;
        position: relative;
        height: 26px;
        .nextmask {
            width: 40px;
            position: absolute;
            display: block;
            height: 26px;
            background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
            z-index: 1;
            right: 0;
            top: 0;
        }
        .prevmask {
            width: 40px;
            position: absolute;
            display: block;
            height: 26px;
            background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
            z-index: 1;
            left: 0;
            top: 0;
        }
        .find-nav {
            width: 100%;
            overflow-x: auto;
            padding-bottom: 6px;
            padding-left: 10px;
            position: relative;
            ul {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: left;
                align-items: baseline;
                font-size: 16px;
                position: relative;
                padding-bottom: 6px;
                transition: all 0.5s;
                span {
                    display: block;
                    width: 12px;
                    height: 1px;
                    background-color: #7D09FF;
                    position: absolute;
                    bottom: 9px;
                    transition: all 0.5s;
                    z-index: 2;
                }
                li {
                    white-space: nowrap;
                    margin-right: 20px;
                    width: auto;
                }
            }
        }

    }
</style>