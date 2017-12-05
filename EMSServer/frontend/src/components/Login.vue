<template>
  <div class="login">
    <div class="login-wrap" v-show="showLogin">
      <div class = "login-title">登录</div>
      <input class = "login-input login-item" type="text" placeholder="请输入账号">
      <input class = "login-input login-item" type="text" placeholder="请输入密码">
      <input class = "login-button login-item"type="button" value="确认">
    </div>
    <div class="login-wrap" v-show="!showLogin">
      <div class = "login-title">注册</div>
      <input class = "login-input login-item" type="text" placeholder="请输入账号">
      <input class = "login-input login-item" type="text" placeholder="请输入密码">
      <input class = "login-input login-item" type="text" placeholder="请重复密码">
      <input class = "login-button login-item"type="button" value="确认">
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login-wrap {
  text-align: center;
}

.login-item {
  display: block;
  width: 250px; 
  height: 40px; 
  line-height: 40px; 
  margin: auto;
}

.login-input {
  margin-bottom: 10px; 
  outline:none; 
  border:1px solid #888; 
  padding:10px; 
  box-sizing:border-box;
}

.login-button {
  border:none; 
  background-color:#41b883; 
  color:#fff; 
  font-size:16px; 
  margin-bottom:5px;
}

</style>
