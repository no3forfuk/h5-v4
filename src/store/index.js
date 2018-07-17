/*Created By JSIR on 2018/6/17 0017*/
'use strict'

const state = {
    direction: 'forward',
    openUserCenter: false,
    routerDirection: 'forward',
    rankIndex: 0,
    isLogin: false,
    goLogin: false,
    topNavShow: false,
    loginType: '',
    backUrl: ''
}
const mutations = {
    TOGGLENAVSHOW(state, val) {
        this.state.topNavShow = val
    },
    LOGIN(state, login) {
        state.isLogin = login
    },
    //设置登陆类型
    SETLOGINTYPE(state, type) {
        state.loginType = type
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
    },
    SETRANKINDEX(state, index) {
        state.rankIndex = index
    }
};
const getters = {
    GOLOGIN: state => {
        return state.goLogin
    },
    TOPNAVSTATE: state => {
        return state.topNavShow
    },
    //获取登陆类型
    GETLOGINTYPE: state => {
        return state.loginType
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