import router from '@/router'
import VueCookies from 'vue-cookies'
import axios from 'axios'

const state = {
  userData: {
    nome: 'Usuário'
  },
  userToken: VueCookies.get('USERTOKEN'),
  apiURL: `https://578299fc.ngrok.io`,
  error: null
}

const mutations = {
  setUserData: (state, payload) => {
    state.userData = payload
  },
  setError (state, payload) {
    state.error = payload
  }
}

const actions = {
  signIn: async (context, user) => {
    await axios.post(`${state.apiURL}/users/authenticate`, {
      email: user.email,
      password: user.password
    }).then(response => {
      console.log(response)
      VueCookies.set('USERTOKEN', response.data.token, '0')
      // router.push('/dashboard')
    }).catch(err => {
      console.log(err)
      context.commit('setError', err)
    })
  },

  signUp: async (context, user) => {
    await axios.post(`${state.apiURL}/users/register`, {
      email: user.email,
      password: user.password,
      name: user.name
    }).then(response => {
      console.log(response)
      VueCookies.set('USERTOKEN', response.data.token, '0')
      // router.push('/dashboard')
    }).catch(err => {
      console.log(err)
      context.commit('setError', err)
    })
  },

  logout: () => {
    VueCookies.remove('USERTOKEN')
    router.push('/')
  }
}

const getters = {
  getUserData: state => state.userData
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
