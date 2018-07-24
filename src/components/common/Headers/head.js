/*Created By JSIR on 2018/7/21 0021*/
'use strict'
module.exports = {
    data() {
        return {
            navShow: false,//是否展示nav
            crtIndex: 0,//当前榜单的序号
            crtPositon: '',//当前span的位置
            crtRankName: '发现',
            rankList: [
                {
                    ranking_name: '热门榜单'
                }
            ]
        }
    },
    created() {
        this.init()
    },
    mounted() {
        this.$nextTick(() => {
            this.setSpanPosition(this.crtIndex)
        })
    },
    methods: {
        init() {
            //初始化index
            if (this.$route.query.idx) {
                this.crtIndex = this.$route.query.idx
            } else {
                this.crtIndex = 0
            }
            //获取导航数据
            let navList = this.$storage.GET_session('firstRank')
            if (navList) {
                this.rankList = this.rankList.concat(navList)
                this.crtRankName = this.rankList[this.crtIndex].ranking_name
            } else {

            }
        },
        toggleHeadNav() {
            this.navShow = !this.navShow
            this.$store.commit('TOGGLENAVSHOW', this.navShow)
        },
        toggleLi(index, item) {
            //当前榜单动画
            this.crtIndex = index
            //设置span位置
            this.setSpanPosition(index)
            //请求一级榜单详情
            this.crtRankName = item.ranking_name
            this.$emit('getIndexData', item)
            this.$store.commit('SET_FIRSTRANKINDEX', index)
            this.$router.replace({
                name: 'hot',
                query: {
                    idx: index,
                    firstId: item.id
                }
            })
        },
        setSpanPosition(i) {
            let left = this.$refs.lis[i].offsetLeft
            let liWidth = this.$refs.lis[i].offsetWidth
            this.crtPositon = (liWidth - 12) / 2 + left
        }
    },
    props:
        ['idx', 'type', 'right'],
    computed: {
        calcHeight() {
            if (this.navShow) {
                this.$count(['Ranking_Lv1_Discover', 1])
                return {
                    height: '30px'
                }
            } else {
                return {
                    height: '0px'
                }
            }
        }
        ,
        spanPosition() {
            return {
                transform: 'translateX(' + this.crtPositon + 'px)'
            }
        }
    }
}