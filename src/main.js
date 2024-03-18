import Vue, { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/tailwind.css'

Vue.config.productionTip = false

//new Vue({
const app = createApp({
  router,
  store,
  render: () => h(App)
}).mount('#app')
