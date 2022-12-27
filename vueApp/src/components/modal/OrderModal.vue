<template>
  <div class="modal fade order-modal" id="OrderModal" tabindex="-1" aria-labelledby="OrderModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
<!--      TODO: before pre order-->
      <div v-if="orderStatus === 'local'" class="modal-content rounded-4 shadow">
        <div class="modal-header p-3 border-bottom-0">
          <h4 class="fw-bold mb-0 fs-4">Оформить заказ</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3 pt-0 d-flex flex-column gap-3">
          <div class="row pb-3">
            <div class="col-4">
              <label for="firstName" class="form-label">Имя</label>
              <input v-model.lazy.trim="order.user_name" type="text" class="form-control" id="firstName" placeholder="" value="" required="">
              <div class="invalid-feedback">Введите Ваше Имя</div>
            </div>
            <div class="col-4">
              <label for="tel" class="form-label">Телефон</label>
              <input v-model.lazy.trim="order.user_phone_number" type="tel" class="form-control" id="tel" placeholder="7(000)000-00-00" value="" required="">
              <div class="invalid-feedback">Укажите номер мобильного телефона</div>
            </div>
            <div class="col-4">
              <label for="email" class="form-label">Эл. почта</label>
              <input v-model.lazy.trim="order.user_email" type="email" class="form-control" id="email" placeholder="name@site.ru" value="" required="">
              <div class="invalid-feedback">Укажите адрес эл. почты</div>
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
                  <input v-model.lazy.trim="address.street" type="text" class="form-control" id="street" placeholder="Улица, дом, квартира" value="" required="">
                  <div class="invalid-feedback">Укажите номер мобильного телефона</div>
                </div>
                <div class="row mt-3">
                  <div class="col-4">
                    <input v-model.lazy.trim="address.floor" type="text" class="form-control" id="floor" placeholder="Подъезд" value="" required="">
                  </div>
                  <div class="col-4">
                    <input v-model.lazy.trim="address.section" type="text" class="form-control" id="buildingSection" placeholder="Этаж" value="" required="">
                  </div>
                  <div class="col-4">
                    <input v-model.lazy.trim="address.intercom" type="text" class="form-control" id="intercom" placeholder="Код домофона" value="" required="">
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
              <p>Товаров: {{ this.cartItemsCount }}<br>
                Сумма заказа: {{sumProductsInOrder()}}</p>
              <p class="mb-0">Доствка 0 р.</p>
            </div>
            <div>
              <button class="btn btn-light"
              v-on:click="sendPreOrder">
                Разместить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
<!--      TODO: pre order-->
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
          <div class="my-4 text-center">
            <button class="btn btn-primary btn-lg" v-on:click="sendOrder">
              Подтвердить
            </button>
          </div>
        </div>
      </div>
<!--      TODO: order send-->
      <div v-else class="modal-content rounded-4 shadow">
        <div class="modal-header p-3 border-bottom-0">
          <h4 class="fw-bold mb-0 fs-4">Заказ отправлен</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-3 pt-0 d-flex flex-column">
          <h3 class="text-bg-success">Ваш заказ успешно отправлен на кухню</h3>
          <p>
            Номер вашего заказа: <b>{{ orderSend.id }}</b>
          </p>
          <p class="mt-3">Дождитесь звонка операта для подтверждения заказа.<br>
            Тепермь можно отследить стату заказа <a class="btn btn-sm btn-primary" href="#">Отследить</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-modal",
  props: ['cart', 'cartItemsCount', 'serverSetting'],
  data() {
    return {
      order: {
        restaurant_id: this.serverSetting.restId,
        user_name: 'Maks',
        user_phone_number: '+79097777307',
        user_email: 'maxbelogurov@gmail.com',
        delivery_method: 'delivery',
        delivery_address: '',
        payment_method: 'card',
        menu_items: this.cart,
        comment: 'test local order'
      },
      address: {
        street: '43-69',
        floor: '5',
        section: '3',
        intercom: '69'
      },
      orderStatus: 'local',
      preOrder: null,
      orderSend: null
    }
  },
  methods: {
    sendPreOrder() {
      const axiosHeader = {
        headers: {"Content-Type": 'application/json'}
      }
      axios.post(this.serverSetting.url + '/orders/pre-order/unauthorized', JSON.stringify(this.order), axiosHeader)
        .then(response => {
          this.preOrder = response.data
          this.orderStatus = 'preOrder'
        })
        .catch(error => {
          alert(error);
        })
    },
    sendOrder() {
      const axiosHeader = {
        headers: {"Content-Type": 'application/json'}
      }
      const data = {
        pre_order_id: this.preOrder.id
      }
      axios.post(this.serverSetting.url + '/orders/unauthorized', JSON.stringify(data), axiosHeader)
        .then(response => {
          this.orderStatus = 'order';
          this.orderSend = response.data;
          localStorage.userOrderId = response.data.id;
        })
        .catch(error => {
          alert(error);
        })
      this.$emit('clearCart');
    },
    sumProductsInOrder() {
      let sum = 0;
      for(let key in this.cart) {
        sum += ( this.cart[key].qty * this.cart[key].price)
      }
      return +sum.toFixed(2) + ' р.'
    },
  },
  watch: {
    address: {
      handler() {
        this.order.delivery_address = this.address.street
          + ' Подъезд: ' + this.address.section
          + ' Этаж: ' + this.address.floor
          + ' Домофон: ' + this.address.intercom
      },
      deep: true
    },
    preOrder: function () {

    }
  }
}
</script>

<style scoped>

</style>
