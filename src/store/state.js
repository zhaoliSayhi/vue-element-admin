import {
  getBankName,
  getCurrentBankInfo,
  loadGarbDur,
  loadUser,
  loadSettings,
  loadLocalNotice
} from "common/js/cache";
const state = {
  allBankNames: getBankName() || [], // 所有银行卡
  currentBank: getCurrentBankInfo() || {},  // 当前所选银行卡信息
  user: loadUser() || {}, // 用户信息
  grabDuration: loadGarbDur() || '', // 抢单时长
  patchOrder: [], // 补单订单
  version : '',
  config: {},
  settings: loadSettings() || {},
  localNotice: loadLocalNotice() || {
    voice: false
  },
  hasNewOrder: false
};

export default state
