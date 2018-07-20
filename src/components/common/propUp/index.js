/*Created By Jsir on 2018/7/20*/
'use strict'
import Vue from 'vue'
import propvue from './propUp'

const PropConstructor = Vue.extend(propvue)

let temp = new PropConstructor({
    el: document.createElement('div')
})

let PropUp = () => {
    document.body.appendChild(temp.$el)
    return temp
}
// PropUp.$mount('.app')
export default PropUp