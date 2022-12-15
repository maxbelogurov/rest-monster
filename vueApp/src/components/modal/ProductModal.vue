<template>
  <div class="modal fade" id="ProductModal" tabindex="-1" aria-labelledby="ProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header p-3 border-bottom-0">
          <h4 class="fw-bold mb-0 fs-2">{{ product.title }}</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3 pt-0 d-flex flex-lg-row flex-column gap-4">
          <div class="col-6">
            <img src="/static/img/placeholder.jpg" class="card-img-top" alt="Бургер">
          </div>
          <div class="col-6">
            <p class="text">{{ product.description }}</p>
            <p class="small text-secondary">{{ product.weight }}</p>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                <label class="form-check-label" for="inlineRadio1">Большой</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" checked>
                <label class="form-check-label" for="inlineRadio2">Малый</label>
              </div>
            </div>
            <p class="fs-3 mt-4">{{ product.price }}</p>
            <button
              v-on:click="addProductInCart(product.id)"
              class="btn btn-primary mb-4 mx-auto">
              <svg class="me-2" width="1.3rem" height="1.3rem" fill="white">
                <use xlink:href="./static/ico/bootstrap-icons.svg#cart"/>
              </svg>
              Добавить в корзину</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-modal",
  props: ["product", "cart", "cartItemsCount"],
  prodId: '',
  methods: {
    addProductInCart(prod) {
      this.prodId = prod
      this.$emit('test-method', this.prodId)
    }
  }
}

</script>

<style scoped>

</style>
