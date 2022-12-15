<template>
  <div>
    <my-header v-bind:title="restTitle"></my-header>
    <my-nav v-bind:category="categorySequence"
            v-bind:cartCount="cartItemsCount"></my-nav>
    <section v-for="value in categorySequence"
             :key="value.name"
             v-bind:id="value"
             class="container pt-2">
        <h3 v-text="value" class="pt-5 mb-4"></h3>
        <div class="row products-section">
          <div v-for="product in productsInCategory(value)"
               :key="product.id"
            class="col-6 col-md-4 col-lg-3 products-section__item">
            <div class="card mb-4">
<!--              <a href="#" data-bs-toggle="modal" data-bs-target="#ProductModal">-->
                <img v-on:click="openProductModal(product.id)" src="/static/img/placeholder.jpg" class="card-img-top" v-bind:alt="product.title">
<!--              </a>-->
              <div class="card-body rounded-bottom">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-6 text-primary text-primary">{{ product.price }}</span>
                  <button v-on:click="addProductInCart(product.id)"
                     class="btn btn-primary">Выбрать</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    <my-product-modal
      v-on:test-method="testMethod"
      v-bind:product="productModal"
      v-bind:cart="cart"
      v-bind:cartItemsCount="cartItemsCount"></my-product-modal>
    <my-cart-modal></my-cart-modal>
  </div>
</template>

<script>
import MyHeader from './Header'
import MyNav from './Nav'
import MyProductModal from './modal/ProductModal'
import MyCartModal from './modal/CartModal'
const servUrl = 'http://127.0.0.1:8000'
var userToken = '13303309-d941-486f-b600-3e90929ac50f'
var restId = '3a1e6dc1-465f-4c8e-b9a5-a94de93a60c9';
export default {
  name: "Products",
  data() {
    return {
      restTitle: 'test',
      categorySequence: {},
      products: [],
      productModal: {},
      cart: [],
      cartItemsCount: 0,
    }
  },
  components: { MyHeader, MyNav, MyProductModal, MyCartModal },
  created() {
    //:TODO get restaurant and menu data
    Promise.all([
      axios.get(servUrl + '/restaurants/' + restId),
      axios.get(servUrl + '/menu-items/' + restId)
    ]).then(([
      restaurant,
      menu
    ]) => {
      this.restTitle = restaurant.data.title;
      this.categorySequence = restaurant.data.settings.category_sequence;
      this.products = menu.data;
    })
    //:TODO loading cart from Local Storage
    if (localStorage.userCart) {
      this.cart = JSON.parse(localStorage.userCart)
    }
  },
  methods: {
    //TODO: display products in their categories
    productsInCategory(category) {
      return this.products.filter(function (prod) {
        return prod.category === category && !prod.archived
      })
    },

    //TODO: open product in modal window
    openProductModal(id) {
      let prodModalNow;
      this.products.forEach(function (item) {
        if (item.id === id) { prodModalNow = item }
      })
      this.productModal = prodModalNow;
      $('#ProductModal').modal('show');
    },

    //TODO: add product id and count in Cart
    addProductInCart(prod, count = 1) {
      let itemAdded = false;
      this.cart.forEach( function (item) {
        if (item.id === prod) {
          item.count += count;
          itemAdded = true;
        }
      })
      if (!itemAdded) {
        this.cart.push({id: prod, count: count})
      }
      localStorage.userCart = JSON.stringify(this.cart);
    },
    //TODO: test method
    testMethod(id) {
      console.log(id)
    }
  },

  computed: {
    updateCart() {

    }
  },

  watch: {
    //TODO: count all items in cart
    cart: {
      handler() {
        let itemsFromlocalStorage = JSON.parse(localStorage.userCart)
        this.cartItemsCount = itemsFromlocalStorage.reduce( function (sum, current) {
          return sum + current.count
        }, 0)
      },
      deep: true
    }
  },

}
</script>

<style scoped>

</style>
