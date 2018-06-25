<template>
    <div>
        <div class="rcm-header">
            <div class="left">
                <slot name="back">
                    <icon :value="'&#xe600;'" class="font-size-20" @click="goBack"></icon>
                </slot>
                <slot name="text"></slot>
            </div>
            <div class="right" @click="active">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="find-bottom">
            <slot name="find">
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        mounted() {
            this.$nextTick(() => {

            })

        },
        methods: {
            goBack() {
                this.$store.commit('SETROUTERDIRECTION', 'back')
                this.$nextTick(() => {
                    this.$router.back()
                })
            },
            active() {
                $('.find-bottom').slideToggle(200)
            }
        },
        props: ['routerTo']
    };
</script>
<style scoped lang="less">
    .rcm-header {
        width: 100%;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
    }

    .left {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
    }
</style>