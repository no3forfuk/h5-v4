<template>
    <transition name="slideInLeft">
        <div class="home">
            <rcm-header>

            </rcm-header>
            <router-link :to="{name:'userCenter'}">个人中心</router-link>
        </div>
    </transition>
</template>

<script>

    export default {
        data() {
            return {
                popupVisible: true
            }
        }
    }

</script>

<style scoped lang="less">
    .home {
        width: 100%;
        height: 1000px;
        background-color: #ccc;
    }

    .slideInLeft-enter-active, .slideInLeft-leave-active {
        animation: slideInLeft 0.5s;
    }

    .slideInLeft-enter, .slideInLeft-leave-to {
        animation: slideInLeft 0.5s;
    }

</style>