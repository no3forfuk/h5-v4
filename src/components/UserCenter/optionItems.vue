<template>
    <div :class="{opts:opts,blet:blet,btn:btn}" @click="goWhere(optionsData.routeName)">
        <div v-if="opts" class="left">
            <slot name="before"></slot>
        </div>
        <div v-if="btn" @click="publicRank">
            <span>{{optionsData.title}}</span>
        </div>
        <div v-if="opts" class="right" :class="{border:optionsData.borderLine}">
            <span>{{optionsData.title}}</span>
            <slot name="after"></slot>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        methods: {
            goWhere(routerName) {
                this.$router.push({name: routerName})
            },
            publicRank() {
                this.$router.push({name: 'addRank'})
            }
        },
        props: ['optionsData'],
        computed: {
            opts() {
                return this.optionsData.type == 'opts' ? true : false
            },
            blet() {
                return this.optionsData.type == 'blet' ? true : false
            },
            btn() {
                return this.optionsData.type == 'btn' ? true : false
            }
        }
    }

</script>

<style scoped lang="less">
    .border {
        border-top: 1px solid #C8C7CD;
        border-bottom: 1px solid #C8C7CD;
    }

    .btn {
        width: 100%;
        display: flex;
        justify-content: center;
        color: #FF0000;
        font-size: 20px;
        line-height: 24px;
        padding: 10px;
    }

    .opts {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 15px;
        padding-right: 0px;
        .right {
            flex: 1;
            display: flex;
            padding: 10px 0;
            flex-direction: row;
            justify-content: space-between;
            padding-right: 10px;
        }
        .left {
            padding: 10px 0;
            flex: 0 0 30px;
        }

    }

    .blet {
        width: 100%;
        height: 7px;
        background-color: #C8C7CD;
    }
</style>