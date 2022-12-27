<template>
  <div id="alertPlaceholder" class="container sticky-top">
    <transition-group name="alert" tag="div" class="notifications-box">
      <div v-for="not in notifications" :key="not.message"
           class="alert alert-success py-2 px-3" role="alert">
        {{ not.message }} <br>
        добавлен в корзину
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "my-notifications",
  data() {
    return {
      notifications: []
    }
  },
  created() {

  },
  methods: {
    sendNotification(message, type = 'alert-success') {
      this.notifications.push( {message: message, type: type} )
      this.clearNotification()
    },
    clearNotification() {
      setTimeout(() => {
        this.notifications.shift()
      }, 1500)
    },
    notificationId(message) {
      console.log(message.length * (Math.floor(Math.random() * 1000 )) )
      return message.length * (Math.floor(Math.random() * 1000 ))
    }
  }
}
</script>

<style scoped>

  .alert-enter {
    top: -50px;
    opacity: 0;
  }
  .alert-leave-to {
    top: -50px;
    opacity: 0;
  }
  .alert-enter-to {
    opacity: 1;
    top: 0px
  }
  .alert-leave {
    opacity: 1;
    top: 0px
  }
  .alert-enter-active,
  .alert-leave-to{
    transition: all .3s ease;
  }
</style>
