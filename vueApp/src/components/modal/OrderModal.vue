<template>
  <div class="modal fade order-modal" id="OrderModal" tabindex="-1" aria-labelledby="OrderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
<!--      TODO: local pre order-->
      <div v-if="orderStatus === 'local'" class="modal-content rounded-4 shadow">
        <div class="modal-header p-3 border-bottom-0">
          <h4 class="fw-bold mb-0 fs-4">Оформить заказ</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3 pt-0 d-flex flex-column gap-3">
            <div class="row pb-3">
              <div class="col-4">
                <label for="firstName" class="form-label">Имя</label>
                <input v-model.lazy.trim="order.user_name"
                       :class="{'border-danger': checkEmptyInputs(this.order.user_name) }"
                       type="text" class="form-control" id="firstName" placeholder="" value="" required="">
              </div>
              <div class="col-4">
                <label for="tel" class="form-label">Телефон</label>
                <input v-model.lazy.trim="order.user_phone_number"
                       :class="{'border-danger': checkEmptyInputs(this.order.user_phone_number) }"
                       type="tel" class="form-control" id="tel" placeholder="7(000)000-00-00" value="" required="">
              </div>
              <div class="col-4">
                <label for="email" class="form-label">Эл. почта</label>
                <input v-model.lazy.trim="order.user_email"
                       :class="{'border-danger': checkEmptyInputs(this.order.user_email) }"
                       type="email" class="form-control" id="email" placeholder="name@site.ru" value="" required="">
              </div>
            </div>
            <div class="type-delivery">
              <div class="list-group list-group-horizontal mx-0 w-auto">
                <label class="list-group-item w-50 d-flex gap-2">
                  <input class="form-check-input flex-shrink-0" type="radio" name="deliveryMethod"
                         v-model="order.delivery_method"
                         id="deliveryMethodDelivery"
                         value="delivery">
                  <span>Доставка</span>
                </label>
                <label class="list-group-item w-50 d-flex gap-2">
                  <input class="form-check-input flex-shrink-0" type="radio" name="deliveryMethod"
                         v-model="order.delivery_method"
                         id="paymentMethodPickup"
                         value="pickup">
                  <span>Самовывоз</span>
                </label>
              </div>
              <div class="tab-content border rounded p-3 mt-2 bg-light">
                <div v-if="order.delivery_method === 'delivery'" class="tab-pane fade show active">
                  <div>
                    <label for="street" class="form-label">Адрес доставки</label>
                    <input v-model.trim="address.street"
                           :class="{'border-danger': checkEmptyInputs(this.address.street) && this.order.delivery_method === 'delivery' }"
                           type="text" class="form-control" id="street" placeholder="Улица, дом, квартира" value="" required="">
                    <div class="invalid-feedback">Укажите номер мобильного телефона</div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-4">
                      <input v-model.trim="address.floor" type="text" class="form-control" id="floor" placeholder="Подъезд" value="" required="">
                    </div>
                    <div class="col-4">
                      <input v-model.trim="address.section" type="text" class="form-control" id="buildingSection" placeholder="Этаж" value="" required="">
                    </div>
                    <div class="col-4">
                      <input v-model.trim="address.intercom" type="text" class="form-control" id="intercom" placeholder="Код домофона" value="" required="">
                    </div>
                  </div>
                </div>
                <div v-else class="tab-pane fade show active">
                  <p>Адрес ресторана: <b>Толбухина, д.2</b></p>
                  <p>Режим работы: Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-23:00</p>
                  <p class="mb-0">Забрать заказ можно только после подверждения администратом.<br>
                    К вам поступит звонок, а после статус заказа сменится на "Приготовление"</p>
                </div>
              </div>
            </div>
            <div class="type-pay">
              <h4>Оплата</h4>
              <div class="list-group list-group-horizontal mx-0 w-auto">
                <label class="list-group-item w-50 d-flex gap-2">
                  <input class="form-check-input flex-shrink-0" type="radio" name="paymentMethod"
                         v-model="order.payment_method"
                         id="paymentMethodCard" value="card">
                  <span>Картой курьеру
                    <small class="d-block text-muted">Оплата через терминал при получении заказа</small>
                  </span>
                </label>
                <label class="list-group-item w-50 d-flex gap-2">
                  <input class="form-check-input flex-shrink-0" type="radio" name="paymentMethod"
                         v-model="order.payment_method"
                         id="paymentMethodCash" value="cash">
                  <span>Наличными курьеру
                    <small class="d-block text-muted">Оплата наличными, при получении заказа</small>
                  </span>
                </label>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center bg-primary bg-gradient text-white p-3 mt-4 rounded">
              <div>
                <p>Товаров: {{ this.CART_ITEM_COUNT }}<br>
                  Сумма заказа: {{ this.CART_SUM_TOTAL }}</p>
                <p class="mb-0">Доствка 0 р.</p>
              </div>
              <div>
                <button class="btn btn-light"
                v-on:click="sendPreOrder"
                v-bind:disabled="!this.disableBtnSend">
                  Разместить заказ
                </button>
              </div>
            </div>
        </div>
      </div>
