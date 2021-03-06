/*Created By Jsir on 2018/4/25*/
'use strict'
import axios from 'axios'
import store from '../store/index'

const service = axios.create({
    baseURL: '/api/home'
})

service.interceptors.request.use(config => {
    if (sessionStorage.getItem('X-Auth-Token')) {
        config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('X-Auth-Token')
    }

    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})

service.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    })
export default service;