<template>
  <header class="py-3 border-bottom">
    <div class="container d-flex flex-wrap justify-content-between align-items-center">
      <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
        <svg class="me-2" width="1.5rem" height="1.5rem" fill="blue">
          <use xlink:href="./static/ico/bootstrap-icons.svg#r-square"/>
        </svg>
        <span class="fs-4">{{ title }}</span>
      </a>
      <div class="text-end">
        <a  href="./profile.html" class="btn btn-outline-secondary btn-sm me-md-4">Profile</a>
        <button type="button" class="btn btn-outline-secondary btn-sm me-md-4" data-bs-toggle="modal" data-bs-target="#OrderModal">Order</button>
        <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
                    <span class="d-inline d-md-none">
                         <svg class="me-1" width="1.3rem" height="1.3rem">
                             <use xlink:href="./static/ico/bootstrap-icons.svg#box-arrow-in-right"/>
                         </svg>
                    </span>
          <span class="d-none d-md-inline">Войти</span>

        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "my-header",
  props: ['title'],
}
</script>

<style scoped>

</style>
