<template>
    <transition name="rcm-popup-transition">
        <div class="rcm-popup-temp" v-if="show">
            <div class="popup-mask" @click="$emit('close')"></div>
            <div class="popuPage" v-if="type == 'full'">
                <slot name="fullPage">
                </slot>
            </div>
            <!--<slot name="bottom">-->
            <!--<ul class="popup-temp-ul" @click.stop="aa">-->
            <!--<li v-for="(item,index) in items" :key="index">-->
            <!--{{item}}-->
            <!--</li>-->
            <!--</ul>-->
            <!--<div class="prop-mask"></div>-->
            <!--</slot>-->
        </div>
    </transition>
</template>

<script>

    export default {
        data() {
            return {
                items: [0, 0, 0]
            }
        },
        mounted() {
            $('.rcm-popup-temp').height($(window).height())
        },
        methods: {
            aa() {
                console.log('a');
            }
        },
        props: ['show', 'type']
    }

</script>

<style scoped lang="less">
    .rcm-popup-temp {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .05);
        position: absolute;
        top: 0;
        z-index: 500;
        left: 0;
        .popup-mask {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 501;
        }
        .popuPage {
            height: 90%;
            width: 100%;
            border-top-right-radius: 4px;
            border-top-left-radius: 4px;
            box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, .2);
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 502;
            background-color: #fff;
        }
        .popup-temp-ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        .prop-mask {

        }
    }

    .rcm-popup-transition-enter-active {
        animation: slideInUp 0.5s;
    }

    .rcm-popup-transition-leave-active {
        animation: slideOutDown 0.5s;
    }
</style>