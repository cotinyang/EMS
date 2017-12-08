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
    this.http.post('/login', {
      userName: userName,
      password: password
    }).then(res => {
      console.log(res)
    }).catch(error => {

    })
  }

  register (userName, password) {

  }

  logout (userName) {

  }
}

export default UserManager
