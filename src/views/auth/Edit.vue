<template>
  <dashboard-layout
      :has-custom-bottom-bar="true"
  >

    <template v-slot:pageHeader>

      <page-header-three>
        <template v-slot:leftAction>
          <nav-back :to="navBackRoute"
                    stroke-color="bg-purple-primary"
                    class="w-2/7"
          />
        </template>
        <template v-slot:mini-title>
          <div class="truncate">
            Edit Profile
          </div>
        </template>
      </page-header-three>
    </template>

    <template v-slot:content>
      <div class="absolute h-full w-full my-auto flex flex-col px-4 mt-20">

        <!-- FORM INPUTS -->
        <div class="px-3 w-full md:max-w-xl lg:max-w-2xl mx-auto mt-5">

          <div v-if="success"
              class="bg-green-300 mb-4 py-3 mb-2 px-4 text-left text-purple-primary text-xs rounded-lg"
          >
             {{success}}
          </div>
          <!-- ERROR BAR -->
          <div v-if="errors.length"
               class="bg-red-500 mb-4 py-3 mb-2 px-4 text-left text-white text-xs rounded-lg"
          >
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </div>

          <div class="w-full mt-5">
            <section-title class="text-left my-4" title="Change Password"/>
            <div class="mb-8">
              <input v-model="changePassword.old"
                     type="password"
                     @click="resetSuccessErrorBar"
                     placeholder="Current Password"
                     class="appearance-none border rounded border-none w-full py-2 pl-5 pr-2 md:h-20 md:text-xl mt-3 bg-gray-secondary text-gray-700 font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary h-14"
              >
              <input v-model="changePassword.new"
                     type="password"
                     @click="resetSuccessErrorBar"
                     placeholder="New Password"
                     class="appearance-none border rounded border-none w-full py-2 pl-5 pr-2 md:h-20 md:text-xl mt-3 bg-gray-secondary text-gray-700 font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary h-14"
              >
              <input v-model="changePassword.new_confirmation"
                     type="password"
                     @click="resetSuccessErrorBar"
                     placeholder="Confirm New Password"
                     class="appearance-none border rounded border-none w-full py-2 pl-5 pr-2 md:h-20 md:text-xl mt-3 bg-gray-secondary text-gray-700 font-normal leading-tight focus:outline-none focus:shadow-outline placeholder-purple-secondary h-14"
              >
            </div>
          </div>

        </div>

      </div>
    </template>

    <template v-slot:bottomBar>
      <button @click="submit"
              class="w-full font-bold focus:outline-none rounded-full text-purple-primary text-sm bg-white border-2 border-purple-primary py-3 px-1 flex flex-row justify-center">
        Submit
      </button>
    </template>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageTitle from "@/components/PageTitle";
import SectionTitle from "@/components/SectionTitle";
import AuthenticationRepository from "@/repositories/AuthenticationRepository";
import PageHeaderThree from "@/components/PageHeaderThree";
import NavBack from "@/components/NavBack";

export default {
  name: "Edit",
  data() {
    return {
      form: {},

      states: {
        isSubmitting: false,
      },

      changePassword: {
        old: null,
        new: null,
        new_confirmation: null
      },
      success: null,
      errors: []
    }
  },

  computed: {
    validForm() {
      return this.errors.length === 0;
    },
    navBackRoute() {
      let routeName = '';

      if(this.$store.getters.getAuthUserRole === 'Teacher'){
        routeName = 'teacher.settings'
      }

      if(this.$store.getters.getAuthUserRole === 'Student'){
        routeName = 'student.settings'
      }
    }
  },

  methods: {

    validateForm() {

      // determine if user is updating password
      let isUpdatingPassword = (
          this.changePassword.old !== null
          || this.changePassword.new !== ''
          || this.changePassword.new !== null
          || this.changePassword.new !== ''
          || this.changePassword.new_confirmation !== null
          || this.changePassword.new_confirmation !== ''
      );

      // If user is updating password, check if user left any password inputs null or empty string
      if (isUpdatingPassword) {
        if (!this.changePassword.old) this.errors.push('Please enter current password.')
        if (!this.changePassword.new) this.errors.push('Please enter new password.')
        if (!this.changePassword.new_confirmation) this.errors.push('Please confirm new password.')
      }
    },

    submit() {

      this.resetSuccessErrorBar();
      this.validateForm();

      let payload = {
        old_password: this.changePassword.old,
        password: this.changePassword.new,
        password_confirmation: this.changePassword.new_confirmation,
      }

      if (this.validForm && !this.isSubmitting) {

        this.states.isSubmitting = true;

        AuthenticationRepository.updateUserDetails(payload)
            .then(response => {

              this.states.isSubmitting = false;

              if (response.data.success) {
                this.success = response.data.message;
              } else {
                this.errors.push(response.data.data.error)
              }
            })
            .catch(error => {
              this.states.isSubmitting = false;
            })
      }

    },
    resetSuccessErrorBar() {
      this.success = null;
      this.errors = [];
    },

    resetInputs() {
      this.changePassword.old = null;
      this.changePassword.new = null;
      this.changePassword.new_confirmation = null;
    }

  },
  components: {NavBack, PageHeaderThree, SectionTitle, PageTitle, DashboardLayout}
}
</script>

<style scoped>

</style>
