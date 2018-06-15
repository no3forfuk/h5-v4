/*Created By Jsir on 2018/6/13*/
'use strict'

function _path(component) {
    return resolve => require(['../components/' + component + '/index'], resolve)
}

function subPath(component) {
    return resolve => require(['../components/' + component], resolve)
}

module.exports = [
    {path: '*', redirect: '/index'},
    {path: '/', redirect: '/index'},
    {path: '/index', name: 'home', component: _path('Home')},
    {path: '/userCenter', name: 'userCenter', component: _path('UserCenter')},
    {
        path: '/myself', name: 'myself', component: _path('MySelf'), children: [
            {path: '/myself/all', name: 'myselfAll', component: subPath('MySelf/myselfAll')},
            {path: '/myself/BuildRank', name: 'myselfBuildRank', component: subPath('MySelf/myselfBuildRank')},
            {path: '/myself/Comment', name: 'myselfComment', component: subPath('MySelf/myselfComment')},
            {path: '/myself/Examine', name: 'myselfExamine', component: subPath('MySelf/myselfExamine')},
            {path: '/myself/fPost', name: 'myselfPost', component: subPath('MySelf/myselfPost')}
        ]
    },
]