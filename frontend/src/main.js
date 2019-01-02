import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate'
import id from './locale-id'

Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.use(VeeValidate);
const rulesPlugin = ({ Validator }) => {
  Validator.localize('id', id);
};
VeeValidate.use(rulesPlugin);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
