/*Created By Jsir on 2018/7/13*/
'use strict'
import API from '../api/api'
import store from '../store/index'

const SNIPPET = {
    //login
    SNIPPET_LOGIN: function (params) {
        API.loginByPhone(params).then(res => {
            if (res.status == 200) {
                if (res.data.status_code == 1) {
                    sessionStorage.setItem('X-Auth-Token', res.data.data.token.access_token)
                    API.getUserInfo().then(res => {
                        if (res.status == 200) {
                            if (res.data.status_code == 1) {
                                let str = JSON.stringify(res.data.data)
                                sessionStorage.setItem('userInfo', str)
                            } else {
                                return
                            }
                        } else {
                            return
                        }
                    }).catch(err => {
                        throw err
                    })
                } else {
                    return
                }
            } else {
                return
            }
        }).catch(err => {
            throw err
        })
    }
}
module.exports = SNIPPET
