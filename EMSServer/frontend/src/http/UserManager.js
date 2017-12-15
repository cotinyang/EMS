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
      if (localStorage.getItem('accessToken')) {
        config.headers.Authorization = `token ${localStorage.getItem('accessToken')}`
          .replace(/(^\")|(\"$)/g, '')
      } else {
        router.replace({
          path: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
      return config
    }, err => {
      return Promise.reject(err)      
    })
    this.http.interceptors.response.use(response => {
      if (response.data.errNo === 103 || 
        response.data.errNo === 105) {
        router.replace({
          path: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
      return response  
    }, err => {
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
      var token = res.data.accessToken
      var success = errNo === 0
      if (success) {
        localStorage.setItem('accessToken', token)        
      }
      return {success:success}
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
    localStorage.removeItem('accessToken')
  }

  checkLogin() {
    return this.http.get('/').then(res => {
      var errNo = res.data.errNo
      return {success:errNo === 0}
    })
  }
}

export default UserManager
