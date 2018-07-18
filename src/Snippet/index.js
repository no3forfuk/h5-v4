/*Created By Jsir on 2018/7/13*/
'use strict'

import store from '../store/index'
import {SVS_userInfo, SVS_loginByTel} from '../Servers/API'
import Storage from '../Servers/Storage'

const SNIPPET = {}
SNIPPET.SNI_userInfo = () => {
    SVS_userInfo(res => {
        Storage.SET_session('userInfo', res.data)
    }, err => {
        return
    })
}
SNIPPET.SNI_login = (val) => {
    if (!val) return
    SVS_loginByTel(res => {
        Storage.SET_session('X-Auth-Token', res.data.token.access_token)
        SNIPPET.SNI_userInfo()
    }, err => {
        return
    }, val)
}
module.exports = SNIPPET
