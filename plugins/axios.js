export default function ({ $axios }) {
  $axios.onRequest( (config) => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    // if (store.state.token) {
      config.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJzdWIiOjEsImlhdCI6MTU3MjU0NzM3MywiZXhwIjoxNTczMTUyMTczfQ.xEuMv3TDSa4E_pt91OOUWh8o7saKVdS0hDp9-zBKT_w`
    // }
  })
}