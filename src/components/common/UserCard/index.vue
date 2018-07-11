<template>
    <div class="user-card" v-if="value">
        <img :src="value.avatar||'http://p8rk87lub.bkt.clouddn.com/visitor.jpg'" alt="">
        <div class="user-info">
            <h6>{{value.name||value.area +'猎人'}}</h6>
            <p>
                <span>暂无</span>
                <span></span>
                <span>他什么也没说</span>
            </p>
        </div>
    </div>
</template>

<script>
    import {inheritObject} from '../../../utils'

    export default {
        data() {
            return {
                renderData: {}
            }
        },
        created() {

        },
        methods: {
            getUserInfoFromLocal() {
                let userData = JSON.parse(sessionStorage.getItem('userInfo'))
                this.renderData = userData
            }
        },
        props: ['value']
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