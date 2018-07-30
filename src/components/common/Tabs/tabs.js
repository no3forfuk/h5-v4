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
        if (this.initIndex) {
            this.crtIndex = this.initIndex
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.setMaskSpanPosition(this.crtIndex)
        })
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
        },
        align() {
            if (this.alignStyle == 'center') {
                return {
                    justifyContent: "space-between",
                }
            }
            if (this.alignStyle == 'left') {
                return {
                    justifyContent: "left"
                }
            }
            if (this.alignStyle == 'right') {
                return {
                    justifyContent: "right"
                }
            }
        }
    },
    props: ['tabItem', 'initIndex', 'alignStyle']
}