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
    getElementDetails(params) {
        return request({
            url: '/element/getElementDetails',
            method: 'GET',
            params: params
        })
    }

}