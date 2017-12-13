<template>
  <div>
    Home
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      user:{
        name: ''
      }
    }
  },

  beforeCreate () {
    this.$userManager.checkLogin().then(login => {
      if (login) {
        return
      }
      // this.$router.push('/login')
    })
  }
  
}
</script>

<style scoped>

</style>

