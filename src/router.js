import Vue from 'vue'
import VueRouter from 'vue-router'

import WelcomePage from './components/welcome/welcome.vue'
import DashboardPage from './components/dashboard/dashboard.vue'
import SignupPage from './components/auth/signup.vue'
import SigninPage from './components/auth/signin.vue'
import Logout from './components/auth/logout.vue'
import store from './store'

Vue.use(VueRouter)

function guardMyroute(to, from , next){
  if(store.getters.loggedIn !=null){
    next()
  }
  else{
    next({
      path:'/signin',
      query:{
        redirectFrom: to.fullPath
      }
    })
  }

}

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/signup', component: SignupPage },
  { path: '/logout', component: Logout, props:true},
  { path: '/signin', name: 'signin', component: SigninPage, props: true },
  { path: '/dashboard', beforeEnter : guardMyroute, name:'dashboard', component: DashboardPage }
]

export default new VueRouter({mode: 'history', routes})