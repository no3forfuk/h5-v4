<template>
    <li class="cell">
        <router-link :to="{name:'element'}">
            <div class="left">
                <span>1</span>
            </div>
            <div class="right">
                <div class="element-text">
                    <h2>@火影忍者</h2>
                    <p>
                        日本动漫《火影忍者》中的重要人物。火之国木叶隐村宇智波一族的成员，宇智波佐助的哥哥。是宇智波一族的天才忍者，年幼时跟宇智波止水是挚友，实力强大，擅长使用幻术。为了保护村子免受战乱，被迫接受了灭族任务，留下了弟弟佐助并刺激他向自己复仇，之后加入晓组织做卧底</p>
                </div>
                <img src="http://p9w69x04q.bkt.clouddn.com/you.jpg" alt="">
            </div>
        </router-link>
    </li>
</template>

<script>

    export default {
        data() {
            return {}
        }
    }

</script>

<style scoped lang="less">
    .cell {
        width: 100%;
        padding-bottom: 10px;
        a {
            display: flex;
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
            .left {
                flex: 0 0 20px;
                padding: 0 10px;
                span {
                    display: block;
                    margin-top: 2px;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    background-color: #E4E4E4;
                    border-radius: 1px;
                    line-height: 20px;
                    color: #FF2C09;
                    font-weight: bold;
                }
            }
            .right {
                flex: 1;
                padding-right: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.2);
                .element-text {
                    padding-right: 10px;
                    color: #000;
                    h2 {
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 18px;
                    }
                    p {
                        height: 44px;
                        overflow: hidden;
                        text-align: justify;
                        padding-top: 5px;
                    }
                }
                img:nth-child(2) {
                    width: 64px;
                    height: 64px;
                    border-radius: 2px;
                    flex: 0 0 64px;
                }
            }
        }
    }
</style>