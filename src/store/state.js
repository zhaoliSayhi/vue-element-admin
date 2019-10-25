import Cookies from 'js-cookie'
import variables from '@/styles/element-variables.less'
import defaultSettings from '@/settings'
import { getToken, setToken, removeToken } from '@/utils/auth'

const { showSettings, tagsViews, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  permission_routes: [],
  avatar: '',
  user: {
    routes: [],
    addRoutes: [],
    roles: [],
    token: getToken(),
  },
  app: {
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop',
    size: Cookies.get('size') || 'medium'
  },
  tagsView: {
    visitedViews: [],
    cachedViews: []
  },
  settings: {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsViews,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  },
  errorLog: {
    logs: []
  }
};

export default state
