<template>
    <transition name="rcm-popup-transition">
        <div class="rcm-popup-temp" v-if="show">
            <div class="popup-mask" @click="$emit('close')"></div>
            <div class="popuPage" v-if="type == 'full'">
                <slot name="fullPage">
                </slot>
            </div>
            <ul class="popup-temp-ul" v-if="type !== 'full'">
                <li v-for="(item,index) in items"
                    class="popup-temp-li"
                    :key="index"
                    v-text="item.label"
                    @click="clickItem(item)">
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>

    export default {
        data() {
            return {}
        },
        mounted() {
            $('.rcm-popup-temp').height($(window).height())
        },
        methods: {
            clickItem(item) {
                this.$emit('clickItem', item)
            }
        },
        props: ['show', 'type', 'items']
    }

</script>

<style scoped lang="less">
    .rcm-popup-temp {
        width: 100%;
        height: 100%;
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
            background-color: #fff;
            flex-direction: column;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 502;
            width: 100%;
            align-items: center;
            box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, .2);
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            .popup-temp-li {
                color: #FF2C09;
                width: 100%;
                text-align: center;
                height: 50px;
                font-size: 16px;
                border-bottom: 1px solid #DEDEDE;
                line-height: 50px;
            }
            li:nth-last-child(1) {
                border-bottom: 0 none;
            }
        }
    }

    .rcm-popup-transition-enter-active {
        animation: slideInUp 0.5s;
    }

    .rcm-popup-transition-leave-active {
        animation: slideOutDown 0.5s;
    }
</style>