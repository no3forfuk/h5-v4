<template>
    <div class="active-page">
        <img :src="activeSrc" alt="" v-if="isCrtRank" @click="viewPic">
    </div>
</template>

<script>

    export default {
        data() {
            return {
                activeSrc: 'http://p8rk87lub.bkt.clouddn.com/active-0806.png'
            }
        },
        methods: {
            viewPic() {
                this.$store.commit('SET_VIEWPIC', [true, this.activeSrc])
            }
        },
        computed: {
            isCrtRank() {
                if (this.$route.query.firstId == 15) return true
                let crtRank = this.$store.getters.GET_ACTIVERANK
                if (crtRank.id == 15) return true
                return false
            }
        }
    }

</script>

<style scoped lang="less">
    .active-page {
        padding: 5px;
        width: 100%;
        img {
            width: 100%;
        }
    }
</style>