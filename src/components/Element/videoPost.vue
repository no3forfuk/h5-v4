<template>
    <div @click="$emit('click')">
        <video width="70%" :src="value.video" controls="controls"
               class="video-post">
            <source :src="value.video" type="video/mp4">
        </video>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .video-post {
        border-radius: 4px;
    }
</style>