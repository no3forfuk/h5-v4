<template>
    <div class="add-element">
        <div class="add-body">
            <h3>#{{title}}</h3>
            <div class="input-box">
                <input type="text" placeholder="为这个榜单添加新的成员" v-model="elemenName">
            </div>
            <div class="element-desc" v-if="hasTitle">
                <textarea v-model="elementDesc" placeholder="介绍一下啊这个新成员吧"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    import {getRankList, addElement} from '../../api/api'

    export default {
        data() {
            return {
                title: '',
                elemenName: '',
                elementDesc: '',
                hasTitle: false,
                nextStepDom: ''
            }
        },
        created() {
            this.getRankInfo()

        },
        mounted() {
            this.$nextTick(() => {
                this.nextStepDom = this.$parent.$refs.rcmHeaders.$refs.comfirm;
                $(this.nextStepDom).on('click', () => {
                    if (this.elemenName != '') {
                        this.activeTextarea()
                    } else {
                        this.$toast({
                            message: '请填写元素名称',
                            position: 'middle',
                            duration: 1000
                        })
                    }
                })
            })
        },
        methods: {
            activeTextarea() {
                this.hasTitle = true;
                this.nextStepDom.children[0].innerText = '完成';
                $(this.nextStepDom).unbind()
                $(this.nextStepDom).on('click', () => {
                    let params = {};
                    params.element_name = this.elemenName
                    params.element_desc = this.elementDesc
                    params.ranking_id = this.$route.query.secondId
                    addElement(params).then(res => {
                        if (res.status == 200) {
                            if (res.data.status_code == 1) {
                                this.$toast({
                                    message: '发布成功',
                                    duration: 1000,
                                    position: 'middle'
                                })
                                this.$router.replace({
                                    name: 'secondRankList',
                                    query: this.$route.query
                                })
                            } else {
                                this.$toast({
                                    message: res.data.message,
                                    duration: 1000,
                                    position: 'middle'
                                })
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
                })
            },
            getRankInfo() {
                let params = {};
                params.id = this.$route.query.secondId
                params.level = 2
                getRankList(params).then(res => {
                    this.title = res.data.data.ranking_name
                }).catch(err => {
                    throw err
                })
            }
        }
    }

</script>

<style scoped lang="less">
    .add-element {
        width: 100%;
        .add-body {
            width: 100%;
            h3 {
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
            }
            .input-box {
                width: 100%;
                border-top: 1px solid rgba(0, 0, 0, .3);
                input {
                    width: 100%;
                    height: 24px;
                    border: 0 none;
                    text-indent: 1em;
                }
            }
            .element-desc {
                width: 100%;
                border-top: 1px solid rgba(0, 0, 0, .3);
                padding: 10px;
                textarea {
                    width: 100%;
                    height: 80px;
                    border: 0 none;
                    background-color: #fff;
                }
            }
        }
    }
</style>