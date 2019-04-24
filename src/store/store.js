import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/module/user.js'
import event from '@/store/module/event.js'
import notification from '@/store/module/notification.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
  }
})
