/*Created By Jsir on 2018/6/15*/
'use strict'
const utils = {};
import {getWXConfig, getQiniuToken} from '../api/api'

utils.inheritObject = function (obj, def) {
    let result = {}
    if (!obj) return def
    for (let k in obj) {
        if (obj[k]) {
            result[k] = obj[k]
        } else {
            result[k] = def[k]
        }
    }
    return result
}
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
//微信分享
utils.sharePage = function (vm, url, title, desc, type, img, cb) {
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
                    imgUrl: img ? img : 'http://p8rk87lub.bkt.clouddn.com/logo.png',
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
                    imgUrl: img ? img : 'http://p8rk87lub.bkt.clouddn.com/logo.png',
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
//七牛文件上传
utils.uploadFile = function (vm, file, cb) {
    getQiniuToken().then(res => {
        if (res.status == 200) {
            if (res.data.status_code == 1) {
                let token = res.data.data.qiniu_token;
                let strFileName = 'user/' + file.name
                let putExtra = {
                    fname: "",
                    params: {},
                    mimeType: null
                };
                let config = {
                    useCdnDomain: true,
                    region: vm.qiniu.region.z2
                };
                let observer = {
                    next(res) {

                    },
                    error(err) {
                        throw err;
                    },
                    complete(res) {
                        cb(res, strFileName)
                    }
                }
                let observable = vm.qiniu.upload(file, strFileName, token, putExtra, config);
                let subscription = observable.subscribe(observer);
            }
        }
    }).catch(err => {
        throw err
    })
}
//图片预览
utils.UTS_viewPicture = function (box, file, cb) {
    const flies = new FileReader();
    flies.onload = data => {
        box.src = data.target.result
        cb()
    }
    if (file.files[0]) {
        flies.readAsDataURL(file.files[0])
    }
}
module.exports = utils;