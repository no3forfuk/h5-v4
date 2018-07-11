<template>
    <div class="scroll-select">
        <p>修改擅长榜单</p>
        <span class="icon"><icon :value="'&#xe790;'"></icon></span>
        <div class="select-box" @scroll="getPosition" ref="srcollUl">
            <ul>
                <li v-for="(item,index) in scrollData"
                    ref="lis"
                    :key="index">
                    <span>{{item.ranking_name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getFirstRankList} from '../../api/api'

    export default {
        data() {
            return {
                ulTranslateY: 0,
                scrollData: [],
                step: 20,
                index: 0
            }
        },
        created() {
            getFirstRankList().then(res => {
                if (res.status == 200) {
                    if (res.data.status_code == 1) {
                        this.scrollData = res.data.data.data
                        this.$nextTick(() => {
                            $(this.$refs.lis[this.index]).css({
                                transform: 'scale(1.5)'
                            })
                            this.$emit('change', this.scrollData[this.index])
                        })
                    }
                } else {

                }
            }).catch(err => {
                throw err
            })
        },
        mounted() {

        },
        computed: {},
        methods: {
            getPosition() {
                this.index = parseInt(this.$refs.srcollUl.scrollTop / this.step)
                for (let i = 0; i < this.$refs.lis.length; i++) {
                    $(this.$refs.lis[i]).css({
                        transform: 'scale(1)'
                    })
                    $(this.$refs.lis[this.index]).css({
                        transform: 'scale(1.5)'
                    })
                }
                this.$emit('change', this.scrollData[this.index])
            }
        },
        computed: {}
    }

</script>

<style scoped lang="less">
    .scroll-select {
        position: relative;
        .mark-top {
            width: 100%;
            height: 140px;
            position: fixed;
            bottom: 140px;
            left: 0;
            z-index: 4;
            background: linear-gradient(to top, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1));
        }
        .mark-bottom {
            width: 100%;
            height: 120px;
            position: fixed;
            bottom: 0px;
            left: 0;
            z-index: 4;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 1));
        }
        .icon {
            position: absolute;
            top: 160px;
            left: 120px;
        }
        height: 300px;
        width: 100%;
        border-top: 1px solid rgba(0, 0, 0, 0.2);
        overflow: hidden;
        position: absolute;
        z-index: 2;
        bottom: 0;
        background-color: #fff;
        left: 0;
        p {
            width: 100%;
            text-align: center;
        }
        .select-box {
            height: 300px;
            width: 100%;
            position: relative;
            overflow-y: auto;
            overflow-x: hidden;
            ul {
                width: 100%;
                padding-top: 140px;
                padding-bottom: 140px;
                transition: all 0.5s;
                li {
                    display: flex;
                    transition: all 0.6s;
                    padding: 2px 0;
                    flex-direction: row;
                    justify-content: center;
                    text-align: center;
                }
            }
        }
    }

    .activeStyle12 {
        font-size: 12px;
        transform: rotateX(60deg);
    }

    .activeStyle14 {
        font-size: 14px;
        transform: rotateX(45deg);
    }

    .activeStyle16 {
        font-size: 16px;
        transform: rotateX(30deg);
    }

    .activeStyle {
        font-size: 18px;
    }

</style>