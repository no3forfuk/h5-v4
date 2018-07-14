/*Created By Jsir on 2018/6/13*/
'use strict'

import Vue from 'vue'
import Headers from './common/Headers/index'
import Header from './common/Headers/header'
import Icon from './common/Icon/index'
import UserCard from './common/UserCard/index'
import RankCard from './common/RankCard/index'


Vue.component('rcm-header', Headers)
Vue.component('rcm-headers', Header)
Vue.component('icon', Icon)
Vue.component('user-card', UserCard)
Vue.component('rank-card', RankCard)

import LOGIN from '../modules/LOGIN/index'

Vue.component('rcm-login', LOGIN)