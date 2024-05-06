// test-vue-app/src/main.js
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import CarList from './components/carList.vue';
import Header from './components/Header.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: CarList },
  { path: '/inventory', component: CarList }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
