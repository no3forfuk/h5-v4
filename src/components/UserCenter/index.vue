<template>
    <div class="user-center">
        <div class="user-body">
            <card :value="userData" v-if="userData"></card>
            <opts></opts>
            <footer class="footer">为了保证RCM榜单数据的客观真实，需要您的支持</footer>
        </div>
    </div>
</template>

<script>
    import Card from './idCard'
    import opts from './options'
    import {getUserInfo} from '../../api/api'
    import {inheritObject, timeFormat} from '../../utils'

    export default {
        data() {
            return {
                direction: '',
                userData: '',
                defaultData: {
                    avatar: 'http://p8rk87lub.bkt.clouddn.com/visitor.jpg',
                    avatar_key: 'visitor.jpg',
                    email: '',
                    get_expert: {
                        ranking_name: '暂无',
                        id: NaN
                    },
                    name: '用户' + parseInt(new Date() / 123),
                    signature: '该用户什么也不想说',
                    updated_at: timeFormat('-')
                }

            }
        },
        methods: {
            go() {
                this.direction = 'home'
            }
        },
        created() {
            this.init()

        },
        mounted() {
            this.$nextTick(() => {
                $('.user-center').height($(window).height())
                $('.user-body').height($(window).height() - 29)
            })
        },
        beforeRouteLeave(to, from, next) {
            next()
        },
        beforeDestroy() {
            this.$store.commit('SETOPENUSERCENTER', true)
        },
        methods: {
            getUserInfoFromServer() {
                getUserInfo().then(res => {
                    let str = JSON.stringify(res.data.data)
                    sessionStorage.setItem('userInfo', str)
                    this.userData = inheritObject(res.data.data, this.defaultData)
                }).catch(err => {
                    throw err
                })
            },
            init() {
                //用户数据
                let data = sessionStorage.getItem('userInfo')
                if (data) {
                    this.userData = inheritObject(JSON.parse(data), this.defaultData)
                    console.log(this.userData);
                } else {
                    this.getUserInfoFromServer()
                }
            },
            goHome() {
                this.$router.push({name: 'home'})
            }
        },
        computed: {},
        components: {
            card: Card,
            opts
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