<template>
  <div class="h-full w-full">

    <div class="absolute h-full w-full my-auto flex flex-col justify-center px-7">

      <!-- LOGO -->
      <div>
        <div class="relative w-full max-w-xl mx-auto flex flex-col items-center">
          <div class="w-5/7 bg-white h-18 md:h-30 min-h-1/4">
            <app-logo/>
          </div>
        </div>
        <div class="z-40 text-purple-secondary mb-16 bg-white">
          Bring Your A Game
        </div>
      </div>

      <!-- INPUTS -->
      <div class="px-3 w-full md:max-w-xl lg:max-w-2xl mx-auto">
        <div class="bg-red-500 mb-4 py-3 px-4 text-left text-white text-xs rounded-lg" v-if="errors.length">
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </div>
        <div class="mb-4">
          <input v-model="email" @click="resetError"
                 class="appearance-none border rounded border-none w-full py-2 pl-5  md:h-20 pr-2  md:text-xl bg-gray-secondary text-gray-700  font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary h-14"
                 id="username" type="text" placeholder="Email">
        </div>
        <div class="mb-8">
          <input v-model="password" type="password" @click="resetError"
                 class="appearance-none border rounded border-none w-full py-2 pl-5 pr-2 md:h-20 md:text-xl bg-gray-secondary text-gray-700 font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary h-14"
                 id="password" placeholder="Password">
        </div>
      </div>

      <!-- BUTTON -->
      <button :disabled="!validateForm"
              @click="login"
              class="w-full mt-3  md:max-w-xl lg:max-w-2xl mx-auto font-display text-purple-primary font-bold py-2  md:text-2xl px-4 rounded-full h-14 md:h-20 text-lg focus:outline-none inline-flex justify-center items-center">
        <span class="mr-3">Sign in</span>
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 4H14M14 4L11.5 1M14 4L11.5 7" stroke="#3A4276" stroke-width="2"/>
        </svg>
      </button>

      <!-- FORGOT PASSWORD -->
<!--      <div class="font-display text-purple-primary font-bold mt-12 text-lg">-->
<!--        Forgot Password?-->
<!--      </div>-->

    </div>

  </div>
</template>

<script>
import AppLogo from "@/components/icons/AppLogo";
import IconBase from "@/components/IconBase";
import axios from "axios";
import Repository from "@/repositories/Repository";
import IconBaseTwo from "@/components/IconBaseTwo";
import StringIcon from "@/components/icons/StringIcon";

export default {
  name: "Login",
  components: {StringIcon, IconBaseTwo, IconBase, AppLogo},
  data() {
    return {
      email: '',
      password: '',
      errors: []
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
                  if (role === 'Student') this.$router.push({name: 'student.home'})

                })
          })
          .catch(error => {
            this.errors.push("You have entered an invalid username or password.")
          });

    },
    resetError() {
      this.errors = []
    }
  }
}
</script>

<style scoped>
button {
  background-color: #FDB400;
}


</style>
