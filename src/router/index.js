import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '../pages/index/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history', // 去掉路由中的“#”号
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
