import * as types from "./mutation-types"
import { _login, _logout, _getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter,asyncRoutes } from '@/router'

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

    // TODO fix
    console.log(accessedRoutes, '---TODO fix')

    // commit(types.SET_ROUTES, accessedRoutes)
    resolve(accessedRoutes)
  })
}
const login = ({ commit }, userInfo) => {
  const { username, password } = userInfo
  return new Promise((resolve, reject) => {
    _login({ username: username.trim(), password: password }).then(response => {
        console.log(response, 'res')
      const { data } = response
      commit(types.SET_TOKEN, data.token)
      setToken(data.token)
      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}
const getInfo = ({commit, state}) => {
  return new Promise((resolve, reject) => {
    _getInfo(state.user.token).then(response => {
      const { data } = response

      if (!data) {
        reject('Verification failed, please Login again.')
      }

      // const { roles, name, avatar, introduction } = data
      const { roles } = data

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }

      commit(types.SET_ROLES, roles)
      // commit('SET_NAME', name)
      // commit('SET_AVATAR', avatar)
      // commit('SET_INTRODUCTION', introduction)
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}
const logout = ({commit,state,dispatch}) => {
  return new Promise((resolve, reject) => {
    _logout(state.token).then(() => {
      commit(types.SET_TOKEN, '')
      commit(types.SET_ROLES, [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('delAllViews', null, { root: true })

      resolve()
    }).catch(error => {
      reject(error)
    })
  })
}
const resetToken = ({commit}) => {
  return new Promise(resolve => {
    commit(types.SET_TOKEN, '')
    commit(types.SET_ROLES, [])
    removeToken()
    resolve()
  })
}
const changeRoles = ({commit, dispatch}, role) => {
  return new Promise(async resolve => {
    const token = role + '-token'

    commit(types.SET_TOKEN, token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('generateRoutes', roles, { root: true })

    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('delAllViews', null, { root: true })

    resolve()
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
  login,
  getInfo,
  logout,
  resetToken,
  changeRoles,
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
  clearErrorLog,
}
