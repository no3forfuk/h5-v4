<template>
    <div>
        <someone-card :value="someInfo" v-if="someInfo" @changeFocus="toggleFocus"></someone-card>
        <rcm-tab :tabItem="tabLabel" :alignStyle="'center'" @toggleTab="changeTabIndex">
            <div slot="tabContent">
                <p v-for="(item,index) in rankList"
                   v-if="type == 1"
                   class="rank-list"
                   :key="index">#{{item.ranking_name}}
                </p>
                <!--<p></p>-->
                <p v-for="(collectItem,j) in collectList"
                   :key="j"
                   @click="linkTo(collectItem)"
                   class="rank-list"
                   v-if="type == 3">
                    <span>{{collectItem.level == 2?'#':'@'}}</span>{{collectItem.level ==
                    2?collectItem.ranking_name:collectItem.element_name}}
                </p>
            </div>
        </rcm-tab>
    </div>
</template>

<script>
    import someoneCard from '../UserCenter/idCard'
    import {SVS_viewSomeoneInfo, SVS_setFocusStatus} from '../../Servers/API'

    export default {
        data() {
            return {
                someInfo: '',
                u_id: '',
                tabLabel: [
                    {
                        label: '榜单',
                        type: 1
                    },
                    {
                        label: '动态',
                        type: 2
                    },
                    {
                        label: '收藏夹',
                        type: 3
                    }
                ],
                rankList: [],
                collectList: [],
                type: 1
            }
        },
        created() {
            if (this.$store.getters.GET_SOMEONEDETAILS.from_user) {
                this.u_id = this.$store.getters.GET_SOMEONEDETAILS.from_user.id
            }
            SVS_viewSomeoneInfo(res => {
                this.someInfo = res.data
                this.rankList = res.data.ranking
                let secondArr = res.data.second_collect
                let elementArr = res.data.element_collect
                for (let i = 0; i < secondArr.length; i++) {
                    secondArr[i].level = 2
                    this.collectList.push(secondArr[i])
                }
                for (let i = 0; i < elementArr.length; i++) {
                    elementArr[i].level = 3
                    this.collectList.push(elementArr[i])
                }
                this.collectList = this.collectList.sort((a, b) => {
                    return a.id - b.id
                })
            }, err => {
                return
            }, this.u_id)

        },
        methods: {
            linkTo(item) {
                this.$store.commit('SET_SOMEONEINFO', false)
                this.$store.commit('SET_TRANSITIONTYPE', 'forward')
                if (item.level && item.level == 2) {
                    this.$router.push({
                        name: 'secondRankList',
                        query: {
                            secondId: item.id
                        }
                    })
                } else if (item.level && item.level == 3) {
                    this.$router.push({
                        name: 'element',
                        query: {
                            elementId: item.id
                        }
                    })
                }
            },
            changeTabIndex(item, index) {
                this.type = item.type
            },
            toggleFocus() {
                SVS_setFocusStatus(res => {
                    if (res.message == '关注成功！') {
                        this.$set(this.someInfo, 'attention_status', 1)
                        let num = this.someInfo.fan + 1
                        this.$set(this.someInfo, 'fan', num)
                    } else {
                        this.$set(this.someInfo, 'attention_status', 0)
                        let num = this.someInfo.fan - 1
                        this.$set(this.someInfo, 'fan', num)
                    }
                    this.$toast({
                        message: res.message,
                        duration: 1000,
                        position: 'middle'
                    })
                }, err => {
                    this.$toast({
                        message: err.message,
                        duration: 1000,
                        position: 'middle'
                    })
                }, this.u_id)
            },
        },
        components: {
            someoneCard
        }
    }

</script>

<style scoped lang="less">
    .rank-list {
        padding: 10px 20px;
        font-weight: bold;
    }
</style>