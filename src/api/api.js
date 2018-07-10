/*Created By Jsir on 2018/4/25*/
'use strict'
import request from './request'

module.exports = {
    //获取首页推送
    getIndex(data) {
        return request({
            url: '/index',
            method: 'POST',
            data: data
        })
    },
    getFirstRankList(params) {
        return request({
            url: '/index/firstList',
            method: 'GET',
            params: params
        })
    },
    //获取微信鉴权
    getWXConfig(params) {
        return request({
            url: '/wx/signature',
            method: 'POST',
            data: params
        })
    },

    //【榜单】1级/2级---榜单详情以及子元素
    getRankList(params) {
        return request({
            url: '/ranking/getRanking',
            method: 'GET',
            params: params
        })
    },
    //获取评论列表
    getDiscussList(params) {
        return request({
            url: '/ranking/getComment',
            method: 'GET',
            params: params
        })
    },
    //游客添加评论
    addComment(data) {
        return request({
            url: '/comment/visitorAdd',
            method: 'POST',
            data: data
        })
    },
    //获取POST详情
    getPostDetailsById(params) {
        return request({
            url: '/post/getPostDetails',
            method: 'GET',
            params: params
        })
    },
    //发布POST
    publicPost(data) {
        return request({
            url: '/post/addPost',
            method: 'POST',
            data: data
        })
    },
    //获取七牛token
    getQiniuToken(data) {
        return request({
            url: '/qiniu/getUploadToken',
            method: 'POST',
            data: data
        })
    },
    //登陆
    loginByPhone(data) {
        return request({
            url: '/login',
            method: 'POST',
            data: data
        })
    },
    //首次设置资料
    setUserInfoAtFirst(data) {
        return request({
            url: '/user/firstUpdate',
            method: 'POST',
            data: data
        })
    },
    //获取评论
    getDiscuss(params) {
        return request({
            url: '/ranking/getComment',
            method: 'GET',
            params: params
        })
    },
    //注册
    registerByPhone(data) {
        return request({
            url: '/login/reg',
            method: 'POST',
            data: data
        })
    },
    //获取验证码
    getYZM(data) {
        return request({
            url: '/login/sms',
            method: 'POST',
            data: data
        })
    },
//获取第三方登陆code
    loginByOther(data) {
        return request({
            url: '/login/thirdLogin',
            method: 'POST',
            data: data
        })
    },
    //添加元素
    addElement(data) {
        return request({
            url: '/element/addElement',
            method: 'POST',
            data: data
        })
    },
    //添加榜单
    addRank(data) {
        return request({
            url: '/ranking/addSecond',
            method: 'POST',
            data: data
        })
    },
    //查找元素
    searchElementByName(data) {
        return request({
            url: '/element/getElementName',
            method: 'POST',
            data: data
        })
    },
    //获取用户信息
    getUserInfo(data) {
        return request({
            url: '/user/userInfo',
            method: 'POST',
            data: data
        })
    },
    //编辑用户资料
    editUserInfo(data) {
        return request({
            url: '/user/editUser',
            method: 'POST',
            data: data
        })
    },
    getLoginCode(params) {
        if (params == 'weixin') {
            return request({
                url: 'https://open.weixin.qq.com/connect/oauth2/authorize',
                method: 'GET',
                params: {
                    appid: 'wx9b154f4a099953b0',
                    redirect_uri: 'http://rcm.cc',
                    response_type: 'code',
                    scope: 'snsapi_userinfo',
                    state: 'STATE#wechat_redirect'
                }
            })
        }
        if (params == 'qq') {
            return request({
                url: 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101476497&redirect_uri=http://test.bantangtv.com&state=111',
                method: 'GET',
                params: {
                    client_id: '101476497',
                    redirect_uri: 'http://test.bantangtv.com',
                    response_type: 'code',
                    state: '111'
                }
            })
        }

    },
    //首次更新用户资料、
    firstUpdataUserInfo(data) {
        return request({
            url: '/user/firstUpdate',
            method: 'POST',
            data: data
        })
    },

    //获取元素详情
    getElementDetails(params) {
        return request({
            url: '/element/getElementDetails',
            method: 'GET',
            params: params
        })
    }

}