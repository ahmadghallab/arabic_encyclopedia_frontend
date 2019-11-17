export const state = () => ({
  isAuthenticated: false,
  userId: null
})
export const getters =  {
  isAuthenticated: (state) => {
    return state.isAuthenticated
  },
  userId: (state) => {
    return state.userId
  }
}
export const mutations = {
  setAuth (state, result) {
    state.isAuthenticated = result.isAuthenticated
    state.userId = result.userId
  },
  logout (state) {
    this.$cookies.remove('token')
    state.isAuthenticated = false
    state.userId = null
  },
  signin (state, data) {
    this.$cookies.set('token',  data.token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    this.$cookies.set('userId',  data.user_id, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    state.isAuthenticated = true
    state.userId = data.user_id
  }
}
export const actions = {
  nuxtServerInit (context) {
    const token = this.$cookies.get('token')    
    const userId = this.$cookies.get('userId')    
    if (token && userId) {
      context.commit('setAuth', {
        'isAuthenticated': true,
        'userId': userId
      })
    }
  },
  logout (context) {
    return new Promise((resolve) => {
      context.commit('logout')
      resolve()
    })
  },
  signin (context, credentials) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/user/signin', credentials)
        .then(data => {
          context.commit('signin', data.data)
          resolve()
        })
        .catch(error => {
        reject(error.data)
      })
    })
  }
}