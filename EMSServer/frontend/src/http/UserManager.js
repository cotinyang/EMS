import axios from 'axios'
import router from '@/router'
import { request } from 'http';

class UserManager {
  constructor () {
    this.http = axios.create({
      baseURL: 'http://localhost:3000/api/user',
      timeout: 2000
    })
    this.http.defaults.withCredentials = true
    this.http.interceptors.request.use(config => {
      console.log('request.........')
      return config
    }, err => {
      console.log('request failed.........')      
      return Promise.reject(err)      
    })
    this.http.interceptors.response.use(response => {
      console.log('response.........')      
      if (response.data.errNo === 103) {
        router.replace({
          path: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
      return response  
    }, err => {
      console.log('response failed.........')            
      return Promise.reject(err)
    })
  }
  login (userName, password) {
    return this.http.post('/login', {
      userName: userName,
      password: password
    }).then(res => {
      console.log(res)
      var errNo = res.data.errNo
      return {success:errNo === 0}
    }).catch(error => {

    })
  }

  register (userName, password) {
    return this.http.post('/register', {
      userName: userName,
      password: password
    }).then(res => {
      console.log(res)
      var errNo = res.data.errNo
      return {success:errNo === 0}
    }).catch(error => {

    })
  }

  logout (userName) {

  }

  checkLogin() {
    return this.http.get('/').then(res => {
      var errNo = res.data.errNo
      return {success:errNo === 0}
    })
  }
}

export default UserManager
