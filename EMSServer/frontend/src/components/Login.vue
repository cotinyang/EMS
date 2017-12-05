<template>
  <div class="login">
    <div class="login-wrap" v-show="showLogin">
      <div class = "login-title">登录</div>
      <input class = "login-input login-item" type="text" placeholder="请输入账号" v-model="userName">
      <input class = "login-input login-item" type="text" placeholder="请输入密码" v-model="userPwd">
      <p v-show="showErr">{{errorInfo}}</p>
      <input class = "login-button login-item" type="button" value="确认" v-bind:disabled="inputInvalid">
      <span class = "login-tip" v-on:click="changeViewType">没有账号？马上注册</span>
    </div>
    <div class="login-wrap" v-show="!showLogin">
      <div class = "login-title">注册</div>
      <input class = "login-input login-item" type="text" placeholder="请输入账号" v-model="userName">
      <input class = "login-input login-item" type="text" placeholder="请输入密码" v-model="userPwd">
      <input class = "login-input login-item" type="text" placeholder="请重复密码" v-model="userPwdAgain">
      <p v-show="showErr">{{errorInfo}}</p>
      <input class = "login-button login-item" type="button" value="确认" v-bind:disabled="inputInvalid">
      <span class = "login-tip" v-on:click="changeViewType">已有账号？马上登录</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: '注册账号',
      showLogin: true,
      showErr: false,
      userName: '',
      userPwd: '',
      userPwdAgain: '',
      errorInfo: '',
      count: 1
    }
  },
  methods: {
    changeViewType () {
      this.showLogin = !this.showLogin
      this.showErr = false
      this.count++
    }
  },
  computed: {
    inputInvalid () {
      if (this.userName === undefined || this.userPwd === undefined) {
        return true
      }
      if (this.userName.length === 0 || this.userPwd.length === 0) {
        return true
      }
      if (!this.showLogin && this.userPwd !== this.userPwdAgain) {
        return true
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login-title {
  font-size: 150%;
  margin-bottom: 10px;
}

.login-wrap {
  text-align: center;
}

.login-item {
  display: block;
  width: 250px; 
  height: 40px; 
  line-height: 40px; 
  margin: auto;
  font-size: 100%;
}

.login-input {
  margin-bottom: 10px; 
  outline:none; 
  border:1px solid #888; 
  padding:10px; 
  box-sizing:border-box;
}

.login-button {
  border: none; 
  background-color: #41b883; 
  color: #fff; 
  margin-bottom: 5px;
}

.login-button:disabled {
  background-color: lightgray;
}

.login-tip {
  font-size: 100%;
  cursor: pointer;
}
.login-tip:hover {
  color: #41b883;
}

</style>
