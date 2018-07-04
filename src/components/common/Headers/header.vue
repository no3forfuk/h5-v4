<template>
    <div class="rcm-headers">
        <div class="header-top">
            <div class="left">
                <icon :value="'&#xe609;'" class="font-size-28"></icon>
            </div>
            <div class="right">
                <div :style="findStyle" @click="toggleFind">
                    <span class="font-size-16">发现</span>
                    <icon class="font-size-20" v-if="findIsOpen" :value="'&#xe7e9;'"></icon>
                    <icon class="font-size-20" v-if="!findIsOpen" :value="'&#xe952;'"></icon>
                </div>
            </div>
        </div>
        <div class="header-bottom">
            <finder-body @getRankIndex="getFirstList"></finder-body>
        </div>
    </div>
</template>

<script>
    import finderBody from '../Find/findBody'

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
            getFirstList(val) {
                if (val.index == 0) {
                    this.$router.replace({
                        name: 'hot',
                        query: {idx: val.index}
                    })
                } else {
                    this.$router.replace({
                        name: 'firstRank',
                        query: {firstId: val.value.id, idx: val.index}
                    })
                }
            },
            toggleFind() {
                this.findIsOpen = !this.findIsOpen;
                if (!this.findIsOpen) {
                    $('.header-bottom').height(0)
                } else {
                    $('.header-bottom').height(26)
                }
            }
        },
        components: {
            finderBody
        },
        props: ['color']
    }

</script>

<style scoped lang="less">
    .rcm-headers {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        background-color: #fff;
        justify-content: space-between;
        .header-top {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            background-color: #fff;
            justify-content: space-between;
            padding: 5px 10px;
        }
        .header-bottom {
            width: 100%;
            height: 26px;
            transition: all 0.3s;
            overflow-y: hidden;
        }
    }
</style>