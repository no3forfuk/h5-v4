<template>
    <div class="user-card">
        <div class="pic">
            <img :src="value.avatar" alt="">
            <span @click="editUserInfo">
                <icon :value="'&#xe602;'">编辑</icon>
            </span>
        </div>
        <p class="name">
            <span>{{value.name}}</span>
        </p>
        <div class="fav">
            <span v-if="value.ranking_name">#{{value.ranking_name}}</span>
            <span>{{value.signature}}</span>
        </div>
        <div class="focus">
            <i>1200</i>
            <span>关注</span>
            <i>230</i>
            <span>粉丝</span>
            <i>10</i>
            <span>获赞</span>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {
            editUserInfo() {
                this.$router.push({name: 'userInfo'})
            }
        },
        props: ['value']
    }

</script>

<style scoped lang="less">
    .user-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
        .pic {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            padding-top: 0px;
            img {
                border-radius: 50%;
                width: 100px;
                height: 100px;
            }
            i {
                font-size: 20px;
            }
        }
        .name {
            width: 100%;
            padding: 0 10px;
            span {
                display: inline-block;
                padding: 10px 0px;
                line-height: 21px;
                font-size: 18px;
                border-bottom: 1px solid #CDCED4;
            }
        }
        .fav {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: left;
            padding: 10px;
            color: #8B8B8B;
            span:nth-child(1) {
                white-space: nowrap;
            }
            span:nth-child(2) {
                margin-left: 10px;
                padding-left: 10px;
                border-left: 1px solid #8B8B8B;
            }
        }
        .focus {
            padding: 5px 10px;
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            justify-content: left;
            align-items: baseline;
            i {
                font-size: 18px;
            }
            span {
                margin: 0 7px;
            }
        }
    }
</style>