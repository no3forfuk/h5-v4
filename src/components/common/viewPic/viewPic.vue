<template>
    <div class="view-pic">
        <img :src="imgSrc" alt="" @click="close">
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },

        methods: {
            close() {
                this.$store.commit('SET_VIEWPIC', false)
            }
        },
        computed: {
            imgSrc() {
                if (this.$store.getters.GET_VIEWPICSRC) {
                    return this.$store.getters.GET_VIEWPICSRC
                }
            }
        }
    }

</script>

<style scoped lang="less">
    .view-pic {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #000;
        position: fixed;
        display: flex;
        flex-direction: row;
        align-items: center;
        top: 0;
        left: 0;
        img {
            max-width: 100%;
        }
    }
</style>