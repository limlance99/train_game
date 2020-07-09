import Vue from 'vue'
Vue.config.devtools = true
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"


Vue.config.productionTip = false


Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:3000'),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
  },//Optional options
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
