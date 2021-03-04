import Vue from 'vue'
import axios from 'axios'
import { BootstrapVue, IconsPlugin, ModalPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from './App.vue'

import router from './router'
import store from './store'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ModalPlugin);

axios.defaults.baseURL = 'http://localhost:8000/'

const access_token = store.getters.loggedIn

if (access_token !== null){
  axios.defaults.headers.common = {'Authorization': `Bearer ${access_token}`}
}
// axios.defaults.headers.common['Authorization'] = 'fasfdsa'
axios.defaults.headers.get['Accepts'] = 'application/json'

// const reqInterceptor = axios.interceptors.request.use(config => {
//   console.log('Request Interceptor', config)
//   return config
// })
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor here i am', res)
  return res
})

// axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
