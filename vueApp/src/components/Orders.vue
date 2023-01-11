<template>
  <div>
    <my-header></my-header>
    <nav class="navbar navbar-expand-md py-2 bg-light border-bottom mb-4 sticky-top">
      <div class="container d-flex flex-wrap align-items-start">
        <div>
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link link-dark">
                  <span class="d-inline">
                         <svg class="me-2 mb-1" width="1.5rem" height="1.5rem" fill="success">
                             <use xlink:href="./static/ico/bootstrap-icons.svg#arrow-left-short"/>
                         </svg>
                    </span>
                  Назад
                </router-link>
              </li>
            </ul>
        </div>
      </div>
    </nav>
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
            <tr v-for="value in this.userOrders">
              <th scope="row">{{ value.id }}</th>
              <td>{{ value.date_created }}</td>
              <td>{{ value.amount }} р.</td>
              <td class="text-warning" v-text="endOrderStatus(value.id)"></td>
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
import {mapGetters} from 'vuex'
import axios from "axios";
import Vue from "vue";
export default {
  name: "Orders",
  components: { MyHeader },
  data() {
    return {
      userOrders: {}
    }
  },
  computed: {
    ...mapGetters([
      'ORDERS'
    ]),


  },
  methods: {
    endOrderStatus(id) {
      let order = this.userOrders[id].history
      return order[order.length - 1]
    },
    getOrders(id) {
      return axios(`http://127.0.0.1:8000/orders/id/unauthorized/3a1e6dc1-465f-4c8e-b9a5-a94de93a60c9/${id}`, {
        method: 'GET',
      })
        .then((response) => {
          Vue.set(this.userOrders, id, response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  mounted() {
    if (this.ORDERS.length > 0) {
      for(let key in this.ORDERS) {
        this.getOrders(this.ORDERS[key]);
      }
    }
  },
}
</script>

<style scoped>

</style>
