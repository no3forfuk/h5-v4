/*Created By JSIR on 2018/6/17 0017*/
'use strict'

const state = {
    direction: 'forward',
    openUserCenter: false,
    rankIndex: 0,
    isLogin: false,
    goLogin: false,
    topNavShow: false,
    backUrl: ''
}
const mutations = {
    TOGGLENAVSHOW(state, val) {
        this.state.topNavShow = val
    },
    LOGIN(state, login) {
        state.isLogin = login
    },
    //设置返回地址
    SETBACKURL(state, url) {
        state.backUrl = url
    },
    GOLOGIN(state, val) {
        state.goLogin = val
    },
    SETOPENUSERCENTER(state, val) {
        state.openUserCenter = val
    },
    SETDIRECTION(state, direction) {
        state.direction = direction
    },
    SETROUTERDIRECTION(state, direction) {
        state.routerDirection = direction
    }
};
const getters = {
    //是否打開登陸頁面
    GOLOGIN: state => {
        return state.goLogin
    },
    TOPNAVSTATE: state => {
        return state.topNavShow
    },
    //获取返回地址
    GETBACKURL: state => {
        return state.backUrl
    }
}
module.exports = {
    state,
    mutations,
    getters
}