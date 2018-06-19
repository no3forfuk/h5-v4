<template>
    <transition name="transitionName" mode="in-out">
        <div class="user-info">
            <rcm-header>
                <icon :value="'&#xe600;'"
                      class="font-size-20"
                      slot="back"></icon>
                <span slot="text">我的</span>
            </rcm-header>
            <div class="user-pic" @click="changePic">
                <span class="font-size-16">
                    <span>修改</span><span>头像</span>
                    <input type="file"
                           style="width: 0;opacity: 0;height: 0px;position: absolute;"
                           accept="image/jpg,image/png"
                           ref="pic">
                </span>
                <img src="http://p9w69x04q.bkt.clouddn.com/you.jpg" alt="">
            </div>
            <div class="user-name">
                <span class="font-size-16">
                    <span>修改</span><span>昵称</span>
                </span>
                <icon :value="'&#xe601;'" class="font-size-20"></icon>
            </div>
            <div class="user-fav">
                <span class="font-size-16">
                    <span>修改</span><span>擅长领域</span>
                </span>
                <icon :value="'&#xe601;'" class="font-size-20"></icon>
            </div>
            <div class="user-sign">
                <span class="font-size-16">
                    <span>修改</span><span>个性签名</span>
                </span>
                <icon :value="'&#xe601;'" class="font-size-20"></icon>
            </div>
            <div class="belt"></div>
            <div class="confirm">完 成</div>
            <div class="belt"></div>
            <div class="footer"><p>用爱喂食挚爱，那么TA将GO BIG</p></div>
        </div>
    </transition>
</template>

<script>

    export default {
        data() {
            return {}
        },
        methods: {
            changePic() {
                this.$refs.pic.click()
            }
        }
    }

</script>

<style scoped lang="less">
    .belt {
        width: 100%;
        height: 7px;
        background-color: #C8C7CD;
    }

    .footer {

        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        p {
            font-size: 12px;
            color: #D9D9D9;
            margin: 0 auto;
        }
    }

    .confirm {
        width: 100%;
        display: flex;
        justify-content: center;
        color: #FF0000;
        font-size: 20px;
        line-height: 24px;
        padding: 10px;
    }

    .user-info {
        width: 100%;
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
        }
        .user-name {
            width: 100%;
            padding: 15px 26px 15px 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
        .user-fav {
            width: 100%;
            padding: 15px 26px 15px 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
        .user-sign {
            width: 100%;
            padding: 15px 26px 15px 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
    }

    .transitionName-enter-active {
        animation: slideInRight 0.4s;
        position: absolute;
    }

    .transitionName-leave-active {
        animation: slideOutLeft 0.4s;
        position: absolute;
    }
</style>