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
            url: '/comment/addComment',
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
    getLoginCode(data) {
        return request({
            url: '/login/thirdLogin',
            method: 'POST',
            data: data
        })

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
    },
    //点赞
    doLikeDiscuss(data) {
        return request({
            url: '/praise/add',
            method: 'POST',
            data: data
        })
    },
    //榜单收藏
    rankCollect(data) {
        return request({
            url: '/ranking/secondCollect',
            method: 'POST',
            data: data
        })
    },
    //元素收藏
    elementCollect(data) {
        return request({
            url: '/element/elementCollect',
            method: 'POST',
            data: data
        })
    },
    //元素投票
    elementVote(data) {
        return request({
            url: '/vote/addVote',
            method: 'POST',
            data: data
        })
    },
    //重置密码
    resetPwd(data) {
        return request({
            url: '/login/forgot',
            method: 'POST',
            data: data
        })
    },
    //批量添加元素
    addElementMore(data) {
        return request({
            url: '/ranking/secondBindElement',
            method: 'POST',
            data: data
        })
    },
    //通知
    getNotice(data) {
        return request({
            url: '/user/userNotice',
            method: 'POST',
            data: data
        })
    },
    //埋点统计
    countUseTimes(data) {
        return request({
            url: '/statistical/add',
            method: 'POST',
            data: data
        })
    },
    //邀请ranking/inviteView
    inviteOthers(data) {
        return request({
            url: '/ranking/inviteView',
            method: 'POST',
            data: data
        })
    },
    //搜索邀请人
    searchInvite(data) {
        return request({
            url: '/ranking/searchInvite',
            method: 'POST',
            data: data
        })
    },
    //邀请
    invite(data) {
        return request({
            url: '/ranking/invite',
            method: 'POST',
            data: data
        })
    },
    //查看其他用户信息
    viewSomeoneInfo(id) {
        return request({
            url: '/user/orderUserInfo',
            method: 'GET',
            params: {
                id: id
            }
        })
    },
    //关注/取消关注
    setFocusStatus(id) {
        return request({
            url: '/user/userAttention',
            method: 'POST',
            data: {
                to_uid: id
            }
        })
    },
    //读取通知
    readNotice(id) {
        return request({
            url: '/user/userNoticeEdit',
            method: 'POST',
            data: {
                id: id
            }
        })
    },
    //举报
    report(data) {
        return request({
            url: '/report/report',
            method: 'POST',
            data: data
        })
    }
}