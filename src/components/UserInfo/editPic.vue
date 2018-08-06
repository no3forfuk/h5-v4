<template>
    <div class="user-pic" @click="changePic">
        <span class="font-size-16">
        <input type="text"
               disabled
               v-model="label">
        <input type="file"
               @change="viewPicture"
               style="width: 0;opacity: 0;height: 0px;position: absolute;z-index: -10"
               ref="pic">
        </span>
        <img :src="img" alt="" ref="viewBox">
    </div>
</template>

<script>
    import {editUserInfo} from '../../api/api'

    export default {
        data() {
            return {
                label: '修改头像'
            }
        },
        created() {
        },
        methods: {
            changePic() {
                this.$refs.pic.click()
            },
            viewPicture() {
                const flies = new FileReader();
                flies.onload = data => {
                    this.$refs.viewBox.src = data.target.result
                    this.$emit('editConfirm', {value: this.$refs.pic.files[0], type: 'pic'})
                }
                flies.readAsDataURL(this.$refs.pic.files[0])
            }
        },
        props: ['value', 'img']
    }

</script>

<style scoped lang="less">
    .user-pic {
        width: 100%;
        padding: 15px 26px 15px 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        img {
            width: 53px;
            height: 53px;
            border-radius: 50%;
        }
        span {
            input:nth-child(1) {
                background-color: #fff;
                border: 0 none;
                color: #000;
                opacity: 1;
            }
        }

    }
</style>