<template>
  <div class="cart offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
    <div class="cart-header offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasCartLabel">3 товара на 685 р.</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="cart-body offcanvas-body h-100 d-flex flex-column justify-content-between p-0">
      <div class="d-flex flex-column gap-3 cart-body__products">
        <div class="row g-0 p-3 bg-white cart-body__products-item">
          <div class="col-3">
            <img class="img-fluid" src="/static/img/placeholder.jpg" alt="Говяжая страсть">
          </div>
          <div class="col-8 px-2">
            <p class="mb-0">Говяжая страсть</p>
            <span class="small">400г. картошка в комплекте</span>
          </div>
          <div class="col-1">
            <svg class="bi fs-4 me-2" width="1.5rem" height="1.5rem" fill="success">
              <use xlink:href="/static/ico/bootstrap-icons.svg#x"/>
            </svg>
          </div>
          <hr class="my-2">
          <div class="col-12 mt-0 d-flex justify-content-between align-items-center">
            <div>390 р.</div>
            <div class="input-group">
              <button class="btn btn-sm btn-outline-secondary">-</button>
              <input type="number" value="1" class="form-control form-control-sm text-center">
              <button class="btn btn-sm btn-outline-secondary">+</button>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-3 p-3 bg-white cart-body__checkout">
        <div class="d-flex justify-content-between">
          <div>
            <p>Сумма заказа</p>
          </div>
          <div>
            685 р.
          </div>
        </div>
        <hr class="mb-3">
        <button type="button"
                class="btn btn-primary btn-lg"
                data-bs-dismiss="offcanvas"
                onclick="startOrder()">
          Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart-modal"
}

</script>

<style scoped>

</style>
