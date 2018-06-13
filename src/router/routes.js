/*Created By Jsir on 2018/6/13*/
'use strict'

function _path(component) {
    return resolve => require(['../components/' + component + '/index'], resolve)
}

module.exports = [
    {path: '/', name: 'home', component: _path('Home')}
]