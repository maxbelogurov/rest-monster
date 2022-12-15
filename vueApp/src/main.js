// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
require('./assets/style/main.css')
require('./assets/bootstrap/css/bootstrap.min.css')
require('./assets/js/jquery.min')
require('./assets/bootstrap/js/bootstrap.bundle')
require('./assets/js/main')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


