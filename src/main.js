/*Created By Jsir on 2018/6/13*/
'use strict'
import Vue from 'vue';
import App from './app'
//vuex
import Vuex from 'vuex';

Vue.use(Vuex);
const storeConfig = require('./store/index');
const store = new Vuex.Store(storeConfig);
//vue-router
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routerConfig = require('./router/index');
const router = new VueRouter(routerConfig);
//守卫导航
router.beforeEach((to, from, next) => {
    next()
})
//todo 优化
//1.个人主页下方滚动
//2.编辑个人信息页面之修改擅长领域
//3.我的消息 完善
//4.列表下拉刷新
//5.榜单页面头部发现数据绑定
//6.添加榜单及元素
//7.最新，最热排序
//8.时间过滤器
//9.点赞动画
//10.POST评论
//11.V2-API集成
//12.接口
//13.登陆，注册
//Mint-ui
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';

Vue.use(Mint);
//全局组件
require('./components/index');
//全局样式
import './style/animate'
import './style/reset'
import './style/base'

new Vue({
    el: '#app',
    router,
    store,
    render: c => c(App)
})