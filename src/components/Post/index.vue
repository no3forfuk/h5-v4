<template>
    <div class="post">
        <div class="post-user">
            <user-card :value="$route.params.postDetails.user"></user-card>
        </div>
        <div class="post-content">
            {{$route.params.postDetails.post_content}}
        </div>
        <h3 class="discuss-title">评论(<span>{{$route.params.postDetails.comment_num}}</span>)</h3>
        <ul class="discuss-list">
            <discuss-card v-for="(item,index) in $route.params.postDetails" :key="index"></discuss-card>
        </ul>
    </div>
</template>

<script>
    import discussCard from '../common/DiscussCard/index'

    export default {
        data() {
            return {}
        },
        created() {
            console.log(this.$route);
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