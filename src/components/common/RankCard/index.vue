<template>
    <div class="rank-card">
        <div class="hot-level">
            <span>A<sup>+</sup></span>
        </div>
        <div class="rank-info">
            <router-link
                    :to="{name:'secondRankList',query:{secondId:value.id,firstId:$route.query.firstId,idx:$route.query.idx}}">
                <h3>#{{value.ranking_name}}</h3>
            </router-link>
            <div class="info-body">
                <span class="prevmask" v-if="leftBoundary"></span>
                <span class="nextmask" v-if="rightBoundary"></span>
                <ul class="info-ul" @scroll="judgeBoundary">
                    <li v-for="(item,index) in value.data" :key="index"
                        ref="lis">
                        <router-link
                                :to="{name:'element',query:{elementId:item.id,secondId:value.id,firstId:$route.query.firstId,idx:$route.query.idx}}">
                            <i>No.{{index+1}}</i>
                            <span>{{item.element_name}}</span>
                        </router-link>
                    </li>
                    <li ref="more">
                        <router-link :to="{name:'secondRankList'}">
                            <span>更多...</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                leftBoundary: false,
                rightBoundary: true,
                query: ''
            }
        },
        created() {

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
            initUlWidth() {
                $('.info-ul').width($(window).width() - 30)
            },
            judgeBoundary() {
                this.$nextTick(() => {
                    let lastLiWidth = $(this.$refs.more).width();
                    let windowWidth = $(window).width();
                    let ulOffSetX = $('.info-ul').offset().left;
                    let lastLiOffSetX = $(this.$refs.more).offset().left;
                    let firstLiOffSetX = $(this.$refs.lis[0]).offset().left;
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
                font-size: 16px;
                font-weight: bold;
                background-color: #E4E4E4;
                padding: 3px;
                border-radius: 1px;
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
                    right: 19px;
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
                    li {
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
                            i {
                                position: absolute;
                                top: 3px;
                                left: 3px;
                                color: #d4d4d4;
                                font-size: 8px;
                            }
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
                        }
                    }
                }
            }
        }
    }
</style>