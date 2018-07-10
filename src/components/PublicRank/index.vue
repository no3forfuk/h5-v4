<template>
    <div>
        <div class="input-rank-name">
            <span>#</span>
            <input type="text" placeholder="榜单好玩重要，名字帅更重要" v-model="rankName">
        </div>
        <div class="input-rank-desc">
            <textarea v-model="rankDesc" placeholder="让大家快速GET到有趣的点"></textarea>
        </div>
        <transition name="slideInDown">
            <scroll-select @change="getFatherId" v-if="selectFather" @comfirm="confirmSelectFather"></scroll-select>
        </transition>
    </div>
</template>

<script>
    import {addRank} from '../../api/api'
    import scrollSelect from './scrollSelect'

    export default {
        data() {
            return {
                rightDom: '',
                rankName: '',
                rankDesc: '',
                fatherId: '',
                selectFather: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.rightDom = this.$parent.$refs.rcmHeaders.$refs.comfirm;
                $(this.rightDom).on('click', () => {

                    if (this.fatherId) {
                        this.submitAdd()
                    } else {
                        this.selectFather = true
                    }
                })
            })
        },
        methods: {
            confirmSelectFather() {
                this.selectFather = false
            },
            nextStep() {

            },
            getFatherId(val) {
                this.fatherId = val.id
            },
            submitAdd() {
                if (this.rankName == '') {
                    this.$toast({
                        message: '榜单名不能为空',
                        duration: 1000,
                        position: 'middle'
                    })
                    return
                }
                if (this.rankDesc == '') {
                    this.$toast({
                        message: '请填写榜单描述',
                        duration: 1000,
                        position: 'middle'
                    })
                    return
                }
                let params = {};
                params.ranking_name = this.rankName
                params.ranking_desc = this.rankDesc
                params.ranking_pid = this.fatherId
                addRank(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            this.$toast({
                                message: '添加成功',
                                duration: 1000,
                                position: 'middle'
                            })
                            this.$router.push({
                                name: 'addElement',
                                query: {secondId: res.data.data.ranking_id}
                            })
                        } else {
                            console.log(res.data);
                        }
                    } else {
                        this.$toast({
                            message: '系统异常',
                            duration: 1000,
                            position: 'middle'
                        })
                    }
                }).catch(err => {
                    this.$toast({
                        message: '系统异常',
                        duration: 1000,
                        position: 'middle'
                    })
                })
            }
        },
        components: {
            scrollSelect
        }
    }

</script>

<style scoped lang="less">
    .input-rank-name {
        width: 100%;
        padding: 10px 20px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: left;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        input {
            border: 0 none;
            display: inline-block;
            width: 100%;
            background-color: #fff;
            text-indent: 5px;
        }
    }

    .input-rank-desc {
        width: 100%;
        height: 80px;
        padding: 10px 20px;
        textarea {
            border: 0 none;
            width: 100%;
            text-indent: 5px;
        }
    }

    .slideInDown-enter-active {
        animation: slideInUp 0.4s;
        position: absolute;
    }

    .slideInDown-leave-active {
        animation: slideOutDown 0.4s;
        position: absolute;
    }
</style>