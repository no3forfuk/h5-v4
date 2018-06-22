/*Created By JSIR on 2018/6/17 0017*/
'use strict'

const state = {
    routerFrom: '',
    routerTo: '',
    routerForword: true
}
const mutations = {
    SETROUTERFROM(state, direction) {
        state.routerFrom = direction
    },
    SETROUTERTO(state, direction) {
        state.routerTo = direction
    },
    SETROUTERFORWORD(state, direction) {
        state.routerForword = direction
    }
};
module.exports = {
    state,
    mutations
}