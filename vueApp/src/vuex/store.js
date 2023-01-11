import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
      restaurant: {},
      products: [],
      cart: {},
      cartItemCount: 0,
      orders: []
  },
  mutations: { //мутации синхронны
    SET_RESTAURANT_TO_STATE: (state, restaurant) => {
      state.restaurant = restaurant;
    },
    SET_PRODUCTS_TO_STATE: (state, products) => {
      state.products = products
    },
    SET_PRODUCT_TO_CART: (state, prod) => {
      let itemAdded = false;
      let item = prod.product;
      let elem;
      for (let key in state.cart) {
        if(key === item.id) {
          if(state.cart[key].qty === 1 && prod.count === -1) {
            state.cart[key].qty = 1;
          } else {
            elem = state.cart[key].qty;
            elem += prod.count;
            Vue.delete(state.cart[key], 'qty');
            Vue.set(state.cart[key], 'qty', elem);
          }
          itemAdded = true;
        }
      }
      if (!itemAdded) {
        item.qty = prod.count;
        Vue.set(state.cart, item.id, item);
      }
      localStorage.userCart = JSON.stringify(state.cart);
    },
    DEL_PRODUCT_FROM_CART: (state, id) => { // TO change FROM
      Vue.delete(state.cart, id)
      localStorage.userCart = JSON.stringify(state.cart);
    },
    COUNT_ITEM_TO_CART: (state) => { //COUNT_CART_ITEMS
      let count = 0
      for(let key in state.cart) {
        count += state.cart[key].qty
      }
      state.cartItemCount = count;
    },
    UPLOAD_CART_FROM_LS: (state) => {
     state.cart = JSON.parse(localStorage.userCart);
    },
    UPLOAD_ORDERS_FROM_LS: (state) => {
      let ordersArr = JSON.parse(localStorage.orders)
      state.orders = ordersArr;
    },
    CLEAR_CART: (state) => {
      state.cart = {};
      state.cartItemCount = 0;
      localStorage.removeItem('userCart');
    },
  },
  actions: { //асинхронный метод
    GET_RESTAURANT_FROM_API({commit}) {
      return axios('http://127.0.0.1:8000/restaurants/3a1e6dc1-465f-4c8e-b9a5-a94de93a60c9', {
        method: 'GET',
      })
        .then((response) => {
          commit('SET_RESTAURANT_TO_STATE', response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        })
    },
    GET_PRODUCTS_FROM_API({commit}) {
      return axios('http://127.0.0.1:8000/menu-items/3a1e6dc1-465f-4c8e-b9a5-a94de93a60c9', {
        method: 'GET',
      })
        .then((response) => {
          commit('SET_PRODUCTS_TO_STATE', response.data);
          return response;
        })
        .catch((error) => {
          console.log(error);
          return error;
        })
    },
    ADD_TO_CART({commit}, prod, count) {
      commit('SET_PRODUCT_TO_CART', prod, count);
      commit('COUNT_ITEM_TO_CART');
    },
    ADD_CART_FROM_LS({commit}) {
      commit('UPLOAD_CART_FROM_LS');
      commit('COUNT_ITEM_TO_CART');
    },
    ADD_ORDERS_FROM_LS({commit}) {
      commit('UPLOAD_ORDERS_FROM_LS');
    }
  },
  getters: {
    RESTAURANT(state) {
      return state.restaurant;
    },
    PRODUCTS(state) {
      return state.products;
    },
    CART(state) {
      return state.cart;
    },
    ORDERS(state) {
      return state.orders;
    },
    CART_ITEM_COUNT(state) {
      return state.cartItemCount;
    },
    CART_SUM_TOTAL(state) {
      if (state.cart.length === 0) {
        return 0 + ' р.'
      }
      let sum = 0;
      for(let key in state.cart) {
        sum += ( state.cart[key].qty * state.cart[key].price)
      }
      return +sum.toFixed(2) + ' р.'
    },
    ACTUAL_CATEGORIES(state) {
      let set = new Set();
      for (let prop in state.products) {
        set.add(state.products[prop].category)
      }
      return Array.from(set);
    },
  },
});
store.dispatch('GET_RESTAURANT_FROM_API');
store.dispatch('GET_PRODUCTS_FROM_API');
if (localStorage.orders) {
  store.dispatch('ADD_ORDERS_FROM_LS');
}
export default store;
