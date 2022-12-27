<template>
  <div>
    <my-header v-bind:title="title"></my-header>
<!--    <my-nav></my-nav>-->
    <section class="container">
      <div class="col-12 col-md-6 pt-5">
        <h3 class="mb-3">История заказов</h3>
        <div class="table-responsive-md">
          <table class="table">
            <thead class="table-light">
            <tr>
              <th scope="col">№</th>
              <th scope="col">Время заказа</th>
              <th scope="col">Сумма</th>
              <th scope="col">Статус</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">131</th>
              <td>18 июля 2022 г., 21:47</td>
              <td>809 р.</td>
              <td class="text-warning">Готовится</td>
            </tr>
            <tr>
              <th scope="row">119</th>
              <td>3 июня 2022 г., 22:22</td>
              <td>1702 р.</td>
              <td class="text-success">Завершен</td>
            </tr>
            <tr>
              <th scope="row">103</th>
              <td>3 марта 2022 г., 19:12</td>
              <td>1932 р.</td>
              <td class="text-success">Завершен</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MyHeader from './Header'
import MyNav from './Nav'
export default {
  name: "Orders",
  props: ['title'],
  components: { MyHeader, MyNav }
}
</script>

<style scoped>

</style>
