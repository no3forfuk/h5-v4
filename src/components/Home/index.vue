<template>
    <div class="home">
        <rcm-header class="home-header">
            <icon slot="back"
                  @click="goUserCenter"
                  :value="'&#xe609;'"
                  class="font-size-28">
            </icon>
            <find-ctrl slot="right"
                       color="#7D09FF">
            </find-ctrl>
            <find-body slot="find" class="find-body"></find-body>
        </rcm-header>
        <div class="home-body">
            <p class="page-header">开荒神器RCM</p>
            <ul class="ranklist">
                <rank-card v-for="(item,index) in list"
                           :key="index"></rank-card>
            </ul>
        </div>
    </div>

</template>

<script>
    import findBody from '../common/Find/findBody'
    import rankList from '../FirstRank/index'
    import findCtrl from '../common/Find/findCtrl'
    import {getIendx} from '../../api/api'

    export default {
        data() {
            return {
                popupVisible: true,
                forward: '',
                list: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                scrollY: 0
            }
        },

        created() {

        },
        mounted() {
            this.$nextTick(() => {
                this.setScrollHeight()
            })
        },
        updated() {
            this.$nextTick(() => {
                this.setScrollHeight()
            })
        },
        watch: {},

        beforeRouteLeave(to, from, next) {
            this.$store.commit('SETROUTERFROM', from.name)
            this.$store.commit('SETROUTERTO', to.name)
            next()
        },
        methods: {
            setScrollHeight() {
                let windowHeight = $(window).height();
                let headerHeight = $('.home-header').height()
                let activeHeight = $('.find-body').height()
                let bodyHeight = windowHeight - headerHeight + activeHeight;
                $('.home-body').height(bodyHeight)
            },
            goUserCenter() {
                this.$router.push({name: 'userCenter'})
            }
        },
        computed: {},
        components: {
            findBody,
            findCtrl,
            rankList
        }
    }

</script>

<style scoped lang="less">
    .home {
        width: 100%;
        background-color: #fff;
        .home-body {
            overflow-y: auto;
        }
    }

    .ranklist {
        width: 100%;
        padding: 5px 0px;
    }

    .page-header {
        width: 100%;
        padding: 0 10px;
        padding-bottom: 5px;
        font-size: 30px;
        border-bottom: 1px solid #C8C7CD;
    }


</style>