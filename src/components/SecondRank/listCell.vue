<template>
    <li class="cell">
        <router-link
                :to="{
                    name:'element',
                    query:{
                        elementId:value.id,
                        secondId:$route.query.secondId,
                        firstId:$route.query.firstId,
                        idx:$route.query.idx,
                        },
                    params:{elementDetails:value}}">
            <div class="left">
                <span>{{index+1}}</span>
            </div>
            <div class="right">
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
    </li>
</template>

<script>

    export default {
        data() {
            return {
                query: ''
            }
        },
        created() {
        },
        methods: {},
        props: ['value', 'index']
    }

</script>

<style scoped lang="less">
    .cell {
        width: 100%;
        padding-bottom: 10px;
        a {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .left {
                flex: 0 0 20px;
                padding: 0 10px;
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
                width: calc(100% - 40px);
                padding-bottom: 10px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                .element-text {
                    overflow: hidden;
                    padding-right: 10px;
                    color: #000;
                    h2 {
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 18px;
                    }
                    p {
                        box-sizing: content-box;
                        height: 40px;
                        overflow: hidden;
                        text-align: justify;
                        padding: 5px 0;
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
    }
</style>