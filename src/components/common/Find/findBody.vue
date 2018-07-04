<template>
    <div class="header-find">
        <span class="prevmask" v-if="leftBoundary"></span>
        <span class="nextmask" v-if="rightBoundary"></span>
        <div class="find-nav" @scroll="navScroll">
            <ul class="li-buffer">
                <li v-for="(item,index) in rankData"
                    ref="lis"
                    :class="{scalePulse:crtIndex == index}"
                    @click="toggleLi(index,item)"
                    :key="index">
                    {{item.ranking_name}}
                </li>
                <span :style="spanPosition"></span>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getFirstRankList} from '../../../api/api'

    export default {
        data() {
            return {
                crtIndex: 0,
                crtPositon: 0,
                leftBoundary: false,
                rightBoundary: false,
                rankData: []
            }
        },
        created() {
            this.getListInfo()
        },
        mounted() {

        },
        updated() {

        },
        methods: {
            toggleLi(i, item) {
                this.crtIndex = i;
                this.$emit('getRankIndex', {
                    index: i,
                    value: item
                })
            },
            getListInfo() {
                getFirstRankList().then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.rankData = res.data.data.data
                            this.rankData.unshift({ranking_name: '热门榜单'})
                        } else {

                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
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
                // this.judgeBoundary(n);
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