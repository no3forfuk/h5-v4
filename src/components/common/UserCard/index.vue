<template>
    <div class="user-card" v-if="value" @click="openOtherInfo">
        <img :src="value.avatar||'http://p8rk87lub.bkt.clouddn.com/visitor.jpg'" alt="">
        <div class="user-info">
            <h6>{{value.name || value.area +'猎人'}}</h6>
            <p v-if="value.ranking_name || value.signature">
                <span v-if="value.ranking_name">#{{ value.ranking_name||'暂无'}}</span>
                <span v-if="value.ranking_name"></span>
                <span v-if="value.signature">{{value.signature||'暂无'}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    import {inheritObject, timeFormat} from '../../../utils'

    export default {
        data() {
            return {
                renderData: {},
                rankName: '',
                type: 2
            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {

            })
        },
        methods: {
            openOtherInfo() {
                this.$store.commit('SET_SOMEONEINFO', [true, this.value])
            }
        },
        props: ['value'],
        watch: {
            'value.get_expert.ranking_name'(val) {
                if (val) {
                    this.rankName = val
                } else {
                    this.rankName = '暂无'
                }
            }
        }
    }

</script>

<style scoped lang="less">
    .user-card {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: left;
        align-items: center;
        img {
            width: 33px;
            height: 33px;
            border-radius: 50%;
        }
        .user-info {
            margin-left: 8px;
            h6 {
                font-size: 12px;
                font-weight: bold;
            }
            p {
                color: #8B8B8B;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                flex-direction: row;
                align-items: center;
                span:nth-child(2) {
                    display: inline-block;
                    width: 1px;
                    height: 12px;
                    background-color: #8B8B8B;
                    margin: 0 5px;
                }
            }
        }
    }
</style>