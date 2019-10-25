const permission_routes = state => state.permission_routes
const token = state => state.user.token
const roles = state => state.user.roles
const routes = state => state.user.routes
const addRoutes = addRoutes => state.user.addRoutes

const sidebar = state => state.app.sidebar
const size = state => state.app.size
const device = state => state.app.device

const visitedViews = state => deepClone(state.tagsView.visitedViews)
const cachedViews = state => deepClone(state.tagsView.cachedViews)

const showSettings = state => state.settings.showSettings
const needTagsView = state => state.settings.tagsView
const fixedHeader = state => state.settings.fixedHeader
const sidebarLogo = state => state.settings.sidebarLogo

const errorLogs = state => state.errorLog.logs

export {
  permission_routes,
  token,
  roles,
  sidebar,
  size,
  device,
  visitedViews,
  cachedViews,
  showSettings,
  needTagsView,
  fixedHeader,
  sidebarLogo,
  errorLogs,
  routes,
  addRoutes
}

// TODO 待抽取
function deepClone (sourceObj, targetObj) {
  let cloneObj = targetObj || {}
  if(!sourceObj || typeof sourceObj !== "object" || sourceObj.length === undefined){
    return sourceObj
  }
  if(sourceObj instanceof Array){
    cloneObj = sourceObj.concat()
  } else {
    for(let i in sourceObj){
      if (typeof sourceObj[i] === 'object') {
        cloneObj[i] = deepClone(sourceObj[i], {})
      } else {
        cloneObj[i] = sourceObj[i]
      }
    }
  }
  return cloneObj
}