<!--      TODO: pre order send-->
      <div v-else-if="orderStatus === 'preOrder'" class="modal-content rounded-4 shadow">
        <div class="modal-header p-3 border-bottom-0">
          <h4 class="fw-bold mb-0 fs-4">Подтвердить заказ</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3 pt-0 d-flex flex-column gap-2">
          <table class="table table-sm table-borderless">
            <tbody>
            <tr>
              <td>Имя</td>
              <td>Test</td>
            </tr>
            <tr>
              <td>Телефон</td>
              <td>{{ preOrder.user_phone_number }}</td>
            </tr>
            <tr>
              <td>E-mail</td>
              <td>{{ preOrder.user_email }}</td>
            </tr>
            <tr v-if="preOrder.delivery_method === 'delivery'">
              <td>Адрес доставки</td>
              <td>{{ preOrder.delivery_address }}</td>
            </tr>
            <tr v-else>
              <td>Самовынос</td>
              <td>Адрес ресторана</td>
            </tr>
            <tr>
              <td>Оплата</td>
              <td v-if="preOrder.payment_method === 'card'">Оплата по карте</td>
              <td v-else>Оплата наличными</td>
            </tr>
            </tbody>
          </table>
          <div class="row border-bottom pb-2" v-for="item in preOrder.menu_items">
            <div class="col-1">
              <img src="/static/img/placeholder.jpg" class="img-fluid" :alt="item.details.title">
            </div>
            <div class="col-6">
              {{ item.details.title }}
            </div>
            <div class="col-1">
              {{ item.qty }} шт.
            </div>
            <div class="col-2">
              {{ item.price }}
            </div>
            <div class="col-2">
              {{ item.price * item.qty }}
            </div>
          </div>
          <div class="row justify-content-end pb-2">
            <div class="col-2">
              <b>{{ preOrder.amount}} р.</b>
            </div>
          </div>
          <div class="my-4 d-flex justify-content-between align-items-center">
            <div>
              <button class="btn btn-outline-secondary btn-sm" @click="editPreOrder">Редактировать</button>
            </div>
            <div>
              <button class="btn btn-primary btn-lg" v-on:click="sendOrder">Подтвердить</button>
            </div>
          </div>
        </div>
      </div>
<!--      TODO: order send-->
      <div v-else-if="orderStatus === 'orderSent'" class="modal-content rounded-4 shadow">
        <div class="modal-header p-3 border-bottom-0">
          <h4 class="fw-bold mb-0 fs-4">Заказ отправлен</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3 pt-0 d-flex flex-column">
          <h3 class="text-bg-success">Ваш заказ успешно отправлен на кухню</h3>
          <p class="mt-3">Дождитесь звонка операта для подтверждения заказа.<br>
            Тепермь можно отследить статус заказа
            <a class="btn btn-sm btn-primary" @click="jumpToOrderPage">Отследить</a>
          </p>
        </div>
      </div>
