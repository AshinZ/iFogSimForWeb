// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue';
import Button from 'ant-design-vue/lib/button';
import 'ant-design-vue/dist/antd.css';
import VueResource from 'vue-resource';
Vue.config.productionTip = false
Vue.use(Antd);
Vue.component(Button.name, Button);
Vue.component(Button.Group.name, Button.Group);
Vue.use(VueResource);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})


