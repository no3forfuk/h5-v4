/*Created By Jsir on 2018/6/13*/
'use strict'

function _path(component) {
    return resolve => require(['../components/' + component + '/index'], resolve)
}

function subPath(component) {
    return resolve => require(['../components/' + component], resolve)
}

module.exports = [
    {
        path: '*', redirect: '/index'
    },
    {
        path: '/', redirect: '/index'
    },
    {
        path: '/addPost',
        name: 'addPost',
        component: resolve => require(['../components/Post/publicPost'], resolve)
    },
    {
        path: '/index',
        name: 'home',
        component: _path('Home')
    },
    {
        path: '/login',
        name: 'login',
        component: _path('Login')
    },
    {
        path: '/register',
        name: 'register',
        component: _path('Register')
    },
    {
        path: '/resetPassword',
        name: 'resetPassword',
        component: _path('ResetPassword')
    },
    {
        path: '/editUserInfo',
        name: 'editUserInfo',
        component: _path('EditUserInfo')
    },
    {
        path: '/userCenter',
        name: 'userCenter',
        component: _path('UserCenter')
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        component: _path('UserInfo')
    },
    {
        path: '/secondRank',
        name: 'secondRank',
        component: _path('SecondRank'),
        children: [
            {
                path: '/secondRank/list',
                name: 'secondRankList',
                component: subPath('SecondRank/list')
            },
            {
                path: '/secondRank/discuss',
                name: 'secondRankDiscuss',
                component: subPath('SecondRank/discuss')
            },
            {
                path: '/secondRank/activity',
                name: 'secondRankActivity',
                component: subPath('SecondRank/activity')
            },
        ]
    },
    {
        path: '/element',
        name: 'element',
        component: _path('Element'),
    },
    {
        path: '/myself',
        name: 'myself',
        component: _path('MySelf'),
        children: [
            {
                path: '/myself/all',
                name: 'myselfAll',
                component: subPath('MySelf/myselfAll')
            },
            {
                path: '/myself/BuildRank',
                name: 'myselfBuildRank',
                component: subPath('MySelf/myselfBuildRank')
            },
            {
                path: '/myself/Comment',
                name: 'myselfComment',
                component: subPath('MySelf/myselfComment')
            },
            {
                path: '/myself/Examine',
                name: 'myselfExamine',
                component: subPath('MySelf/myselfExamine')
            },
            {
                path: '/myself/fPost',
                name: 'myselfPost',
                component: subPath('MySelf/myselfPost')
            }
        ]
    },
]