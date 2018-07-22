/*Created By JSIR on 2018/6/17 0017*/
'use strict'

const state = {
    isLogin: false,//是否登陆
    goLogin: false,
    topNavShow: false,
    transitionType: '',//路由切换动画类型
    firstRankIndex: 0
}
const mutations = {
    TOGGLENAVSHOW(state, val) {
        this.state.topNavShow = val
    },
    LOGIN(state, login) {
        state.isLogin = login
    },
    GOLOGIN(state, val) {
        state.goLogin = val
    },
    //路由切换动画类型
    SET_TRANSITIONTYPE(state, type) {
        state.transitionType = type
    },
    SET_FIRSTRANKINDEX(state, index) {
        state.firstRankIndex = index
    }
};
const getters = {
    //是否打開登陸頁面
    GOLOGIN: state => {
        return state.goLogin
    },
    //是否展示顶部导航
    TOPNAVSTATE: state => {
        return state.topNavShow
    },
    //路由切换动画类型
    GET_TRANSITIONTYPE: state => {
        return state.transitionType
    },
    GET_FIRSTRANKINDEX: state => {
        return state.firstRankIndex
    }
}
module.exports = {
    state,
    mutations,
    getters
}