<template>
  <div class="cart offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
    <div class="cart-header offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasCartLabel">
        <span v-if="this.CART_ITEM_COUNT === 0">Корзина пуста</span>
        <span v-else>Товаров:
          {{ this.CART_ITEM_COUNT }}
        </span>
      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="cart-body offcanvas-body h-100 d-flex flex-column justify-content-between p-0">
      <div v-show="this.CART_ITEM_COUNT === 0"
      class="cart-body__products h-100 text-center">
        <img src="/static/img/hommer_cart-bg.png" alt="Empty Cart" width="50%">
      </div>
      <transition-group name="product" tag="div" class="d-flex flex-column gap-3 cart-body__products">
          <div v-for="product in this.CART" :key="product.id"
            class="row g-0 p-3 bg-white cart-body__products-item">
            <div class="col-3">
              <img class="img-fluid" src="/static/img/placeholder.jpg" alt="Говяжая страсть">
            </div>
            <div class="col-8 px-2">
              <p class="mb-0">{{ product.title }}</p>
              <span v-show="product.weight" class="small">{{ product.weight }} г.<br></span>
            </div>
            <div class="col-1">
              <svg v-on:click="removeProductInCart(product.id)"
              class="bi fs-4 me-2 delete-product-ico" width="1.5rem" height="1.5rem" fill="#333333">
                <use xlink:href="/static/ico/bootstrap-icons.svg#trash"/>
              </svg>
<!--              <button v-on:click="removeProductInCart(product.id)" class="btn-close"></button>-->
            </div>
            <hr class="my-2">
            <div class="col-12 mt-0 d-flex justify-content-between align-items-center">
              <div>{{ product.price }} р.</div>
              <div class="input-group w-auto">
                <button
                  v-on:click="changeProductInCart(product, -1)"
                  class="btn btn-sm btn-outline-secondary">-</button>
<!--                <span class="input-group-text" v-text="actualItemInCart(product.id)"></span>-->
                <span class="input-group-text py-0"> {{ product.qty }}</span>
<!--                <input type="number" class="form-control form-control-sm text-center">-->
                <button
                  v-on:click="changeProductInCart(product, +1)"
                  class="btn btn-sm btn-outline-secondary">+</button>
              </div>
            </div>
          </div>
        </transition-group>
      <div class="text-center mt-3 p-3 bg-white cart-body__checkout">
        <div class="d-flex justify-content-between">
          <div>
            <p>Сумма заказа</p>
          </div>
          <div>
            {{ this.CART_SUM_TOTAL }}
          </div>
        </div>
        <hr class="mb-3">
        <button v-if="this.CART_ITEM_COUNT === 0" class="btn btn-primary btn-lg" disabled>Оформить заказ</button>
        <button v-else type="button"
                class="btn btn-primary btn-lg"
                data-bs-dismiss="offcanvas"
                v-on:click="startOrder">
          Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: "cart-modal",
  computed: {
    ...mapGetters([
      'CART_ITEM_COUNT',
      'CART',
      'PRODUCTS',
      'CART_SUM_TOTAL',
    ]),
  },
  methods: {
    ...mapActions([
      'ADD_TO_CART',
    ]),
    ...mapMutations([
      'DEL_PRODUCT_FROM_CART',
      'COUNT_ITEM_TO_CART'
    ]),
    changeProductInCart(product, count) {
      this.ADD_TO_CART({product, count});
    },
    removeProductInCart(id) {
      this.DEL_PRODUCT_FROM_CART(id);
      this.COUNT_ITEM_TO_CART();
    },
    startOrder() {
      const bsCartModal = new bootstrap.Offcanvas(document.querySelector('#offcanvasCart'))
      const bsOrderModal = new bootstrap.Modal(document.querySelector('#OrderModal'))
      bsCartModal.hide();
      bsOrderModal.show();
    }
  }
}

</script>

<style scoped>
  .product-enter-active, .product-leave-active {
    transition: all .3s ease-in-out;
    transform: scaleY(1);
    opacity: 1;
  }
  .product-leave-to {
    transform:scaleY(0);
    opacity: 0;
  }
</style>
