<template>
    <div class="user-center">
        <rcm-head :type="'back'" @linkTo="goBack" :right="false"></rcm-head>
        <div class="user-body">
            <card :value="userData" v-if="userData"></card>
            <opts @publicRank="activeAddRank = true"></opts>
            <footer class="footer">为了保证RCM榜单数据的客观真实，需要您的支持</footer>
        </div>
        <rcm-popup :show="activeAddRank"
                   :type="'full'"
                   @close="activeAddRank = false">
            <add-rank slot="fullPage" @cancel="activeAddRank = false"></add-rank>
        </rcm-popup>
    </div>
</template>

<script>
    import Card from './idCard'
    import opts from './options'
    import addRank from '../PublicRank/index'
    import {SVS_userInfo} from '../../Servers/API'
    import Storage from '../../Servers/Storage'
    import {SNI_userInfo} from '../../Snippet'

    export default {
        data() {
            return {
                direction: '',
                userData: '',
                activeAddRank: false
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                let userInfo = this.$storage.GET_session('userInfo')
                if (userInfo) {
                    this.userData = userInfo
                } else {
                    SVS_userInfo(res => {
                        this.userData = res.data
                        this.$storage.SET_session('userInfo', res.data)
                    }, err => {
                        throw err
                    })
                }
            },
            goBack() {
                this.$store.commit('SET_TRANSITIONTYPE', 'center-home')
                this.$router.push({
                    name: 'hot',
                    query: this.$route.query
                })
            }
        },
        computed: {},
        components: {
            card: Card,
            opts,
            addRank
        }
    }

</script>

<style scoped lang="less">
    .user-center {
        width: 100%;
        background-color: #fff;
    }

    .user-body {
        width: 100%;
        overflow-y: auto;
    }

    .footer {
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 12px;
        color: #C8C7CD;
        line-height: 40px;
    }


</style>