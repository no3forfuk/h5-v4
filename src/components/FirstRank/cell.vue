<template>
    <li>
        <router-link :to="{name:'element'}">
            <i>No.1</i>
            <span>这个男人来自地球</span>
        </router-link>
    </li>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style scoped lang="less">
    li {
        width: 6rem;
        height: 6rem;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        margin-right: 10px;
        display: inline-flex;
        a {
            display: flex;
            position: relative;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            i {
                position: absolute;
                top: 3px;
                left: 3px;
                color: #d4d4d4;
                font-size: 8px;
            }
            span {
                font-size: 10px;
                text-align: center;
                white-space: normal;
            }
        }

    }
</style>