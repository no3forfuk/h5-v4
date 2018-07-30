<template>
    <div class="user-card">
        <div class="pic">
            <img :src="value.avatar" alt="">
            <span @click="editUserInfo" v-if="!$store.getters.GET_SOMEONEINFO">
                <icon :value="'&#xe602;'">编辑</icon>
            </span>
            <button v-if="$store.getters.GET_SOMEONEINFO" class="user-btn" @click="$emit('changeFocus')">
                <span class="btn-focus" v-if="value.attention_status == 0">关注</span>
                <span class="btn-focused" v-if="value.attention_status == 1">已关注</span>
            </button>
        </div>
        <p class="name">
            <span>{{value.name}}</span>
        </p>
        <div class="fav" v-if="value.ranking_name || value.signature">
            <span v-if="value.ranking_name">#{{value.ranking_name}}</span>
            <span v-if="value.signature">{{value.signature}}</span>
        </div>
        <div class="focus" v-if="!$store.getters.GET_SOMEONEINFO">
            <i>{{value.attention}}</i>
            <span>关注</span>
            <i>{{value.fan}}</i>
            <span>粉丝</span>
            <i>{{value.collect}}</i>
            <span>收藏</span>
        </div>
        <div class="focus" v-if="$store.getters.GET_SOMEONEINFO">
            <i>{{value.attention}}</i>
            <span>关注</span>
            <i>{{value.fan}}</i>
            <span>粉丝</span>
            <i>{{value.praise_num}}</i>
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
                this.$store.commit('SET_TRANSITIONTYPE', 'forward')
                this.$router.push({name: 'userInfo'})
            }
        },
        props: ['value'],
        watch: {}
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
            .user-btn {
                width: 70px;
                height: 24px;
                background-color: #D5D5D5;
                border: 0 none;
                border-radius: 4px;
                font-size: 16px;
                text-align: center;
                .btn-focus {
                    color: #FF2C09;
                }
                .btn-focused {
                    color: #010101;
                }
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