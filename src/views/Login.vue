<template>
  <div class="flex justify-center w-screen h-screen px-5">

    <div class="w-3/4 mt-16">
      <icon-base width="270" height="130" icon-name="app-logo" view-box="0 0 249 18">
        <AppLogo/>
      </icon-base>

      <div class="text-purple-secondary mb-16 mt-3">
        School Task Made Easy
      </div>

      <div class="mb-4">
        <input v-model="email"
               class="appearance-none border rounded border-none w-full py-2 pl-5 pr-2 bg-gray-secondary text-gray-700  font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary h-14"
               id="username" type="text" placeholder="Email">
      </div>

      <div class="mb-8">
        <input v-model="password"
               class="appearance-none border rounded border-none w-full py-2 pl-5 pr-2 bg-gray-secondary text-gray-700 font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary h-14"
               id="password" type="text" placeholder="Password">
      </div>

      <button :disabled="!validateForm" @click="login" class="w-full mt-3  font-display text-purple-primary font-bold py-2 px-4 rounded-full h-14 text-lg inline-flex justify-center items-center">
        <span class="mr-3">Sign in</span>
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 4H14M14 4L11.5 1M14 4L11.5 7" stroke="#3A4276" stroke-width="2"/>
        </svg>
      </button>

      <div class="font-display text-purple-primary font-bold mt-24 text-lg">
        Forgot Password?
      </div>
    </div>

  </div>
</template>

<script>
import AppLogo from "@/components/icons/AppLogo";
import IconBase from "@/components/IconBase";
import axios from "axios";
import Repository from "@/repositories/Repository";

export default {
  name: "Login",
  components: {IconBase, AppLogo},
  data() {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
    validateForm() {
      return this.email !== '' && this.password !== '';
    },
  },

  methods: {

    login() {
      const userCredentials = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('login', userCredentials)
          .then((response) => {

            // Make request to get user details
            this.$store.dispatch('setAuthUser')
              .then(role => {

                // Redirect to pages according to roles
                if (role === 'Teacher') this.$router.push({name: 'teacher.home'})
                if (role === 'Student') this.$router.push('/students')
              })
                .catch(err => console.log('masalah'))
          })
    }
  }
}
</script>

<style scoped>
  button {
    background-color: #FDB400;
  }


</style>
