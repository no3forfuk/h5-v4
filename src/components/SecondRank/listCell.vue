<template>
    <li class="cell" :class="{pdbtm0:index == 3 && !showborder}">
        <router-link
                :to="{
                    name:'element',
                    query:{
                        elementId:value.id,
                        secondId:$route.query.secondId,
                        firstId:$route.query.firstId,
                        idx:$route.query.idx,
                        },
                    params:{elementDetails:value}}" v-if="value">
            <div class="left">
                <span>{{index == 5? total:index+1}}</span>
            </div>
            <div class="right" @click="setTransition" :class="{pdbtm0:index == 3 && !showborder}">
                <div class="element-text">
                    <h2>@{{value.element_name}}</h2>
                    <p>{{value.element_desc}}</p>
                </div>
                <div class="img" v-if="value.img">
                    <img :src="value.img"
                         alt="">
                </div>
            </div>
        </router-link>
        <div v-if="!value" class="more" @click="openLoadMore">
            <div>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </li>
</template>

<script>

    export default {
        data() {
            return {
                query: '',
                showBorder: false
            }
        },
        created() {
        },
        methods: {
            setTransition() {
                this.$count(['Ranking_Lv2_To_Element', 1])
                this.$store.commit('SET_TRANSITIONTYPE', 'forward')
            },
            openLoadMore() {
                this.showBorder = true
                this.$emit('loadMore')
            }
        },
        props: ['value', 'index', 'total', 'showborder']
    }

</script>

<style scoped lang="less">
    .pdbtm0 {
        padding-bottom: 0 !important;
        border-bottom: 0 none !important;
    }

    .cell {
        width: 100%;
        padding-bottom: 10px;
        a {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .left {
                flex: 0 0 16px;
                padding: 0 8px;
                span {
                    display: block;
                    margin-top: 2px;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    background-color: #E4E4E4;
                    border-radius: 1px;
                    line-height: 20px;
                    color: #FF2C09;
                    font-weight: bold;
                }
            }
            .right {
                width: calc(100% - 32px);
                padding-bottom: 10px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                .element-text {
                    overflow: hidden;
                    height: 64px;
                    padding: 4px 0px;
                    padding-right: 18px;
                    color: #000;
                    h2 {
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 16px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    p {
                        box-sizing: border-box;
                        padding: 7px 0px 8px 0px;
                        height: 30px;
                        overflow: hidden;
                        line-height: 12px;
                        text-align: justify;
                        font-size: 12px;
                    }
                }
                .img {
                    flex: 0 0 20%;
                    padding-right: 10px;
                    height: 64px;
                    img {
                        display: block;
                        width: 4rem;
                        height: 4rem;
                        border-radius: 2px;
                    }
                }

            }
        }
        a:active {
            background-color: #efefef;
        }
        .more {
            width: 100%;
            height: 126px;
            background-color: #F1F1F1;
            display: flex;
            flex-direction: column;
            align-items: center;
            div:nth-child(1) {
                width: 10px;
                height: 100%;
                padding: 40px 0px;
                span {
                    width: 10px;
                    margin: 4px 0;
                    height: 10px;
                    background-color: #fff;
                    border-radius: 50%;
                    display: block;
                }
            }
        }
    }
</style>