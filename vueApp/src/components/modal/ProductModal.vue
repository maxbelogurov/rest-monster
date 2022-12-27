<template>
  <div class="modal fade" id="ProductModal" tabindex="-1" aria-labelledby="ProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header p-3 border-bottom-0">
          <h4 class="fw-bold mb-0 fs-2">{{ product.title }}</h4>
          <button
            v-on:click="closeProductModal"
            type="button" data-bs-dismiss="modal" class="btn-close"></button>
        </div>
        <div class="modal-body p-3 pt-0 row">
          <div class="col-12 col-md-6">
            <img src="/static/img/placeholder.jpg" class="card-img-top" :alt="product.title">
          </div>
          <div class="col-12 col-md-6 mt-3 mt-md-0">

            <p class="small text-secondary">{{ product.weight }}</p>
<!--            <div>-->
<!--              <div class="form-check form-check-inline">-->
<!--                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">-->
<!--                <label class="form-check-label" for="inlineRadio1">Большой</label>-->
<!--              </div>-->
<!--              <div class="form-check form-check-inline">-->
<!--                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" checked>-->
<!--                <label class="form-check-label" for="inlineRadio2">Малый</label>-->
<!--              </div>-->
<!--            </div>-->
            <p class="fs-3 mt-4">{{ product.price }} р.</p>
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="input-group product_count">
                <button @click="count--" class="btn btn-sm btn-outline-secondary">-</button>
                <input v-model="count" type="number" value="1" class="form-control form-control-sm text-center p-1">
                <button @click="count++" class="btn btn-sm btn-outline-secondary">+</button>
              </div>
              <button
                v-on:click="addProductInCart(product.id, product.price)"
                class="btn btn-primary">
                <svg class="me-2" width="1.3rem" height="1.3rem" fill="white">
                  <use xlink:href="./static/ico/bootstrap-icons.svg#cart"/>
                </svg>
                Добавить в корзину</button>
            </div>
          </div>
          <div class="col-12 mt-3">
            <p class="text">{{ product.description }}</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-modal",
  props: ["product", "cart"],
  data() {
    return {
      prodId: '',
      count: 1,
    }
  },
  methods: {
    addProductInCart(prod, price) {
      this.prodId = prod
      this.$emit('add-prod-in-cart', prod, price, this.count);
      this.count = 1;
      this.closeProductModal();
    },
    closeProductModal() {
      let productModal = document.getElementById('ProductModal');
      let modal = bootstrap.Modal.getOrCreateInstance(productModal);
      modal.hide();
      this.count = 1;
    }
  },
  watch: {
    count: function (n) {
      if( this.count <= 0 ) {
        this.count = 1
      }
    }
  }
}

</script>

<style scoped>

</style>
