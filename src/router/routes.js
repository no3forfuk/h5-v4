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
        path: '*', redirect: '/hot'
    },
    {
        path: '/', redirect: '/hot'
    },
    {
        path: '/hot',
        name: 'hot',
        component: subPath('HotRank/index'),
        meta: {
            index: true,
            nav: true,
            leftText: '',
            rightText: ''
        },
    },
    {
        path: '/firstRank',
        name: 'firstRank',
        query: {firstId: 'id'},
        component: subPath('FirstRank/index'),
        meta: {
            index: true,
            nav: true,
            leftText: '',
            rightText: ''
        },
    },
    {
        path: '/addPost',
        name: 'addPost',
        component: resolve => require(['../components/Post/publicPost'], resolve),
        meta: {
            index: false,
            nav: false,
            leftText: '榜单',
            rightText: '完成'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: _path('Login'),
        meta: {
            index: false,
            nav: false,
            leftText: '',
            rightText: ''
        }
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
        component: _path('UserCenter'),
        meta: {
            index: false,
            nav: false,
            leftText: '首页',
            rightText: '',
            backTarget: 'hot'
        }
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        component: _path('UserInfo'),
        meta: {
            index: false,
            nav: false,
            leftText: '我的',
            rightText: ''
        }
    },
    {
        path: '/addRank',
        name: 'addRank',
        component: _path('PublicRank'),
        meta: {
            index: false,
            nav: false,
            leftText: '',
            rightText: '下一步'
        }
    },
    {
        path: '/secondRank',
        name: 'secondRank',
        component: _path('SecondRank'),
        children: [
            {
                path: '/secondRank/list',
                name: 'secondRankList',
                query: {secondId: 'id'},
                component: subPath('SecondRank/list'),
                meta: {
                    index: false,
                    nav: true,
                    leftText: '首页',
                    rightText: '',
                    backTarget: 'firstRank'
                },
            },
            {
                path: '/secondRank/discuss',
                name: 'secondRankDiscuss',
                component: subPath('SecondRank/discuss'),
                meta: {
                    index: false,
                    nav: true,
                    leftText: '首页',
                    rightText: '',
                    backTarget: 'firstRank'
                },
            },
            {
                path: '/secondRank/activity',
                name: 'secondRankActivity',
                component: subPath('SecondRank/activity'),
                meta: {
                    index: false,
                    nav: true,
                    leftText: '首页',
                    rightText: '',
                    backTarget: 'firstRank'
                },
            },
        ]
    },
    {
        path: '/element',
        name: 'element',
        component: _path('Element'),
        params: {elementDetails: 'elementDetails'},
        meta: {
            index: false,
            nav: true,
            leftText: '榜单',
            rightText: '',
            backTarget: 'secondRankList'
        },
        children: []
    },
    {
        path: '/addElement',
        name: 'addElement',
        component: subPath('SecondRank/addElement'),
        meta: {
            index: false,
            nav: false,
            leftText: '榜单',
            rightText: '下一步',
            backTarget: 'secondRankList'
        }
    },
    {
        path: '/post',
        name: 'post',
        component: _path('Post'),
        meta: {
            index: false,
            nav: false,
            leftText: '榜单',
            rightText: '',
            backTarget: 'element'
        },
    },
    {
        path: '/myself',
        name: 'myself',
        component: _path('MySelf'),
        children: [
            {
                path: '/myself/all',
                name: 'myselfAll',
                component: subPath('MySelf/myselfAll'),
                meta: {
                    index: false,
                    nav: false,
                    leftText: '我的',
                    rightText: '',
                    backTarget: 'userCenter'
                },
            },
            {
                path: '/myself/BuildRank',
                name: 'myselfBuildRank',
                component: subPath('MySelf/myselfBuildRank'),
                meta: {
                    index: false,
                    nav: false,
                    leftText: '我的',
                    rightText: '',
                    backTarget: 'userCenter'
                },
            },
            {
                path: '/myself/Comment',
                name: 'myselfComment',
                component: subPath('MySelf/myselfComment'),
                meta: {
                    index: false,
                    nav: false,
                    leftText: '我的',
                    rightText: '',
                    backTarget: 'userCenter'
                },
            },
            {
                path: '/myself/Examine',
                name: 'myselfExamine',
                component: subPath('MySelf/myselfExamine'),
                meta: {
                    index: false,
                    nav: false,
                    leftText: '我的',
                    rightText: '',
                    backTarget: 'userCenter'
                },
            },
            {
                path: '/myself/Post',
                name: 'myselfPost',
                component: subPath('MySelf/myselfPost'),
                meta: {
                    index: false,
                    nav: false,
                    leftText: '我的',
                    rightText: '',
                    backTarget: 'userCenter'
                },
            }
        ]
    },
]