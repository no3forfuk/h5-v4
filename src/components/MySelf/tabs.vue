<template>
    <div class="tabs">
        <ul>
            <li v-for="(item,index) in tabData" :key="index" @click="bb($event)">
                <router-link :to="{}">{{item.title}}</router-link>
            </li>
            <span :style="spanPosition"></span>
        </ul>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                liOffsetX: 0,
                tabData: [
                    {
                        title: '全部'
                    },
                    {
                        title: '评论'
                    },
                    {
                        title: '建榜'
                    },
                    {
                        title: '调查'
                    },
                    {
                        title: '帖子'
                    }
                ]
            }
        },
        methods: {
            bb(e) {
                let width = $(e.target).width();
                let left = $(e.target).offset().left - 20;
                let X = (width - 16) / 2;
                this.liOffsetX = left + X;
            }
        },
        computed: {
            spanPosition() {
                return {
                    transform: 'translateX(' + this.liOffsetX + 'px)'
                }
            }
        }
    }

</script>

<style scoped lang="less">

    .tabs {
        width: 100%;
        padding: 10px 0px;
        ul {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            padding: 0 20px;
            border-bottom: 1px solid #CDCED4;
            position: relative;
            span {
                display: block;
                width: 16px;
                height: 1px;
                background-color: #7D09FF;
                position: absolute;
                bottom: 0px;
                transition: all 0.5s;
            }
            li {
                margin-right: 20px;
                /*border-bottom: 1px solid #7D09FF;*/
                /*width: 10px;*/
                white-space: nowrap;
            }
        }
    }
</style>