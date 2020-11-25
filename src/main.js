import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import VeeValidate from 'vee-validate'
import '@/assets/scss/app.scss'

Vue.config.productionTip = false

Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields',
  // This is not required but avoids possible naming conflicts
  errorBagName: 'veeErrors'
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
