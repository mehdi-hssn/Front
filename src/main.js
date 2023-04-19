import Vue from 'vue';
import VueRouter from 'vue-router';

import { routes } from './routes';
import store from './stores/store';
import './assets/styles/app.scss'

import './axios'

import App from './App.vue';

Vue.use(VueRouter);




const router = new VueRouter({
	mode: 'history',
	routes
});

// router.beforeEach((to, from, next) => {
//     if (to.onlyGuest && store.getters.isLoggedIn) {
//         next('/');
//     } else {
//         next();
//     }
// });


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


