<template>
    <div class="ext-web">
        <div class="info">
            <p>{{value.link_title}}</p>
            <span>-- 外站</span>
        </div>
        <!--<img src="http://p9w69x04q.bkt.clouddn.com/you.jpg" alt="">-->
    </div>
</template>

<script>

    export default {
        data() {
            return {
                imgSrc: '',
                linkSrc: '',
                linkName: ''
            }
        },
        created() {
            this.setData()
        },
        methods: {
            setData() {

            }
        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .ext-web {
        width: 100%;
        height: 85px;
        background-color: #E5E5E5;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-right: 10px;
            span {
                color: #8B8B8B;
                font-size: 12px;
            }
        }
        img {
            max-width: 90px;
            max-height: 63px;
            border-radius: 4px;
        }
    }
</style>