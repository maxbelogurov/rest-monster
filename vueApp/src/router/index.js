import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/components/Products'
import Orders from '@/components/Orders'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Products',
      component: Products,
      props: true
    },{
      path: '/orders',
      name: 'Orders',
      component: Orders,
      props: true
    }
  ]
})
