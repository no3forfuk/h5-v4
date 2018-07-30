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
                text: '',
                imgSrc: ''
            }
        },
        created() {
            this.getText();
        },
        methods: {
            getText() {
                if (this.value.post_content.split('<br>')) {
                    this.text = this.value.post_content.split('<br>')[0]
                }
                if (this.text.split('<p>').length > 1) {
                    this.text = this.text.split('<p>')[1]
                }
                let reg = /(([A-Za-z]*)\:\/\/(([A-Za-z0-9]*)\.)*com\/([A-Za-z]*|[0-9]*|[_]*|[-]*|[\.]*|[\u4e00-\u9fa5])*\.([A-Za-z])*)/
                let reg2 = /(([A-Za-z]*)\:\/\/(([A-Za-z0-9]*)\.)*com\/([A-Za-z]*|[0-9]*|[_]*|[-]*|[\.]*|[\u4e00-\u9fa5])*)/
                if (this.value.img) {
                    this.imgSrc = this.value.img
                } else {
                    if (reg.exec(this.value.post_content)) {
                        this.imgSrc = reg.exec(this.value.post_content)[0]
                    } else {
                        this.imgSrc = reg2.exec(this.value.post_content)[0]
                    }

                }
            }
        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .img-text {
        width: 100%;
        p {
            width: 100%;
        }
        img {
            max-width: 70%;
            border-radius: 4px;
            margin-top: 10px;
        }
    }
</style>