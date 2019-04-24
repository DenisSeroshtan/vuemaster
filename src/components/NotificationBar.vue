<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <div class="notification-close" @click="remove(notification)">X</div>
    <div>{{notification.message}}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timer: null
    }
  },
  mounted() {
    this.timer = setTimeout(() => this.remove(this.notification), 4000)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.notification-bar {
  display: flex;
  margin: 1em 0 1em;
}
.notification-close {
  margin-right: 8px;
  cursor: pointer;
}
.-text-success {
  color: green;
}
.-text-error {
  color: red;
}
</style>
