<template>
    <div class="rcm-tab-com">
        <ul class="rcm-tab-header">
            <li class="tab-item"
                v-for="(item,index) in tabItem"
                :key="index"
                ref="tabLis"
                :class="{'active-li':index == crtIndex}"
                @click="toggleTabItem(item,index)"
                v-text="item.label"></li>
            <span :style="spanPosition" class="mask-position"></span>
        </ul>
        <div class="rcm-tab-body">
            <slot name="tabContent"></slot>
        </div>
    </div>
</template>

<script>
    const tab = require('./tabs.js')
    export default tab

</script>

<style scoped lang="less" src="./tabs.less">

</style>