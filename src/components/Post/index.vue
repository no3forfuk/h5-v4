<template>
    <div class="post">
        <rcm-header>
            <span slot="text" class="font-size-16">排名</span>
        </rcm-header>
        <div class="post-user">
            <user-card></user-card>
        </div>
        <div class="post-content">
            asdkashdkj
        </div>
        <h3 class="discuss-title">评论(<span>32</span>)</h3>
        <ul class="discuss-list">
            <discuss-card></discuss-card>
        </ul>
    </div>
</template>

<script>
    import discussCard from '../common/DiscussCard/index'

    export default {
        data() {
            return {}
        },
        components: {
            discussCard
        }
    }

</script>

<style scoped lang="less">
    .post {
        width: 100%;
    }

    .post-user {
        width: 100%;
        padding: 10px;
    }

    .post-content {
        width: 100%;
        padding-left: 40px;
        background-color: #ccc;
    }

    .discuss-title {
        font-size: 16px;
        font-weight: bold;
        padding: 10px 15px;
    }

    .discuss-list {
        width: 100%;
    }
</style>