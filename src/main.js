/*Created By Jsir on 2018/6/13*/
'use strict'
import Vue from 'vue';
import App from './app'

//全局过滤器
function phoneType() {
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) {
        return 'Android'
    }
    if (isIOS) {
        return 'IOS'
    }
}

import propUp from './components/common/propUp/index'

Vue.prototype.$propUp = propUp
Vue.filter('timeformat', val => {
    let ms;
    if (phoneType() == 'Android') {
        ms = new Date(val).getTime();
    }
    if (phoneType() == 'IOS') {
        let str = val.replace(/\-/g, '/');
        ms = new Date(str).getTime();
    }
    var time = new Date();
    var gap = Math.abs(time - ms);
    var second = parseInt(gap / 1000);
    if (second < 60) {
        return second + '秒前';
    }
    var minuit = parseInt(gap / 1000 / 60);
    if (minuit < 60) {
        return minuit + '分钟前';
    }
    var hour = parseInt(gap / 1000 / 60 / 60);
    if (hour < 24) {
        return hour + '小时前';
    }
    var day = parseInt(gap / 1000 / 60 / 60 / 24);
    if (day > 1) {
        return day + '天前';
    }
})


import Storage from './Servers/Storage'

Vue.prototype.$storage = Storage

//统计
import {countUseTimes} from './api/api'

const count = function (data, success) {
    let params = {};
    params.statistical_serial = data[0]
    params.statistical_num = data[1]
    if (Storage.GET_session('X-Auth-Token') && Storage.GET_session('userInfo')) {
        params.from_uid = Storage.GET_session('userInfo').id
        params.user_type = 1
    } else {
        params.user_type = 2
    }
    countUseTimes(params).then(res => {
        if (res.status == 200 && res.data.status_code == 1) {
            if (!success) return
        } else {
            return
        }
    }).catch(err => {
        throw err
    })
}
Vue.prototype.$count = count
let bus = new Vue()
Vue.prototype.bus = bus
//vuex
import Vuex from 'vuex';

Vue.use(Vuex);
const storeConfig = require('./store/index');
const store = new Vuex.Store(storeConfig);
//WX
const wx = require('weixin-js-sdk')
Vue.prototype.$wx = wx;
//七牛JS-SDK
const qiniu = require('qiniu-js');
Vue.prototype.qiniu = qiniu;
//MD5
const MD5 = require('js-md5')
Vue.prototype.MD5 = MD5;
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