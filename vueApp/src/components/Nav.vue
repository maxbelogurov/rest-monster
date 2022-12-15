<template>
  <nav class="navbar navbar-expand-md py-2 bg-light border-bottom mb-4 sticky-top">
    <div class="container d-flex flex-wrap align-items-start">
      <div>
        <button class="navbar-toggler btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbarProductCategory" aria-controls="navbarProductCategory" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarProductCategory">
          <ul class="navbar-nav me-auto">
            <li v-for="value in category"
                :key="value.id"
                class="nav-item">
              <a v-bind:href="'#' + value"
                 class="nav-link link-dark px-2"> {{ value }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="text-end">
        <button type="button"
                class="btn btn-outline-secondary"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
                aria-controls="offcanvasCart">
                    <span class="d-inline d-md-none">
                         <svg class="me-2" width="1.5rem" height="1.5rem" fill="success">
                             <use xlink:href="./static/ico/bootstrap-icons.svg#cart"/>
                         </svg>
                    </span>
          <span class="d-none d-md-inline">Корзина</span>
          <span class="badge text-bg-danger">{{ cartCount }}</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'my-nav',
  props: ['category', 'cartCount'],
  methods: {

  }
}
</script>

<style scoped>

</style>
