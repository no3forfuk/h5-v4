/*Created By Jsir on 2018/6/13*/
'use strict'

import Vue from 'vue'
import Headers from './common/Headers/index'
import Header from './common/Headers/header'
import Icon from './common/Icon/index'
import UserCard from './common/UserCard/index'
import RankCard from './common/RankCard/index'
import RcmPopup from './common/RCM-popup/popup'
import RcmHeaderPlacehloder from './common/Headers/headerPlaceholder'
import RcmPageHeader from './common/PageHeader/pageheader'

Vue.component('rcm-header', Headers)
Vue.component('rcm-headers', Header)
Vue.component('icon', Icon)
Vue.component('user-card', UserCard)
Vue.component('rank-card', RankCard)
Vue.component('rcm-popup', RcmPopup)
Vue.component('rcm-header-placehloder', RcmHeaderPlacehloder)
Vue.component('rcm-page-header', RcmPageHeader)

import LOGIN from '../modules/LOGIN/index'

Vue.component('rcm-login', LOGIN)