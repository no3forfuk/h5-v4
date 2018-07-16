<template>
    <div class="user-card" v-if="value">
        <img :src="value.avatar||'http://p8rk87lub.bkt.clouddn.com/visitor.jpg'" alt="">
        <div class="user-info">
            <h6>{{value.name||value.area +'猎人'}}</h6>
            <p>
                <span>{{rankName||'暂无'}}</span>
                <span></span>
                <span>{{value.signature||'暂无'}}</span>
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
                type: 2,
                defaultData: {
                    avatar: 'http://p8rk87lub.bkt.clouddn.com/visitor.jpg',
                    avatar_key: 'visitor.jpg',
                    email: '',
                    get_expert: {
                        ranking_name: '暂无',
                        id: NaN
                    },
                    name: '用户' + parseInt(new Date() / 123),
                    signature: '该用户什么也不想说',
                    updated_at: timeFormat('-')
                }
            }
        },
        created() {

        },
        mounted() {
            this.$nextTick(() => {

            })
        },
        methods: {},
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