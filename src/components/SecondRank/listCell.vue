<template>
    <li class="cell">
        <router-link :to="{name:'element',query:{elementId:value.id},params:{elementDetails:value}}">
            <div class="left">
                <span>{{index+1}}</span>
            </div>
            <div class="right">
                <div class="element-text">
                    <h2>@{{value.element_name}}</h2>
                    <p>{{value.element_desc}}</p>
                </div>
                <img :src="value.img"
                     v-if="value.img"
                     alt="">
            </div>
        </router-link>
    </li>
</template>

<script>

    export default {
        data() {
            return {}
        },
        props: ['value', 'index']
    }

</script>

<style scoped lang="less">
    .cell {
        width: 100%;
        padding-bottom: 10px;
        a {
            display: flex;
            width: 100%;
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
                flex: 1;
                padding-right: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                .element-text {
                    padding-right: 10px;
                    color: #000;
                    h2 {
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 18px;
                    }
                    p {
                        height: 44px;
                        overflow: hidden;
                        text-align: justify;
                        padding-top: 5px;
                    }
                }
                img:nth-child(2) {
                    width: 64px;
                    height: 64px;
                    border-radius: 2px;
                    flex: 0 0 64px;
                }
            }
        }
    }
</style>