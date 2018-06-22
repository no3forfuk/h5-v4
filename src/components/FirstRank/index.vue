<template>

    <firstRank v-bind:leftFlex='30'
               class="first-rank">

        <div slot="left" class="left">
            <span>A<sup>+</sup></span>
        </div>
        <div slot="right" class="right">
            <router-link :to="{name:'secondRankList'}" slot="top" class="top">
                #适合带妹的网友
            </router-link>
            <div slot="bottom" class="bottom">
                <ul>
                    <cell v-for="(item,index) in list" :key="index"></cell>
                </ul>
            </div>
        </div>

    </firstRank>

</template>

<script>
    import firstRank from '../common/Bone/index'
    import cell from './cell'

    export default {
        data() {
            return {
                list: [0, 1, 3, 3, 3, 3]
            }
        },
        methods: {},
        components: {
            firstRank,
            cell
        }
    }

</script>

<style scoped lang="less">
    .first-rank {
        padding-bottom: 10px;
        .left {
            padding: 10px 5px;
            span {
                color: #FF2C09;
                font-size: 16px;
                font-weight: bold;
                background-color: #E4E4E4;
                padding: 3px;
                border-radius: 1px;
            }
        }
        .right {
            .top {
                display: block;
                font-size: 16px;
                line-height: 20px;
                font-weight: bold;
                padding: 6px 4px;
                color: #000;
            }
            .bottom {
                padding-left: 4px;
                width: 100%;
                height: 72px;
                border-bottom: 1px solid #C8C7CD;

                overflow: hidden;
                ul {
                    width: 100%;
                    overflow-x: auto;
                    white-space: nowrap;
                    padding-bottom: 20px;
                    padding-right: 10px;
                }
            }
        }
    }

</style>