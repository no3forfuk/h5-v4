<template>
    <li class="body">
        <div class="left" :style="leftStyle">
            <slot name="left"></slot>
        </div>
        <div class="right" :style="rightStyle">
            <slot name="right">
                <div class="top">
                    <slot name="top"></slot>
                </div>
                <div class="bottom">
                    <slot name="bottom"></slot>
                </div>
            </slot>
        </div>
    </li>
</template>

<script>

    export default {
        data() {
            return {}
        },
        mounted() {

        },
        computed: {
            leftStyle() {
                return {
                    flex: '0 0 ' + this.leftFlex + 'px'
                }
            },
            rightStyle() {
                return {
                    width: $(window).width() - this.leftFlex + 'px'
                }
            }
        },
        props: ['leftFlex']
    }

</script>

<style scoped lang="less">
    .body {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: left;
        overflow: hidden;
    }

    .left {

    }

    .right {
        /*flex: 1;*/

        /*overflow: hidden;*/
    }
</style>