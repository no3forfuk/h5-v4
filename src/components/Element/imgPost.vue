<template>
    <img :src="imgSrc" alt="" @click="$emit('click')">
</template>

<script>

    export default {
        data() {
            return {
                imgSrc: ''
            }
        },
        created() {
            if (this.value.img) {
                this.imgSrc = this.value.img
            } else {
                let html = this.value.post_content
                var imgReg = /<img.*?(?:>|\/>)/gi;
                let imgStr = ''
                if (html.match(imgReg)[0]) {
                    imgStr = html.match(imgReg)[0]
                    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
                    if (imgStr.match(srcReg)[0]) {
                        var srcArr = imgStr.match(srcReg)[0].split('"')
                        this.imgSrc = srcArr[1]
                        console.log(this.imgSrc);
                    }

                }
            }
        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    img {
        border-radius: 4px;
        max-width: 70%;
    }
</style>