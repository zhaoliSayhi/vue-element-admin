import Vue from 'vue'

import Cookies from 'js-cookie'

// a modern alternative to CSS resets
import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.less'

// global css
import '@/styles/index.less'

import './icons'

import App from './App.vue'
import router from './router'
import store from './store'

// permission control
import './permission'

Vue.config.productionTip = false;

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
