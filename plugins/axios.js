export default function ({ $axios }) {
  $axios.onRequest( (config) => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    // if (store.state.token) {
      config.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOjEsImlhdCI6MTU3MTkwNjgyNCwiZXhwIjoxNTcyNTExNjI0fQ.UxZi3jLqo3ORhrox7aPC3D8oomXFWKojjKteClxQmdw`
    // }
  })
}