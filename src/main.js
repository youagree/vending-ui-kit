import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "@/axios/axios"

import '@/sass/index.sass'

// registration global components
const files = require.context('@/components', true, /\.vue$/i)

files.keys().map(key => {
    Vue.component(files(key).default.name ?? key.split('/').pop().split('.')[0], files(key).default);
})
// registration global components end


Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
