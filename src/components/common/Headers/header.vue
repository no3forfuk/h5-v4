<template>
    <div class="rcm-headers">
        <div class="header-top">
            <div class="left" @click="goBack">
                <icon :value="'&#xe609;'"
                      class="font-size-28"
                      v-if="val.index"></icon>
                <icon :value="'&#xe600;'" class="font-size-24" v-if="!val.index"></icon>
                <span class="font-size-16">{{val.leftText}}</span>
            </div>
            <div class="right">
                <div @click="toggleFind" v-if="val.nav">
                    <span class="font-size-16">{{crtRank}}</span>
                    <icon class="font-size-20" v-if="!findIsOpen" :value="'&#xe7e9;'"></icon>
                    <icon class="font-size-20" v-if="findIsOpen" :value="'&#xe952;'"></icon>
                </div>
                <div ref="comfirm" v-if="val.rightText">
                    <span style="color: #FF2C09; font-size: 16px">{{val.rightText}}</span>
                </div>
            </div>
        </div>
        <div class="header-bottom" v-if="val.nav" :style="openFind">
            <finder-body @getRankIndex="getFirstList" :value="val.nav" @setName="setRightText"></finder-body>
        </div>
    </div>
</template>

<script>
    import finderBody from '../Find/findBody'
    import {inheritObject} from '../../../utils'

    export default {
        data() {
            return {
                findIsOpen: false,
                crtRank: '发现'
            }
        },
        mounted() {
            this.$nextTick(() => {

            })
        },
        created() {
        },
        computed: {
            openFind() {
                if (this.findIsOpen) {
                    return {
                        height: '26px'
                    }
                } else {
                    return {
                        height: '0px'
                    }
                }

            }
        },
        methods: {
            goBack() {
                if (this.val.index) {
                    this.$store.commit('SETOPENUSERCENTER', true)
                    if (sessionStorage.getItem('X-Auth-Token')) {
                        this.$router.push({
                            name: 'userCenter',
                            query: this.$route.query
                        })
                    } else {
                        this.$store.commit('GOLOGIN', true)
                    }
                    return
                } else {
                    this.$store.commit('SETOPENUSERCENTER', false)
                }
                if (!this.val.backTarget) {
                    this.$store.commit('SETDIRECTION', 'forward')
                    this.$nextTick(() => {
                        this.$router.back()
                    })
                } else {
                    this.$store.commit('SETDIRECTION', 'back')
                    this.$router.push({
                        name: this.val.backTarget,
                        query: this.$route.query
                    })
                }

            },
            setRightText(val) {
                this.crtRank = val
            },
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
                this.crtRank = val.value.ranking_name
            },
            toggleFind() {
                this.findIsOpen = !this.findIsOpen;
                this.$store.commit('TOGGLENAVSHOW', this.findIsOpen)
            }
        },
        components: {
            finderBody
        },
        props: ['val', 'firstRank']
    }

</script>

<style scoped lang="less">

    .rcm-headers {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        background-color: #fff;
        padding: 0 10px;
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
        .left {
            display: flex;
            flex-direction: row;
            justify-content: left;
            align-items: center;
        }
        .right {
            color: #FF2C09;
        }
    }
</style>