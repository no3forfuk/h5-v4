<template>
    <div v-text="postContent" @click="$emit('click')"></div>
</template>

<script>

    export default {
        data() {
            return {
                postContent: ''
            }
        },
        created() {

        },
        mounted() {
            let html = this.value.post_content;
            if (html) {
                let reg = /<[^>]+>|&[a-z]*;/g;
                let htmlArr = html.split(reg);
                this.postContent = htmlArr.join('')
            }

        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    div {
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        width: 100%;
        font-size: 16px;
        line-height: 20px;
        text-align: left;
        max-height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        letter-spacing: 1.2px;
    }
</style>