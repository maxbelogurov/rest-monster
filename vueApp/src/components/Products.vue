<template>
  <div>
    <my-header></my-header>
    <my-nav></my-nav>
    <my-notifications ref="notification"></my-notifications>
    <section v-for="value in this.ACTUAL_CATEGORIES"
             :key="value.name"
             v-bind:id="value"
             class="container pt-2">
        <h3 v-text="value" class="pt-5 mb-4"></h3>
        <div class="row products-section">
          <div v-for="product in productsInCategory(value)"
               :key="product.id"
            class="col-6 col-md-4 col-lg-3 products-section__item">
            <div class="card mb-4">
                <img v-on:click="openProductModal(product.id)" src="/static/img/placeholder.jpg" class="card-img-top" v-bind:alt="product.title">
              <div class="card-body rounded-bottom">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text description">{{ product.description | shortProductDescription }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-6 text-primary text-primary">{{ product.price }} р.</span>
                  <button v-on:click="addProdToCart(product, 1)"
                     class="btn btn-primary">Добавить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    <my-product-modal
      v-bind:product="productModal"></my-product-modal>
    <my-cart-modal></my-cart-modal>
    <my-order-modal
      v-bind:cart="cart"
      v-bind:cartItemsCount="cartItemsCount"></my-order-modal>
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions, mapGetters} from 'vuex'
import MyHeader from './Header'
import MyNav from './Nav'
import MyProductModal from './modal/ProductModal'
import MyCartModal from './modal/CartModal'
import MyOrderModal from './modal/OrderModal'
import MyNotifications from './addons/Notifications'


import * as serv from '../assets/js/main'
let servUrl = serv.settings.servUrl
let userToken = serv.settings.userToken;
let restId = serv.settings.restId;

export default {
  name: "Products",
  data() {
    return {
      categorySequence: {},
      categoryActual: {},
      products: [],
      productModal: {},
      cart: {},
      cartItemsCount: 0,
      restaurant: {},
      serverSetting: {
        url: serv.settings.servUrl,
        userId: serv.settings.userToken,
        restId: serv.settings.restId
      }
    }
  },
  components: { MyHeader, MyNav, MyProductModal, MyCartModal, MyOrderModal, MyNotifications },
  created() {
    // //TODO: get restaurant and menu data
    // Promise.all([
    //   axios.get(servUrl + '/restaurants/' + restId),
    //   axios.get(servUrl + '/menu-items/' + restId)
    // ]).then(([
    //   restaurant,
    //   menu
    // ]) => {
    //   this.restTitle = restaurant.data.title;
    //   this.restaurant = restaurant.data;
    //   this.categorySequence = restaurant.data.settings.category_sequence;
    //   this.products = menu.data;
    // })
    //TODO: loading cart from Local Storage
    // if (localStorage.userCart) {
    //   this.cart = JSON.parse(localStorage.userCart)
    // }
  },
  computed: {
    ...mapGetters([
      'RESTAURANT',
      'PRODUCTS',
      'ACTUAL_CATEGORIES',
    ]),
  },
  methods: {
    ...mapActions([
      'GET_RESTAURANT_FROM_API',
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART',
      'ADD_CART_FROM_LS'
    ]),
    //TODO: display products in their categories
    productsInCategory(category) {
      return this.PRODUCTS.filter(function (prod) {
        return prod.category === category && prod.is_available
      })
    },

    //TODO: open product in modal window
    openProductModal(id) {
      let prodModalNow;
      let bsProductModal = new bootstrap.Modal(document.querySelector('#ProductModal'))
      this.PRODUCTS.forEach(function (item) {
        if (item.id === id) { prodModalNow = item }
      })
      this.productModal = prodModalNow;
      bsProductModal.show();
    },

    //TODO: add product id and count in Cart
    addProdToCart(product, count) {
      this.ADD_TO_CART({product, count});

      //TODO: notification this product
      this.$refs.notification.sendNotification(product.title);
    },
    addProductInCart(prod, price, count = 1) {
      // let itemAdded = false;
      // for (let key in this.cart) {
      //   if(key === prod) {
      //     this.cart[key].qty += count
      //     itemAdded = true;
      //   }
      // }
      // if (!itemAdded) {
      //   let newObj = {id: prod, qty: count, price: price};
      //   this.$set(this.cart, prod, newObj)
      // }
      // localStorage.userCart = JSON.stringify(this.cart);

    },
  },
  mounted() {
    if (localStorage.userCart) {
      this.ADD_CART_FROM_LS();
    }
  },
  filters: {
    shortProductDescription(elem) {
      let str = elem
      if (str.length > 100) {
        str = elem.slice(0, 100) + '...';
      }
      return str;
    }
  },
  watch: {
    cart: {
      //TODO: count all items in cart
      // handler() {
      //   let items = JSON.parse(localStorage.userCart)
      //   let countCart = 0
      //   for(let key in items) {
      //     countCart += items[key].qty
      //   }
      //   this.cartItemsCount = countCart
      // },
      // deep: true
    },
    // //TODO: disable empty categories
    // categorySequence: function () {
    //   let set = new Set();
    //   for (let prop in this.products) {
    //     set.add(this.products[prop].category)
    //   }
    //   this.categoryActual = Array.from(set)
    // },
  },

}
</script>

<style scoped>

</style>
