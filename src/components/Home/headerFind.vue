<template>
    <div class="header-find">
        <ul>
            <li v-for="(item,index) in rankData" :key="index">{{item.name}}</li>
        </ul>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                rankData: [
                    {
                        name: '热门榜单'
                    },
                    {
                        name: '最热'
                    },
                    {
                        name: '最冷门'
                    },
                    {
                        name: '动漫'
                    },
                    {
                        name: 'NBA'
                    },
                    {
                        name: '世界杯'
                    },
                    {
                        name: '热门榜单'
                    },
                    {
                        name: '热门榜单'
                    },
                    {
                        name: '热门榜单'
                    }

                ]
            }
        }
    }

</script>

<style scoped lang="less">
    .header-find {
        width: 100%;
        overflow: hidden;
        ul {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: left;
            text-overflow: ellipsis;
            padding-left: 10px;
            font-size: 2rem;
            li {
                white-space: nowrap;
                margin-right: 20px;
            }
        }
    }
</style>