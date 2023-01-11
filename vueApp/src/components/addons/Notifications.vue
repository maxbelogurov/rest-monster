<template>
  <div id="alertPlaceholder" class="container sticky-top">
    <transition-group name="alert" tag="div" class="notifications-box">
      <div v-for="(item, index) in notifications" :key="item.message + index"
           class="alert alert-success py-2 px-3" role="alert">
        {{ item.message }} <br>
        добавлен в корзину
      </div>
    </transition-group>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "my-notifications",
  data() {
    return {
      notifications: []
    }
  },
  methods: {
    sendNotification(message, type = 'alert-success') {
      let obj = {message: message, type: type}
      this.notifications.splice(0, 0, obj)
      this.clearNotification()
    },
    clearNotification() {
      setTimeout(() => {
        this.notifications.splice(this.notifications.length - 1, 1 )
      }, 700)
    },
  }
}
</script>

<style scoped>

  .alert-enter {
    top: -30px;
    transform: scaleY(0);
    opacity: 0;
  }
  .alert-leave-to {
    top: -30px;
    transform: scaleY(0);
    opacity: 0;
  }
  .alert-enter-to {
    opacity: 1;
    top: 0px
  }
  .alert-leave {
    opacity: 1;
    top: 0px;
  }
  .alert-enter-active,
  .alert-leave-active,
  .alert-leave-to {
    transition: all .2s ease;
  }
</style>
