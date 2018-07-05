<template>
    <div class="post">
        <div class="post-user">
            <user-card :value="postDetails.user"></user-card>
        </div>
        <div class="post-content">
            {{postDetails.post_content}}
        </div>
        <h3 class="discuss-title">评论(<span>{{postDetails.comment_num}}</span>)</h3>
        <ul class="discuss-list">
            <discuss-card v-for="(item,index) in postDetails" :key="index"></discuss-card>
        </ul>
    </div>
</template>

<script>
    import discussCard from '../common/DiscussCard/index'
    import {getPostDetailsById} from '../../api/api'

    export default {
        data() {
            return {
                postDetails: {}
            }
        },
        created() {
            this.getPostDetails()
        },
        methods: {
            getPostDetails() {
                let params = {};
                params.id = this.$route.query.postId
                getPostDetailsById(params).then(res => {
                    this.postDetails = res.data.data;
                }).catch(err => {
                    throw err
                })
            }
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