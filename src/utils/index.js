/*Created By Jsir on 2018/6/15*/
'use strict'
const utils = {};
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
module.exports = utils;