<!--      TODO: order error-->
      <div v-else-if="orderStatus === 'error'" class="modal-content rounded-4 shadow">
        <div class="modal-header p-3 border-bottom-0">
          <h4 class="fw-bold mb-0 fs-4">Ошибка заказа</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3 pt-0 d-flex flex-column">
          <h3 class="text-bg-danger p-3"><b>{{ this.orderErrorMsg }}</b></h3>
          <p class="mt-3">Попробуйте повторить заказ еще раз.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: "order-modal",
  data() {
    return {
      order: {
        restaurant_id: '',
        user_name: null,
        user_phone_number: null,
        user_email: null,
        delivery_method: 'delivery',
        delivery_address: null,
        payment_method: 'card',
        menu_items: {},
        comment: 'test local order'
      },
      address: {
        street: null  ,
        floor: null,
        section: null,
        intercom: null
      },
      orderStatus: 'local',
      preOrder: null,
      orderErrorMsg: '',
    }
  },
  computed: {
    ...mapGetters([
      'RESTAURANT',
      'CART',
      'CART_ITEM_COUNT',
      'CART_SUM_TOTAL',
    ]),
    addCartToOrder() {
      this.order.menu_items = this.CART;
    },
    addRestIdToOrder() {
      this.order.restaurant_id = this.RESTAURANT.id;
    },
    disableBtnSend() {
      function addressEmpty(method, street) {
        if(method === 'delivery' && street) {
          return true;
        } else if (method === 'pickup') {
          return true;
        } else {
          return false;
        }
      }
      if (
        this.order.user_name &&
        this.order.user_email &&
        this.order.user_phone_number &&
        addressEmpty(this.order.delivery_method, this.address.street)
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    ...mapMutations([
      'CLEAR_CART',
      'UPLOAD_ORDERS_FROM_LS'
    ]),
    addDeliveryAddress() {
      this.order.delivery_address = this.address.street
      if(this.address.floor !== null) {
        this.order.delivery_address += ', Подъезд: ' + this.address.floor
      }
      if(this.address.section !== null) {
        this.order.delivery_address += ', Этаж: ' + this.address.section
      }
      if(this.address.intercom !== null) {
        this.order.delivery_address += ', Домофон: ' + this.address.intercom
      }
    },
    clearOrderError() {
      this.orderStatus = 'local';
      this.orderErrorMsg = '';
    },
    orderError(error) {
      this.orderErrorMsg = error.message;
      this.orderStatus = 'error';
      console.log(error)
      setTimeout(this.clearOrderError, 3000)
    },
    checkEmptyInputs(input) {
        if (!input) {
          return true
        }
    },
    sendPreOrder() {
      this.order.menu_items = this.CART;
      let axiosHeader = { headers: {"Content-Type": "application/json"} }
      let data = JSON.stringify(this.order);
      axios.post('http://127.0.0.1:8000/orders/pre-order/3a1e6dc1-465f-4c8e-b9a5-a94de93a60c9/unauthorized', data, axiosHeader)
        .then(response => {
          this.preOrder = response.data;
          this.orderStatus = 'preOrder';
          localStorage.preOrder = JSON.stringify(response.data);
        })
        .catch(error => {
          console.log(this.order);
          this.orderError(error);
        })
    },
    sendOrder() {
      const axiosHeader = { headers: {"Content-Type": 'application/json'} }
      const data = JSON.stringify({pre_order_id: this.preOrder.id})
      axios.post('http://127.0.0.1:8000/orders/unauthorized', data, axiosHeader)
        .then(response => {
          this.orderStatus = 'orderSent';
          localStorage.removeItem('preOrder');
          this.addOrdersToLocalStorage(response.data.id);
          this.CLEAR_CART();
          this.UPLOAD_ORDERS_FROM_LS();
          setTimeout(this.jumpToOrderPage, 2000)
        })
        .catch(error => {
          this.orderError(error);
          console.log(data);
        })
    },
    jumpToOrderPage() {
      let orderModal = document.getElementById('OrderModal');
      let modal = bootstrap.Modal.getOrCreateInstance(orderModal);
      modal.hide();
      this.orderStatus = 'local';
      this.$router.push('/orders');
    },
    addOrdersToLocalStorage(id) {
      if (localStorage.orders) {
        let orders = JSON.parse(localStorage.orders);
        orders.push(id)
        localStorage.orders = JSON.stringify(orders);
      } else {
        let newId = [];
        newId.push(id);
        localStorage.orders = JSON.stringify(newId);
      }
    },
    editPreOrder() {
      localStorage.removeItem('preOrder');
      this.orderStatus = 'local';
    }
  },
  mounted() {
    if (localStorage.preOrder) {
      this.orderStatus = 'preOrder'
      this.preOrder = JSON.parse(localStorage.preOrder);
    }
  },
  watch: {
    address: {
      handler() {
        this.addDeliveryAddress();
      },
      deep: true
    },
    'order.delivery_method'(newVal) {
      if (newVal === 'pickup') {
        this.order.delivery_address = '-'
      }
      if (newVal === 'delivery') {
        this.addDeliveryAddress();
      }
    }
  }
}
</script>

<style scoped>

</style>
