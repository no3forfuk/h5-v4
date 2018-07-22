/*Created By Jsir on 2018/6/13*/
'use strict'

import Vue from 'vue'
import Icon from './common/Icon/index'
import UserCard from './common/UserCard/index'
import RankCard from './common/RankCard/index'
import RcmPopup from './common/RCM-popup/popup'
import RcmPageHeader from './common/PageHeader/pageheader'
//公共头部
import RcmHead from './common/Headers/head.vue'

Vue.component('rcm-head', RcmHead)

Vue.component('icon', Icon)
Vue.component('user-card', UserCard)
Vue.component('rank-card', RankCard)
Vue.component('rcm-popup', RcmPopup)
Vue.component('rcm-page-header', RcmPageHeader)

import LOGIN from '../modules/LOGIN/index'

Vue.component('rcm-login', LOGIN)