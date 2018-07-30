/*Created By JSIR on 2018/6/17 0017*/
'use strict'

const state = {
    isLogin: false,//是否登陆
    goLogin: false,
    topNavShow: false,
    transitionType: '',//路由切换动画类型
    firstRankIndex: 0,
    getDiscuss: false,
    loadPageNumber: [],
    someoneInfo: false,
    someoneDetails: {}
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
    },
    //获取评论
    SET_GETDISCUSS(state, val) {
        state.getDiscuss = val
    },
    //记录加载页面数量
    SET_LOADPAGENUMBER(state, val) {
        let flag = false;
        if (state.loadPageNumber.length > 0) {
            for (let i = 0; i < state.loadPageNumber.length; i++) {
                if (state.loadPageNumber[i] !== val) {
                    flag = true
                    continue
                } else {
                    flag = false
                    break
                }
            }
        } else {
            flag = true
        }
        if (flag) {
            state.loadPageNumber.push(val)
        } else {
            flag = false;
        }

    },
    //查看他人信息
    SET_SOMEONEINFO(state, val) {
        if (val[1]) {
            state.someoneInfo = val[0]
            state.someoneDetails = val[1]
        } else {
            state.someoneInfo = val
        }

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
    //获取一级榜单序号
    GET_FIRSTRANKINDEX: state => {
        return state.firstRankIndex
    },
    GET_GETDISCUSS: state => {
        return state.getDiscuss
    },
    //获取页面加载数量
    GET_LOADPAGENUMBER: state => {
        return state.loadPageNumber.length
    },
    GET_SOMEONEINFO: state => {
        return state.someoneInfo
    },
    GET_SOMEONEDETAILS: state => {
        return state.someoneDetails
    },
}
module.exports = {
    state,
    mutations,
    getters
}