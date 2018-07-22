/*Created By Jsir on 2018/7/18*/
'use strict'
const Storage = {}
Storage.GET_session = function (item) {
    var k;
    if (item == 'X-Auth-Token') {
        k = sessionStorage.getItem(item)
    } else {
        k = JSON.parse(sessionStorage.getItem(item));
    }
    return k
}
//设置sessionStorage
Storage.SET_session = function (item, value) {
    var k;
    if (typeof value !== 'string') {
        k = sessionStorage.setItem(item, JSON.stringify(value))
    } else {
        k = sessionStorage.setItem(item, value)
    }
    return k
}
//获取localstorage
Storage.GET_local = function (item) {
    let k = JSON.parse(localStorage.getItem(item))
    return k
}
//获取localstorage
Storage.SET_local = function (item, value) {
    var k;
    if (typeof value !== 'string') {
        k = localStorage.setItem(item, JSON.stringify(value))
    } else {
        k = localStorage.setItem(item, value)
    }
    return k
}
module.exports = Storage;