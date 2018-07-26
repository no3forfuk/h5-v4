<template>
    <div class="user-opts">
        <opts v-bind:optionsData="item"
              @addRank="addrank"
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
                        routeName: 'myself',
                        point: 'UserCenter_To_MySelf'
                    },
                    {
                        type: 'blet'
                    },
                    {
                        type: 'opts',
                        title: '发布的榜单',
                        icon: '&#xe6c5;',
                        routeName: 'myselfBuildRank',
                        point: 'UserCenter_To_Build'
                    },
                    {
                        type: 'opts',
                        title: '全部动态',
                        icon: '&#xe641;',
                        borderLine: true,
                        point: 'My_Message_All'
                    },
                    {
                        type: 'opts',
                        title: '收藏夹',
                        icon: '&#xe627;',
                        point: 'UserCenter_To_Collect'
                    },
                    {
                        type: 'blet'
                    },
                    {
                        type: 'opts',
                        title: '每日任务',
                        icon: '&#xe60f;',
                        point: 'UserCenter_To_Task'
                    },
                    {
                        type: 'opts',
                        title: '会员状态',
                        icon: '&#xe610;',
                        borderLine: true,
                        point: 'UserCenter_To_VIP'
                    },
                    {
                        type: 'opts',
                        title: '设置',
                        icon: '&#xe637;',
                        point: 'UserCenter_To_SET'
                    },
                    {
                        type: 'blet'
                    },
                    {
                        type: 'btn',
                        title: '发布榜单',
                        point: 'UserCenter_To_Publish'
                    },
                    {
                        type: 'blet'
                    },
                ]
            }
        },
        created() {

        },
        methods: {
            addrank() {
                this.$emit('publicRank')
            }
        },
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