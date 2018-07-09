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
                text: ''
            }
        },
        created() {
            this.getText();
        },
        methods: {
            getText() {
                let reg1 = /\</g;
                let reg2 = /[\u4e00-\u9fa5]/g;
                let str = '';
                if (this.value.post_content.match(reg1)) {
                    str = this.value.post_content.match(reg2)
                    str = str.join("");
                    this.text = str
                } else {
                    str = decodeURIComponent(this.value.post_content).match(reg2);
                    if (str) {
                        str = str.join("");
                    }
                    this.text = str
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