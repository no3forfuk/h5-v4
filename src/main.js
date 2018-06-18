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