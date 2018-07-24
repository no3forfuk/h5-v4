<template>
    <div class="second-head">
        <div class="left">
            <h2>#{{value.ranking_name}}</h2>
            <div class="desc">
                <p>{{value.ranking_desc}}</p>
            </div>
            <div class="more-options">
                <div class="collect" @click="doCollectRank">
                    <icon :value="'&#xe62b;'" class="font-size-16" :class="{'collected':isCollect}"></icon>
                    <span :class="{'collected':isCollect}">收藏</span>
                </div>
                <div class="more" @click="$emit('activeMore',value.id)">
                    <icon :value="'&#xe62f;'" class="font-size-16"></icon>
                    <span>更多</span>
                </div>
            </div>
        </div>
        <div class="right">
            <span>RCM评级</span>
            <span>{{value.rating}}</span>
            <span>{{value.vote}}(票)</span>
            <span v-if="value.data">{{value.data.total}}(排名)</span>
        </div>
        <!--<rcm-popup></rcm-popup>-->
    </div>
</template>

<script>
    import {rankCollect} from '../../api/api'

    export default {
        data() {
            return {
                isCollect: false
            }
        },
        created() {
        },
        mounted() {
            this.$nextTick(() => {
                $('.desc p').css({
                    width: $(window).width() - 150
                })
            })
        },
        methods: {
            doCollectRank() {
                if (sessionStorage.getItem('X-Auth-Token')) {
                    rankCollect({
                        ranking_id: this.$route.query.secondId
                    }).then(res => {
                        if (res.status == 200) {
                            if (res.data.status_code == 1) {
                                this.$toast({
                                    message: res.data.message,
                                    duration: 1000,
                                    position: 'middle'
                                })
                                this.isCollect = !this.isCollect
                            } else {
                                this.$toast({
                                    message: res.data.message,
                                    duration: 1000,
                                    position: 'middle'
                                })
                            }
                        } else {
                            return
                        }
                    }).catch(err => {
                        throw err
                    })
                } else {
                    this.$store.commit('GOLOGIN', true)
                }
            }
        },
        computed: {},
        props: ['value'],
        watch: {
            'value.collect'(val) {
                if (val == 0) {
                    this.isCollect = false
                } else {
                    this.isCollect = true
                }
            }
        }
    }

</script>

<style scoped lang="less">
    .collected {
        color: #FF2C09;
    }

    .second-head {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 10px 20px;
        justify-content: space-between;
        .left {
            padding-right: 10px;
            position: relative;
            h2 {
                font-weight: bold;
                line-height: 24px;
                font-size: 20px;
                transition: all 1s;
            }
            .desc {
                p {
                    height: 20px;
                    padding: 3px 0px;
                    box-sizing: content-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .more-options {
                width: 100%;
                text-align: right;
                .collect {
                    width: 30px;
                    display: inline-flex;
                    flex-direction: column;
                    font-size: 12px;
                    justify-content: center;
                    align-items: center;
                }
                .more {
                    width: 30px;
                    display: inline-flex;
                    flex-direction: column;
                    font-size: 12px;
                    justify-content: center;
                    align-items: center;
                    margin-left: 10px;
                }
            }
        }
        .right {
            flex: 0 0 90px;
            height: 90px;
            border-radius: 2px;
            box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span:nth-child(1) {
                font-size: 14px;
            }
            span:nth-child(2) {
                color: #FF2C09;
                font-size: 24px;
            }
            span:nth-child(3) {
                font-size: 10px;
            }
            span:nth-child(4) {
                font-size: 8px;
            }
        }
    }
</style>