const merge = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');


//模拟数据后台服务器
const express = require('express');
const app = express();

const router = express.Router();

const apiRouter = express.Router();

app.use(router);
app.use('/api', apiRouter);
module.exports = merge(base, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({template: './index.html', filename: 'index.html'}),
    ],
    devServer: {
        host: '192.168.0.122',
        // host: '192.168.199.101',
        port: 3000,
        contentBase: './dist',
        before(app) {
            const bodyParser = require('body-parser');
            const rp = require('request-promise');
            app.use(bodyParser.urlencoded({extended: false}));
            app.use(bodyParser.json());
            var baseUrl = 'http://test.bantangtv.com';
            // var baseUrl = 'http://www.rcm.ink';
            const go = function (requset, response) {
                var method = requset.method;
                var options;
                if (method == 'GET') {
                    options = {
                        "method": method,
                        "qs": requset.query,
                        "json": true,
                        "uri": baseUrl + requset.url,
                        "headers": {
                            "authorization": requset.headers.authorization
                        }
                    }
                }
                if (method == 'POST') {
                    options = {
                        "method": method,
                        "body": requset.body,
                        "json": true,
                        "uri": baseUrl + requset.url,
                        "headers": {
                            "authorization": requset.headers.authorization
                        }
                    }
                }
                rp(options).then(data => {
                    response.json(data)
                }).catch(err => {
                    throw err;
                })
            }
            //获取首页推送
            app.post('/api/home/index', function (req, res) {
                go(req, res)
            });
            //获取一级榜单列表
            app.get('/api/home/index/firstList', function (req, res) {
                go(req, res)
            })
            //获取二级榜单详情
            app.get('/api/home/ranking/getRanking', function (req, res) {
                go(req, res)
            })
            //获取元素详情
            app.get('/api/home/element/getElementDetails', (req, res) => {
                go(req, res)
            })
            //获取评论
            app.get('/api/home/ranking/getComment', (req, res) => {
                go(req, res)
            })
            //添加评论
            app.post('/api/home/comment/visitorAdd', (req, res) => {
                go(req, res)
            })
            //获取POST详情
            app.get('/api/home/post/getPostDetails', (req, res) => {
                go(req, res)
            })
            //获取7牛token
            app.post('/api/home/qiniu/getUploadToken', (req, res) => {
                go(req, res)
            })
            //发布post
            app.post('/api/home/post/addPost', (req, res) => {
                go(req, res)
            })
            //手机登陆
            app.post('/api/home/login', (req, res) => {
                go(req, res)
            })
            //首次获取资料
            app.post('/api/home/user/firstUpdate', (req, res) => {
                go(req, res)
            })
            //获取评论
            app.get('/api/home/ranking/getComment', (req, res) => {
                go(req, res)
            })
            //第三方登陆
            app.post('/api/home/login/thirdLogin', (req, res) => {
                go(req, res)
            })
            //注册
            app.post('/api/home/login/reg', (req, res) => {
                go(req, res)
            })
            //发送验证码
            app.post('/api/home/login/sms', (req, res) => {
                go(req, res)
            })
            //添加元素
            app.post('/api/home/element/addElement', (req, res) => {
                go(req, res)
            })
            //添加榜单
            app.post('/api/home/ranking/addSecond', (req, res) => {
                go(req, res)
            })
            //查找元素
            app.post('/api/home/element/getElementName', (req, res) => {
                go(req, res)
            })
            //获取用户信息
            app.post('/api/home/user/userInfo', (req, res) => {
                go(req, res)
            })
            //修改用户资料
            app.post('/api/home/user/editUser', (req, res) => {
                go(req, res)
            })
            //获取微信签名
            app.post('/api/home/wx/signature', (req, res) => {
                go(req, res)
            })
            //点赞
            app.post('/api/home/praise/add', (req, res) => {
                go(req, res)
            })
            //--------------------------------------------
            //获取微信签名
            // app.post('/api/Wx/signature', (req, res) => {
            //     go(req, res)
            // })
            // //统计
            //
            // app.post('/api/Statistical/add', (req, res) => {
            //     go(req, res)
            // })
            // //注册
            // app.post('/api/Login/reg', (req, res) => {
            //     go(req, res)
            // })
            // //获取验证码
            // app.post('/api/Login/sms', (req, res) => {
            //     go(req, res)
            // })
            // //登陆
            // app.post('/api/Login/login', (req, res) => {
            //     go(req, res)
            // })
            // //添加用户信息
            // app.post('/api/User/firstUpdate', (req, res) => {
            //     go(req, res)
            // })
            // app.post('/api/Login/ThirdLogin', (req, resp) => {
            //     go(req, res)
            // })

        }

    }
})