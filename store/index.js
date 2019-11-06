
export const state = () => ({
  isAuthenticated: false
})
export const getters =  {
  isAuthenticated: (state) => {
    return state.isAuthenticated
  }
}
export const mutations = {
  setAuth (state, result) {
    state.isAuthenticated = result
  },
  logout (state) {
    this.$cookies.remove('token')
    state.isAuthenticated = false
  },
  signin (state, data) {
    this.$cookies.set('token',  data.token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    state.isAuthenticated = true
  }
}
export const actions = {
  nuxtServerInit (context) {
    const token = this.$cookies.get('token')    
    if (token) context.commit('setAuth', true)
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
// if (typeof window !== 'undefined') {
//   let token = localStorage.getItem('token')  
//   if (token) {
//     state.isAuthenticated = true
//   }
// }