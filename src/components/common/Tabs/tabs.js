/*Created By Jsir on 2018/7/25*/
'use strict'
module.exports = {
    data() {
        return {
            crtIndex: 0,
            liOffsetX: 44
        }
    },
    created() {
        this.crtIndex = this.initIndex
    },
    methods: {
        toggleTabItem(item, index) {
            this.crtIndex = index
            this.setMaskSpanPosition(index)
            this.$emit('toggleTab', item)
        },
        setMaskSpanPosition(i) {
            let width = $(this.$refs.tabLis[i]).width();
            let left = this.$refs.tabLis[i].offsetLeft;
            let X = (width - 16) / 2;
            this.liOffsetX = left + X;
        }
    },
    computed: {
        spanPosition() {
            return {
                transform: 'translateX(' + this.liOffsetX + 'px)'
            }
        }
    },
    props: ['tabItem','initIndex']
}