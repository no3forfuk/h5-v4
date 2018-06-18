<template>
    <div :style="findStyle" @click="toggleFind">
        <span class="font-size-16">发现</span>
        <icon class="font-size-20" v-if="findIsOpen" :value="'&#xe7e9;'"></icon>
        <icon class="font-size-20" v-if="!findIsOpen" :value="'&#xe952;'"></icon>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                findIsOpen: true
            }
        },
        computed: {
            findStyle() {
                return {
                    color: this.color
                }
            }
        },
        methods: {
            toggleFind() {
                this.findIsOpen = !this.findIsOpen
            }
        },
        props: ['color']
    }

</script>

<style scoped lang="less">

</style>