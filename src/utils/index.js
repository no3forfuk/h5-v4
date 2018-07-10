/*Created By Jsir on 2018/6/15*/
'use strict'
const utils = {};
import {getWXConfig} from '../api/api'

utils.timeFormat = function (type, ms) {
    var time;
    if (ms) {
        time = new Date(ms);
    } else {
        time = new Date();
    }
    let mouth = time.getMonth() + 1;
    let day = time.getDate();
    if (mouth < 10) {
        mouth = '0' + mouth
    } else {
        mouth = mouth;
    }
    if (day < 10) {
        day = '0' + day
    } else {
        day = day
    }
    return time.getFullYear() + type + mouth + type + day;
}
utils.sharePage = function (vm, url, title, desc, type, cb) {
    var params = {};
    var linkUrl = url.split('#')[0] + url.split('#/')[1];
    params.url = linkUrl
    getWXConfig(params).then(res => {
        if (res.status == 200 && res.data.status_code == 1) {
            var opts = res.data.data;
            var config = {
                debug: false,
                appId: opts.appId,
                timestamp: opts.timestamp,
                nonceStr: opts.nonceStr,
                signature: opts.signature,
                jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
            }
            vm.$wx.config(config);
            vm.$wx.ready(function () {
                vm.$wx.onMenuShareAppMessage({
                    title: title,
                    desc: desc,
                    link: url,
                    imgUrl: 'http://p8rk87lub.bkt.clouddn.com/logo.png',
                    type: type,
                    success: function () {
                        vm.$toast({
                            message: '分享成功',
                            duration: 1000
                        })
                        cb()
                    }
                })
                vm.$wx.onMenuShareTimeline({
                    title: title,
                    desc: desc,
                    link: url,
                    imgUrl: 'http://p8rk87lub.bkt.clouddn.com/logo.png',
                    type: type,
                    success: function () {
                        vm.$toast({
                            message: '分享成功',
                            duration: 1000
                        })
                    }
                })

            })
        }
    }).catch(err => {
        throw err
    })
}
//判断触摸行为
utils.getTouchType = function (vm, jqueryObj, index) {
    if (!jqueryObj) return;
    const dom = jqueryObj;
    let enterX, enterY, leaveX, leaveY;
    jqueryObj.on('touchstart', function (e) {
        enterX = e.changedTouches[0].pageX;
        var crtX = vm.liOffsetX;
        jqueryObj.on('touchmove', function (e) {
            let X = e.changedTouches[0].pageX
            let changeX = X - enterX;
            let rate = $(window).width() / 48;
            if (changeX > 40) {
                index++
            }
            vm.liOffsetX = crtX + (changeX / rate);
        })
    })
    jqueryObj.on('touchend', function (e) {
        leaveX = e.changedTouches[0].pageX;
    })
}
//获取屏幕高度
utils.getWindowHeight = function () {
    return $(window).height();
}
utils.uploadFile = function (file, filename, token, putExtra, config, observer) {
    var file = file;
    var key = filename;
    var token = token;
    var putExtra = putExtra;
    var config = config;
    var observer = observer;
    var observable = qiniu.upload(file, key, token, putExtra, config);
    var subscription = observable.subscribe(observer);
}
module.exports = utils;