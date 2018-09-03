// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Mint from 'mint-ui';
import VueRouter from 'vue-router'
import routes from './router/routes'
import 'mint-ui/lib/style.css'
import store from './vuex/store'
import filter from './util/filter'
Vue.config.productionTip = false;

Vue.use(VueRouter);
// Vue.use(axios);
Vue.prototype.$http = axios;
Vue.use(Mint);
const router = new VueRouter({
//   mode: 'history',
//   base : '/credit_h5',
  routes
});
//为每个路由配置不同title
router.afterEach(function (transition) {
  if (transition.name) {
    document.title = transition.name;
  }
});

new Vue({
  router,
  axios,
  Mint,
  store,
  VueRouter,
  filter,
  render: h => h(App)
}).$mount('#app');
