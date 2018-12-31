import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(ElementUI);
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
