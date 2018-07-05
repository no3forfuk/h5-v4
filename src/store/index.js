/*Created By JSIR on 2018/6/17 0017*/
'use strict'

const state = {
    direction: 'forward',
    openUserCenter: false,
    routerFrom: '',
    routerTo: '',
    routerDirection: 'forward',
    rankIndex: 0
}
const mutations = {
    SETOPENUSERCENTER(state, val) {
        state.openUserCenter = val
    },
    SETDIRECTION(state, direction) {
        state.direction = direction
    },
    SETROUTERFROM(state, direction) {
        state.routerFrom = direction
    },
    SETROUTERTO(state, direction) {
        state.routerTo = direction
    },
    SETROUTERDIRECTION(state, direction) {
        state.routerDirection = direction
    },
    SETRANKINDEX(state, index) {
        state.rankIndex = index
    }
};
module.exports = {
    state,
    mutations
}