<template>
    <div>
        <rcm-header>
            <div slot="left">
                <i style="font-family: iconfont">&#xe600;</i><span>我的</span>
            </div>
        </rcm-header>
        <banner></banner>
        <tabs></tabs>
    </div>
</template>

<script>
    import banner from './banner'
    import tabs from './tabs'

    export default {
        data() {
            return {}
        },
        components: {
            banner,
            tabs
        }
    }

</script>

<style scoped lang="less">

</style>