import Cookies from 'js-cookie'

import * as types from './mutation-types'
import {constantRoutes} from '@/router'

// TODO 待抽取
function deepClone (orig) {
  return Object.create(
      Object.getPrototypeOf(orig),
      Object.getOwnPropertyDescriptors(orig)
  );
}

const mutations = {
  // -------------- user --------------
  [types.SET_ROUTES](state, routes) {
    state.user.addRoutes = routes
    state.user.routes = constantRoutes.concat(routes)
  },

  // -------------- side bar --------------
  [types.TOGGLE_SIDEBAR](state) {
    state.app.sidebar.opened = !state.app.sidebar.opened
    state.app.sidebar.withoutAnimation = false
    if (state.app.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  [types.CLOSE_SIDEBAR](state, withoutAnimation) {
    Cookies.set('sidebarStatus', 0)
    state.app.sidebar.opened = false
    state.app.sidebar.withoutAnimation = withoutAnimation
  },
  [types.TOGGLE_DEVICE](state, device) {
    state.app.device = device
  },
  [types.SET_SIZE](state, size) {
    state.app.size = size
    Cookies.set('size', size)
  },

  // -------------- tags view --------------
  [types.ADD_VISITED_VIEW](state, view) {
    if (state.tagsView.visitedViews.some(v => v.path === view.path)) return
    const a = deepClone(view, {title: view.meta.title || 'no-name'})
    const b = Object.assign({}, view, {
      title: view.meta.title || 'no-name'
    })

    // state.tagsView.visitedViews.push(
    //     Object.assign({}, view, {
    //       title: view.meta.title || 'no-name'
    //     })
    // )

    console.log(a, 'aaaaaa')
    state.tagsView.visitedViews.push(a)
  },
  [types.ADD_CACHED_VIEW](state, view) {
    if (state.tagsView.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.tagsView.cachedViews.push(view.name)
    }
  },
  [types.DEL_VISITED_VIEW](state, view) {
    for (const [i, v] of state.tagsView.visitedViews.entries()) {
      if (v.path === view.path) {
        state.tagsView.visitedViews.splice(i, 1)
        break
      }
    }
  },
  [types.DEL_CACHED_VIEW](state, view) {
    const index = state.tagsView.cachedViews.indexOf(view.name)
    index > -1 && state.tagsView.cachedViews.splice(index, 1)
  },
  [types.DEL_OTHERS_VISITED_VIEWS](state, view) {
    state.tagsView.visitedViews = state.tagsView.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  [types.DEL_OTHERS_CACHED_VIEWS](state, view) {
    const index = state.tagsView.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.tagsView.cachedViews = state.tagsView.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.tagsView.cachedViews = []
    }
  },
  [types.DEL_ALL_VISITED_VIEWS](state) {
    // keep affix tags
    const affixTags = state.tagsView.visitedViews.filter(tag => tag.meta.affix)
    state.tagsView.visitedViews = affixTags
  },
  [types.DEL_ALL_CACHED_VIEWS](state) {
    // keep affix tags
    state.tagsView.cachedViews = []
  },
  [types.UPDATE_VISITED_VIEW](state, view) {
    for (let v of state.tagsView.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },

  // -------------- settings --------------
  [types.CHANGE_SETTING](state, { key, value }) {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },

  // -------------- error log --------------
  [types.ADD_ERROR_LOG](state, log) {
    state.logs.push(log)
  },
  [types.CLEAR_ERROR_LOG](state) {
    state.logs.splice(0)
  },
};

export default mutations;
