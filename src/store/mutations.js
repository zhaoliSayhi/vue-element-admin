import * as types from './mutation-types'

const mutations = {
  [types.SET_ALL_BANK](state, list) {
    state.allBankNames = list
  },
  [types.SET_CURRENT_BANK](state, obj) {
    state.currentBank = obj
  },
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_GRAB_DURATION](state, str) {
    state.grabDuration = str
  },
  [types.SET_PATCH_ORDER](state, list) {
    state.patchOrder = list
  },
  [types.SET_PATCH_ORDER](state, list) {
    state.patchOrder = list
  },
  [types.SET_VERSION](state, str) {
    state.version = str
  },
  [types.SET_CONFIG](state, obj) {
    state.config = obj
  },
  [types.SET_SETTINGS](state, obj) {
    state.settings = obj
  },
  [types.SET_LOCAL_NOTICE](state, obj) {
    state.localNotice = obj
  },
  [types.SET_HAS_NEW_ORDER](state, val) {
    state.hasNewOrder = val
  },
};

export default mutations;
