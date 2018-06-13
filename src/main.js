/*Created By Jsir on 2018/6/13*/
'use strict'
import Vue from 'vue';
import App from './app'
//vue-router
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routerConfig = require('./router/index');
const router = new VueRouter(routerConfig);
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
    render: c => c(App)
})