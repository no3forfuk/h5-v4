<template>
    <ul class="ranklist">
        <rank-card v-for="(item,index) in list"
                   :value="item"
                   :key="index"></rank-card>
    </ul>

</template>

<script>
    import {getRankList} from '../../api/api'

    export default {
        data() {
            return {
                list: []
            }
        },
        created() {
            this.getFirstList()
        },
        methods: {
            getFirstList() {
                let params = {}
                params.level = 1;
                params.id = this.$route.params.firstId
                getRankList(params).then(res => {
                    if (res.status == 200) {
                        if (res.data.status_code == 1) {
                            console.log(res.data);
                        } else {

                        }
                    } else {

                    }
                }).catch(err => {
                    throw err
                })
            }
        }
    }

</script>

<style scoped lang="less">
    .ranklist {
        width: 100%;
        padding: 5px 0px;
    }

</style>