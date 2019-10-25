import * as types from './mutation-types'
import {
  setBankName,
  setCurrentBankInfo,
  saveUser,
  saveGarbDur,
  clearCurrentBankInfo,
  clearGrabDur,
  saveSettings,
  saveLocalNotice
} from 'common/js/cache'
// import API from "../api/api";
import Vue from 'vue'
import axios from 'common/js/http.js'
import {API} from "@/config";
import utils from "../common/js/common";

Vue.prototype.API = API;
Vue.prototype.axios = axios;
Vue.prototype.utils = utils;

export const setAllBank = function ({commit, state}, list) {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(API.bankApi);
    if (res === null) return;

    let bankNameList = [];
    for (let i in res.data) {
      bankNameList.push({
        key: i,
        value: res.data[i]
      })
    }

    commit(types.SET_ALL_BANK, setBankName(bankNameList));
    resolve(bankNameList);
  })
};
export const setCurrentBank = function ({commit, state}, obj) {
  commit(types.SET_CURRENT_BANK, setCurrentBankInfo(obj))
};

export const clearCurrentBank = function ({commit, state}) {
  commit(types.SET_CURRENT_BANK, clearCurrentBankInfo())
};

export const setUser = ({commit}) => {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(API.userInfo);
    if (res === null) return;
    commit(types.SET_USER, saveUser(res.data));
    resolve(res.data);
  })
};

export const patchOrder = ({commit}) => {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(API.patchOrder, {
      params: {
        type: 'additional',
        seller_role: 'runner'
      }
    });
    if (res === null) return;
    commit(types.SET_PATCH_ORDER, res.data.data);
    resolve(res.data);
  })
};

export const setGrabStatus = function ({commit, state}, dur) {
  commit(types.SET_GRAB_DURATION, saveGarbDur(dur))
};

export const clearGrabStatus = function ({commit, state}) {
  commit(types.SET_GRAB_DURATION, clearGrabDur())
};

export const updateConfig = ({commit}) => {
  return new Promise(async (resolve, reject) => {
    const currentVer = await utils.getAppVersion();
    const res = await axios.get(API.configApi);
    if (res === null) return;
    let { version_update, notice } = res.data;
    version_update.currentVer = currentVer;
    commit(types.SET_VERSION, {notice, version_update});
    resolve({notice, version_update});
  })
};

export const updateSettings = ({commit}) => {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(API.getSettings);
    if (res === null) return;
    commit(types.SET_SETTINGS, saveSettings(res.data));
    resolve(res.data);
  })
};

export const updateLocalNotice = function ({commit, state}, obj) {
  commit(types.SET_LOCAL_NOTICE, saveLocalNotice(obj))
};

export const updateHasNewOrder = function ({commit, state}, val) {
  commit(types.SET_HAS_NEW_ORDER, val)
};

export const getParentBeneficiary = function ({commit, state}) {
  return new Promise(async (resolve, reject) => {
    const res = await axios.get(API.parentBeneficiary);
    if (res === null) return;
    resolve(res.data);
  })
};

