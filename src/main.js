/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Home from './pages/index/index.vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI, { size: 'small', zIndex: 3000 }) // 全局配置

new Vue({
  el: '#app',
  router,
  components: { Home }, // 修改自定义的首页
  template: '<Home/>'
})
