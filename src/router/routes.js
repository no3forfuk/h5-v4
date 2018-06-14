/*Created By Jsir on 2018/6/13*/
'use strict'

function _path(component) {
    return resolve => require(['../components/' + component + '/index'], resolve)
}

module.exports = [
    {path: '*', redirect: '/index'},
    {path: '/', redirect: '/index'},
    {path: '/index', name: 'home', component: _path('Home')},
    {path: '/userCenter', name: 'userCenter', component: _path('UserCenter')},
    {
        path: '/myself', name: 'myself', component: _path('MySelf'), children: [
            {path: '/myself/all', name: 'myselfAll'}
        ]
    },
]