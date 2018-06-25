<template>
    <div class="element-details">
        <icon :value="'&#xe6b5;'" @click="closeDetails" class="icon-close">关闭</icon>
        <img src="http://p9w69x04q.bkt.clouddn.com/you.jpg" alt="">
        <h4 class="title">@鼬</h4>
        <p class="content">
            简介：宇智波鼬，日本动漫《火影忍者》中的重要人物。火之国木叶隐村宇智波一族的成员，宇智波佐助的哥哥。是宇智波一族的天才忍者，年幼时跟宇智波止水是挚友，实力强大，擅长使用幻术。为了保护村子免受战乱，被迫接受了灭族任务，留下了弟弟佐助并刺激他向自己复仇，之后加入晓组织做卧底。最终在与弟弟宇</p>
        <div class="builder">
            <h4 class="builder-header">排名创建者</h4>
            <user-card></user-card>
        </div>
        <div class="builder">
            <h4 class="builder-header">最后维护者</h4>
            <user-card></user-card>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        mounted() {
            $('.element-details').height($(window).height())
        },
        methods: {
            closeDetails() {
                this.$emit('openDetails', false)
            }
        },
        props: [],
        components: {}
    }

</script>

<style scoped lang="less">
    .element-details {
        width: 100%;
        position: fixed;
        background-color: #fff;
        top: 0;
        left: 0;
        z-index: 2;
        .icon-close {
            position: absolute;
            display: block;
            width: 20px;
            height: 20px;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            top: 15px;
            right: 15px;
            color: #ABABAB;
            background-color: #fff;
            border-radius: 50%;
        }
        img {
            max-width: 100%;
        }
        .title {
            font-size: 16px;
            font-weight: bold;
            padding: 20px;
        }
        .content {
            padding: 0 20px;
        }
        .builder {
            width: 100%;
            padding: 20px 20px 10px 20px;
            .builder-header {
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
</style>