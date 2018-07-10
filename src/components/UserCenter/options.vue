<template>
    <div class="user-opts">
        <opts v-bind:optionsData="item"
              v-for="(item,index) in optionsData"
              :key="index">
            <i style="font-family: iconfont" slot="before" v-html="item.icon"></i>
            <i style="font-family: iconfont" slot="after">&#xe601;</i>
        </opts>
    </div>
</template>

<script>
    import opts from './optionItems'

    export default {
        data() {
            return {
                optionsData: [
                    {
                        type: 'blet'
                    },
                    {
                        type: 'opts',
                        title: '我的消息',
                        icon: '&#xe64b;',
                        // routeName: 'myself'
                    },
                    {
                        type: 'blet'
                    },
                    {
                        type: 'opts',
                        title: '发布的榜单',
                        icon: '&#xe6c5;',
                        // routeName: 'myselfBuildRank'
                    },
                    {
                        type: 'opts',
                        title: '全部动态',
                        icon: '&#xe641;',
                        borderLine: true
                    },
                    {
                        type: 'opts',
                        title: '收藏夹',
                        icon: '&#xe627;'
                    },
                    {
                        type: 'blet'
                    },
                    {
                        type: 'opts',
                        title: '每日任务',
                        icon: '&#xe60f;'
                    },
                    {
                        type: 'opts',
                        title: '会员状态',
                        icon: '&#xe610;',
                        borderLine: true
                    },
                    {
                        type: 'opts',
                        title: '设置',
                        icon: '&#xe637;'
                    },
                    {
                        type: 'blet'
                    },
                    {
                        type: 'btn',
                        title: '发布榜单'
                    },
                    {
                        type: 'blet'
                    },
                ]
            }
        },
        created() {

        },
        methods: {},
        components: {
            opts
        }
    }

</script>

<style scoped lang="less">
    .user-opts {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>