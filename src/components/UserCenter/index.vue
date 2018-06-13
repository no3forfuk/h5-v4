<template>
    <transition :name="viewTransition">
        <div>
            usercenter
            <router-link :to="{name:'home'}">
                <button @click="go">zhuye</button>
            </router-link>
        </div>


    </transition>
</template>

<script>

    export default {
        data() {
            return {
                direction: ''
            }
        },
        methods: {
            go() {
                this.direction = 'home'
            }
        },
        computed: {
            viewTransition() {
                if (!this.direction) return ''
                return (this.direction === 'home' ? 'in' : 'out')
            }
        }
    }

</script>

<style scoped lang="less">
    div {
        height: 1000px;
        width: 100%;
        color: #fff;
        background-color: #333;
    }

    .out-enter-active, .out-leave-active {
        animation: slideInLeft 0.5s;
        position: absolute;
    }

    .out-enter, .out-leave-to {
        animation: slideOutRight 1s;
        position: absolute;
    }
</style>