<template>
    <div class="img-text" @click="$emit('click')">
        <p>{{text}}</p>
        <img :src="imgSrc" alt="">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: "",
                imgSrc: ""
            };
        },
        created() {
            this.getText();
        },
        methods: {
            getText() {
                let html = this.value.post_content
                let regHtml = /<[^>]+>|&[a-z]*;/g;
                let htmlArr = html.split(regHtml);
                this.text = htmlArr.join('')
                if (this.value.img) {
                    this.imgSrc = this.value.img;
                } else {
                    var imgReg = /<img.*?(?:>|\/>)/gi;
                    let imgStr = ''
                    if (html.match(imgReg)[0]) {
                        imgStr = html.match(imgReg)[0]
                        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                        if (imgStr.match(srcReg)[0]) {
                            var srcArr = imgStr.match(srcReg)[0].split('"')
                            this.imgSrc = srcArr[1]
                        }

                    }


                }
            }
        },
        props: ["value"]
    };
</script>

<style scoped lang="less">
    .img-text {
        width: 100%;
        p {
            width: 100%;
            font-size: 16px;
            line-height: 20px;
            max-height: 80px;
            overflow: hidden;
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
        }
        img {
            max-width: 70%;
            border-radius: 4px;
            margin-top: 10px;
        }
    }
</style>