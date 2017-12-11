import axios from 'axios'
import { error } from 'util';
import { read } from 'fs';

class UserManager {
  constructor () {
    this.http = axios.create({
      baseURL: 'http://localhost:3000/api/user',
      timeout: 2000
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
}

export default UserManager
