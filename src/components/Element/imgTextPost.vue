<template>
    <div class="img-text">
        <p>{{text}}</p>
        <img :src="value.img" alt="">
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
                this.text = this.value.post_content.split('<div>')[0]
                let reg = /(([A-Za-z]*)\:\/\/(([A-Za-z0-9]*)\.)*com\/([A-Za-z]*|[0-9]*|[_]*|[-]*|[\.]*\/)*.([A-Za-z])*)/
                if (reg.test(this.value.post_content)) {
                    this.imgSrc = reg.exec(this.value.post_content)[0]
                } else {
                    this.imgSrc = ''
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