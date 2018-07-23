<template>
    <div class="rcm-header-nav">
        <div class="rcm-head-ctrl">
            <div class="rcm-head-ctrl-left" @click="$emit('linkTo')">
                <icon :value="'&#xe609;'" class="font-size-28" v-if="type == 'menu'">menu</icon>
                <icon :value="'&#xe600;'" class="font-size-24" v-if="type == 'back'">back</icon>
            </div>
            <div class="rcm-head-ctrl-right" @click="toggleHeadNav" v-if="right">
                <span v-text="crtRankName"></span>
                <icon :value="'&#xe7e9;'" v-if="!navShow">down</icon>
                <icon :value="'&#xe952;'" v-if="navShow">up</icon>
            </div>
        </div>
        <div class="rcm-head-nav" :style="calcHeight">
            <div class="scroll-box">
                <ul class="head-nav-ul">
                    <span v-if="navShow" :style="spanPosition"></span>
                    <li v-for="(item,index) in rankList"
                        ref="lis"
                        :key="index"
                        v-text="item.ranking_name"
                        @click="toggleLi(index,item)"
                        :class="{scalePulse:crtIndex == index}"
                        class="head-nav-li"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    const head = require('./head')
    export default head
</script>

<style scoped lang="less" src="./head.less">

</style>