import axios from 'axios'
import router from '@/router'
import { request } from 'http';

class UserManager {
  constructor () {
    this.http = axios.create({
      baseURL: 'http://localhost:3000/api/user',
      timeout: 2000
    })
    this.refreshHttp = axios.create({
      baseURL: 'http://localhost:3000/api/user/refreshToken',
      timeout: 2000
    })
    this.http.defaults.withCredentials = true
    this.http.interceptors.request.use(this.customHeader)
    this.refreshHttp.interceptors.request.use(this.customHeader)
    this.http.interceptors.request.use( config => {
      return this.refreshToken().then(res => {
        if (!localStorage.getItem('accessToken')){
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        }
        return config
      })
    }, err => {
      return Promise.reject(err)      
    })
    this.http.interceptors.response.use(response => {
      if (response.data.errNo === 103 || 
        response.data.errNo === 105) {
        this.updateLocalToken(null)
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

  customHeader (config) {
    if (localStorage.getItem('accessToken')) {
      config.headers.Authorization = `token ${localStorage.getItem('accessToken')}`
        .replace(/(^\")|(\"$)/g, '')
    } 
    return config
  }

  login (userName, password) {
    return this.http.post('/login', {
      userName: userName,
      password: password
    }).then(res => {
      console.log(res)
      var errNo = res.data.errNo
      var success = errNo === 0
      if (success) {
        this.updateLocalToken(res.data)       
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
    this.updateLocalToken(null)
  }

  updateLocalToken (data) {
    if(data) {
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      var expTime = Date.now()/1000 + data.exp
      localStorage.setItem('tokenExp', expTime)         
      return
    }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('tokenExp')    
  }

  checkLogin() {
    return this.http.get('/').then(res => {
      var errNo = res.data.errNo
      return {success:errNo === 0}
    })
  }

  refreshToken() {
    var expTime = localStorage.getItem('tokenExp')
    var deltaTime = 60 * 0.4;
    if (expTime == undefined || expTime - Date.now() / 1000 > deltaTime) {
      return Promise.resolve()
    }
    return this.refreshHttp.post('/', {
      token: localStorage.getItem('refreshToken'),
    }).then(res => {
      var errNo = res.data.errNo
      var success = errNo === 0
      if (success) {
        this.updateLocalToken(res.data)
      }
      return Promise.resolve({ success: success })
    })
  }

}

export default UserManager
