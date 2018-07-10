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
        path: '*', redirect: '/index/hot'
    },
    {
        path: '/', redirect: '/index/hot'
    },
    {
        path: '/addPost',
        name: 'addPost',
        component: resolve => require(['../components/Post/publicPost'], resolve),
        meta: {
            index: false,
            nav: false,
            left: {
                text: '榜单'
            },
            right: {
                text: '完成',
                color: {
                    color: '#FF2C09'
                }
            }
        }
    },
    {
        path: '/index',
        name: 'home',
        query: {firstId: 'id'},
        component: _path('Home'),
        children: [
            {
                path: '/index/hot',
                name: 'hot',
                component: subPath('HotRank/index'),
                meta: {
                    index: true,
                    nav: true,
                    left: {
                        text: ''
                    },
                    right: {
                        text: '',
                        color: {
                            color: '#FF2C09'
                        }
                    }
                },
            },
            {
                path: '/index/firstRank',
                name: 'firstRank',
                query: {firstId: 'id'},
                component: subPath('FirstRank/index'),
                meta: {
                    index: true,
                    nav: true,
                    left: {
                        text: ''
                    },
                    right: {
                        text: '',
                        color: {
                            color: '#FF2C09'
                        }
                    }
                },
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: _path('Login'),
        meta: {
            index: false,
            nav: false,
            left: {
                text: ''
            },
            right: {
                text: '',
                color: {
                    color: '#FF2C09'
                }
            }
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
            left: {
                text: '首页'
            },
            right: {
                text: '',
                color: {
                    color: '#FF2C09'
                }
            }
        }
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        component: _path('UserInfo'),
        meta: {
            index: false,
            nav: false,
            left: {
                text: '我的'
            },
            right: {
                text: '',
                color: {
                    color: '#FF2C09'
                }
            }
        }
    },
    {
        path: '/addRank',
        name: 'addRank',
        component: _path('PublicRank'),
        meta: {
            index: false,
            nav: false,
            left: {
                text: ''
            },
            right: {
                text: '下一步',
                color: {
                    color: '#FF2C09'
                }
            }
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
                    left: {
                        text: '首页'
                    },
                    right: {
                        text: '',
                        color: {
                            color: '#FF2C09'
                        }
                    }
                },
            },
            {
                path: '/secondRank/discuss',
                name: 'secondRankDiscuss',
                component: subPath('SecondRank/discuss'),
                meta: {
                    index: false,
                    nav: true,
                    left: {
                        text: '首页'
                    },
                    right: {
                        text: '',
                        color: {
                            color: '#FF2C09'
                        }
                    }
                },
            },
            {
                path: '/secondRank/activity',
                name: 'secondRankActivity',
                component: subPath('SecondRank/activity'),
                meta: {
                    index: false,
                    nav: true,
                    left: {
                        text: '首页'
                    },
                    right: {
                        text: '',
                        color: {
                            color: '#FF2C09'
                        }
                    }
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
            left: {
                text: '榜单'
            },
            right: {
                text: '',
                color: {
                    color: '#FF2C09'
                }
            }
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
            left: {
                text: '榜单'
            },
            right: {
                text: '下一步',
                color: {
                    color: '#FF2C09'
                }
            }
        }
    },
    {
        path: '/post',
        name: 'post',
        component: _path('Post'),
        meta: {
            index: false,
            nav: false,
            left: {
                text: '榜单'
            },
            right: {
                text: '',
                color: {
                    color: '#FF2C09'
                }
            }
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