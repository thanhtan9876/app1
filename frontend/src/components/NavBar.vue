<template>
  <b-navbar toggleable="md" type="light" variant="light">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#" center>Request Receiver</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="!isShowUserOnNav()">

        <b-nav-item href="#">{{username}}</b-nav-item>
        <b-nav-item href="#" @click="logout()">Đăng xuất</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import utils from '../utils'
import axios from 'axios'

export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.username = ''
      this.$router.push('/login')
    },
    isShowUserOnNav() {
      return this.username === ''
    },
    getUserInfo() {
      var currentUser = JSON.parse(localStorage.getItem('user'))
      if (currentUser == null) return
      var payload = { ID: currentUser.user.id }
      var headers = utils.getHeaderRequest()
      axios.get(`http://127.0.0.1:5000/users/${payload.ID}`, { headers })
      .then(result => {
        var value = result.data
        this.username = value.Username
      }).catch(err => {
        this.$message({ type: 'error', message: `Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại` });
        this.$router.push('/login')
      })
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.getUserInfo()
  },
  watch: {
    $route(to, from) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="css">
  .navbar-nav {
    text-align: center;
  }
</style>
