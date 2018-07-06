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
    //添加评论
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
    getElementDetails(params) {
        return request({
            url: '/element/getElementDetails',
            method: 'GET',
            params: params
        })
    }

}