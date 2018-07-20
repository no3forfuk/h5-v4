<template>
    <div class="rcm-header-placehloder" :style="height">

    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        computed: {
            height() {
                if (this.$store.getters.TOPNAVSTATE) {
                    return {
                        height: '68px'
                    }
                } else {
                    return {
                        height: '42px'
                    }
                }
            }
        }
    }

</script>

<style scoped lang="less">
    .rcm-header-placehloder {
        width: 100%;
        transition: all 0.3s;
    }
</style>