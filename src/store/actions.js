import * as types from "./mutation-types"
import {asyncRoutes} from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {...route}
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// -------------- user --------------
const generateRoutes = ({commit}, roles) => {
  return new Promise(resolve => {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes || []
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    commit(types.SET_ROUTES, accessedRoutes)
    resolve(accessedRoutes)
  })
}

// -------------- side bar --------------
const toggleSideBar = ({commit}) => {
  commit(types.TOGGLE_SIDEBAR)
}
const closeSideBar = ({commit}, withoutAnimation) => {
  commit(types.CLOSE_SIDEBAR, withoutAnimation)
}
const toggleDevice = ({commit}, device) => {
  commit(types.TOGGLE_DEVICE, device)
}
const setSize = ({commit}, size) => {
  commit(types.SET_SIZE, size)
}

// -------------- tags view --------------
const addView = ({dispatch}, view) => {
  dispatch('addVisitedView', view)
  dispatch('addCachedView', view)
}
const addVisitedView = ({commit}, view) => {
  commit(types.ADD_VISITED_VIEW, view)
}
const addCachedView = ({commit}, view) => {
  commit(types.ADD_CACHED_VIEW, view)
}
const delView = ({dispatch, state}, view) => {
  return new Promise(resolve => {
    dispatch('delVisitedView', view)
    dispatch('delCachedView', view)
    resolve({
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    })
  })
}
const delVisitedView = ({commit, state}, view) => {
  return new Promise(resolve => {
    commit(types.DEL_VISITED_VIEW, view)
    resolve([...state.visitedViews])
  })
}
const delCachedView = ({commit, state}, view) => {
  return new Promise(resolve => {
    commit(types.DEL_CACHED_VIEW, view)
    resolve([...state.cachedViews])
  })
}
const delOthersViews = ({dispatch, state}, view) => {
  return new Promise(resolve => {
    dispatch('delOthersVisitedViews', view)
    dispatch('delOthersCachedViews', view)
    resolve({
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    })
  })
}
const delOthersVisitedViews = ({commit, state}, view) => {
  return new Promise(resolve => {
    commit(types.DEL_OTHERS_VISITED_VIEWS, view)
    resolve([...state.visitedViews])
  })
}
const delOthersCachedViews = ({commit, state}, view) => {
  return new Promise(resolve => {
    commit(types.DEL_OTHERS_CACHED_VIEWS, view)
    resolve([...state.cachedViews])
  })
}
const delAllViews = ({dispatch, state}, view) => {
  return new Promise(resolve => {
    dispatch('delAllVisitedViews', view)
    dispatch('delAllCachedViews', view)
    resolve({
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    })
  })
}
const delAllVisitedViews = ({commit, state}) => {
  return new Promise(resolve => {
    commit(types.DEL_ALL_VISITED_VIEWS)
    resolve([...state.visitedViews])
  })
}
const delAllCachedViews = ({commit, state}) => {
  return new Promise(resolve => {
    commit(types.DEL_ALL_CACHED_VIEWS)
    resolve([...state.cachedViews])
  })
}
const updateVisitedView = ({commit},view) => {
  commit(types.UPDATE_VISITED_VIEW, view)
}

// -------------- tags view -------------
const changeSetting = ({commit}, data) => {
  commit(types.CHANGE_SETTING, data)
}

// -------------- error log -------------
const addErrorLog = ({commit}, log) => {
  commit(types.ADD_ERROR_LOG, log)
}
const clearErrorLog = ({commit}) => {
  commit(types.CLEAR_ERROR_LOG)
}

export {
  generateRoutes,
  toggleSideBar,
  closeSideBar,
  toggleDevice,
  setSize,
  addView,
  addVisitedView,
  addCachedView,
  delView,
  delVisitedView,
  delCachedView,
  delOthersViews,
  delOthersVisitedViews,
  delOthersCachedViews,
  delAllViews,
  delAllVisitedViews,
  delAllCachedViews,
  updateVisitedView,
  changeSetting,
  addErrorLog,
  clearErrorLog
}
