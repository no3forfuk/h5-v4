<template>
    <i style="font-family: iconfont" v-html="value" @click="back"></i>
</template>

<script>

    export default {
        data() {
            return {}
        },
        methods: {
            back() {
                this.$nextTick(() => {
                    if (!this.pathName && this.value == '&#xe600;') {
                        this.$router.back()
                    } else {
                        this.$router.push({
                            name: this.pathName
                        })
                    }
                })
            }
        },
        props: ['value', 'pathName']
    }

</script>

<style scoped lang="less">

</style>