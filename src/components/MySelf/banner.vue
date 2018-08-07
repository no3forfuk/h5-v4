<template>
    <div class="banner">
        <img :src="imgSrc" alt="">
    </div>
</template>

<script>
    import {getBanner} from '../../api/api'

    export default {
        data() {
            return {
                imgSrc: ''
            }
        },
        created() {
            getBanner({place_mark: 'bnr_user'}).then(res => {
                this.imgSrc = res.data.data[0].img
            }).catch(err => {
                throw err
            })
        }
    }

</script>

<style scoped lang="less">
    .banner {
        width: 100%;
        padding: 10px 20px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        img {
            max-width: 100%;
            max-height: 88px;
            overflow: hidden;
        }
    }
</style>