/*Created By Jsir on 2018/7/18*/
'use strict'
import API from '../api/api'

function factory(fn, success, error, options) {
    fn(options).then(res => {
        if (res.status == 200) {
            if (res.data.status_code == 1) {
                success(res.data)
            } else {
                if (!error) return
                error(res.data)
            }
        } else {
            return
        }
    }).catch(err => {
        throw err
    })
}

const Servers = {}
//获取用户信息
Servers.SVS_userInfo = function (success, error, options) {
    factory(API.getUserInfo, success, error, options)
}
//手机登陆
Servers.SVS_loginByTel = function (success, error, options) {
    factory(API.loginByPhone, success, error, options)
}
//第三方登陆
Servers.SVS_loginByOther = function (success, error, options) {
    factory(API.getLoginCode, success, error, options)
}
//手机注册
Servers.SVS_register = function (success, error, options) {
    factory(API.registerByPhone, success, error, options)
}
//获取验证码getYZM
Servers.SVS_getYZM = function (success, error, options) {
    factory(API.getYZM, success, error, options)
}
//编辑用户信息
Servers.SVS_editUserInfo = function (success, error, options) {
    factory(API.editUserInfo, success, error, options)
}
//获取推送列表
Servers.SVS_getIndex = function (success, error, options) {
    factory(API.getIndex, success, error, options)
}
//获取一级榜单列表
Servers.SVS_firstRankList = function (success, error, options) {
    factory(API.getFirstRankList, success, error, options)
}
//获取通知
Servers.SVS_getNotice = function (success, error, options) {
    factory(API.getNotice, success, error, options)
}
//获取1,2级榜单详情
Servers.SVS_getRankList = function (success, error, options) {
    factory(API.getRankList, success, error, options)
}

module.exports = Servers;