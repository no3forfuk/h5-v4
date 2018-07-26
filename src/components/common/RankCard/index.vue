<template>
    <div class="rank-card">
        <div class="hot-level">
            <span>{{renderData.rating?renderData.rating[0]:'C'}}<sup
                    v-if="renderData.rating">{{renderData.rating[1]}}</sup></span>
        </div>
        <div class="rank-info">
            <router-link
                    :to="{name:'secondRankList',query:{secondId:renderData.id,firstId:$route.query.firstId,idx:$route.query.idx}}">
                <h3 @click="goSecondRank">#{{renderData.ranking_name}}</h3>
            </router-link>
            <div class="info-body">
                <span class="prevmask" v-if="leftBoundary"></span>
                <span class="nextmask" v-if="rightBoundary"></span>
                <ul class="info-ul" @scroll="judgeBoundary">
                    <li v-for="(item,index) in renderData.data" :key="index"
                        ref="lis">
                        <router-link
                                :to="{name:'element',query:{elementId:item.id,secondId:renderData.id,firstId:$route.query.firstId,idx:$route.query.idx}}">
                            <i>No.{{index+1}}</i>
                            <div class="element-item" @click="goSecondRank">
                                <span v-if="!item.img">{{item.element_name}}</span>
                                <img :src="item.img" alt="" v-if="item.img">
                            </div>
                        </router-link>
                    </li>
                    <li ref="more">
                        <router-link
                                :to="{name:'secondRankList',query:{secondId:renderData.id,firstId:$route.query.firstId,idx:$route.query.idx}}">

                            <div class="element-item" @click="goSecondRank">
                                <span>更多...</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {timeFormat, inheritObject} from '../../../utils'

    export default {
        data() {
            return {
                leftBoundary: false,
                rightBoundary: true,
                query: '',
                renderData: {},
                defaultData: {
                    asterisk: 0,
                    created_at: timeFormat('-'),
                    data: [],
                    exponent: 0,
                    id: NaN,
                    img: '',
                    is_check: 0,
                    is_hide: 0,
                    operate_type: 2,
                    pivot: {
                        ranking_id: 1,
                        ranking_pid: 1
                    },
                    ranking_desc: '该榜单暂时没有描述',
                    ranking_level: 2,
                    ranking_name: '无名',
                    rating: 'D+',
                    updated_at: timeFormat('-')
                },

            }
        },
        created() {
            this.renderData = this.value
        },
        mounted() {
            this.$nextTick(() => {
                this.initUlWidth()
                this.judgeBoundary()
            })
        },
        methods: {
            init() {

            },
            goSecondRank() {
                this.$store.commit('SET_TRANSITIONTYPE', 'forward')
            },
            initUlWidth() {
                $('.info-ul').width($(window).width() - 55)
            },
            judgeBoundary() {
                this.$nextTick(() => {
                    let lastLiWidth = $(this.$refs.more).width();
                    let windowWidth = $(window).width();
                    let ulOffSetX = $('.info-ul').offset().left;
                    let lastLiOffSetX = $(this.$refs.more).offset().left;
                    let firstLiOffSetX;
                    if (this.$refs.lis && this.$refs.lis.length > 0) {
                        firstLiOffSetX = $(this.$refs.lis[0]).offset().left;
                    } else {
                        return
                    }
                    if (lastLiOffSetX + lastLiWidth > windowWidth) {
                        this.rightBoundary = true;
                    } else {
                        this.rightBoundary = false;
                    }
                    if (ulOffSetX - firstLiOffSetX > 15) {
                        this.leftBoundary = true;
                    } else {
                        this.leftBoundary = false;
                    }
                })
            }
        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .rank-card {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: hidden;
        padding: 5px 0;
        .hot-level {
            padding: 10px 5px;
            flex: 0 0 30px;
            span {
                color: #FF2C09;
                text-align: center;
                font-size: 16px;
                font-weight: bold;
                background-color: #FFCECE;
                padding: 3px;
                border-radius: 1px;
                display: block;
                width: 25px;
            }
        }
        .rank-info {
            flex: 1;
            h3 {
                font-size: 16px;
                font-weight: bold;
                color: #000;
            }
            .info-body {
                padding-left: 4px;
                position: relative;
                width: 100%;
                height: 80px;
                border-bottom: 1px solid #C8C7CD;
                overflow: hidden;
                .nextmask {
                    width: 40px;
                    height: 100%;
                    position: absolute;
                    display: block;
                    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
                    z-index: 1;
                    right: 0px;
                    top: 0;
                }
                .prevmask {
                    width: 40px;
                    height: 100%;
                    position: absolute;
                    display: block;
                    background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
                    z-index: 1;
                    left: 0;
                    top: 0;
                }
                ul {
                    overflow-x: auto;
                    white-space: nowrap;
                    width: 100%;
                    padding-bottom: 20px;
                    padding-right: 10px;
                    box-sizing: content-box;
                    display: flex;
                    li {
                        flex: 0 0 70px;
                        width: 70px;
                        height: 70px;
                        border: 1px solid rgba(0, 0, 0, 0.2);
                        border-radius: 8px;
                        margin-right: 10px;
                        display: inline-block;
                        a {
                            position: relative;
                            display: block;
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                            i {
                                position: absolute;
                                top: 3px;
                                left: 3px;
                                color: #d4d4d4;
                                font-size: 8px;
                            }
                            .element-item {
                                width: 100%;
                                height: 100%;
                                span {
                                    display: block;
                                    width: 100%;
                                    color: #000;
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    left: 0;
                                    font-size: 10px;
                                    text-align: center;
                                    white-space: normal;
                                    max-height: 65px;
                                    overflow: hidden;
                                }
                                img {
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 4px;
                                    border: 0 none;
                                }
                            }

                        }
                    }
                }
            }
        }
    }
</style>