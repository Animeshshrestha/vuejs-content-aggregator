import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_auth:localStorage.getItem('user_auth')|| null
  },
  mutations: {
    authUser (state, userData) {
      localStorage.setItem('user_auth',userData)
      state.user_auth = userData
    },
    destroyToken(state){
      state.user_auth = null
    }

  },
  actions: {
    signup ( {commit}, authData) {
      return new Promise((resolve, reject) =>{
        axios.post('/user-signup/', {
          email: authData.email,
          password: authData.password,
          confirm_password: authData.confirm_password,
          username: authData.username
          })
          .then( (res) => { 
            resolve(res.status)
          })
          .catch( (error) => {
            reject(error)
          })
        })

    },
    login ( {commit, dispatch}, authData) {
      return new Promise((resolve, reject) =>{
        axios.post('/api/token/', {
          username: authData.username,
          password: authData.password
        })
          .then( (res) => {
            commit('authUser',JSON.stringify(res.data))
            resolve(res.data.access)
          })
          .catch( (error)=> {
            reject(error)
          })
        })

    },
    logoutUser(context){
      if(context.getters.loggedIn){
        localStorage.removeItem('user_auth')
        context.commit('destroyToken')

      }
    }


  },
  getters: {
    loggedIn(state){
      if (state.user_auth){
        var user_auth = JSON.parse(state.user_auth)
        return user_auth.access
      }else{
        return null
      }
    },
    userEmail(state){
      var user_auth = JSON.parse(state.user_auth)
      return user_auth.user_email
    },
    userId(state){
      var user_auth = JSON.parse(state.user_auth)
      return user_auth.user_id
    }

  }
})