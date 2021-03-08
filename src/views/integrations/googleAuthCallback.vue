<template>
  <div class="mx-auto h-screen flex flex-col justify-center items-center">
    <div class="font-bold my-3 text-xl">
      {{ title }}
    </div>
    <div class="text-sm">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "googleAuthCallback",
  data() {
    return {

      // State
      isAuthenticating: true,
      isAuthenticated: false,

      title: 'Authenticating...',
      message: "Please wait. Thank you."
    }
  },
  methods: {
    googleClassroomCallback() {
      let code = this.$route.query.code;

      this.$store.dispatch('googleClassroom/integrationCallback', code)
          .then(response => {

            this.isAuthenticating = false;

            console.log('received from backend callback')
            console.log(response.data)
            if (response.data.success) {

              this.title = 'Success!'
              this.message = response.data.message

              console.log(`Callback page:${localStorage.getItem('token')}`)

              setTimeout(() => {
                this.$store.dispatch('googleClassroom/handleIntegrationSuccess')
                // window.close();
              }, 1500)

            } else {

              this.title = 'Oops!'
              this.message = response.data.message

              setTimeout(() => {
                window.close();
              }, 1500)
            }
          })
          .catch( (error) => {

            this.isAuthenticating = false;

            this.title = 'Oops!'
            this.message = error;
          });


    }
  },
  created() {
    console.log('created callback page')
    console.log(this.$store.getters.getAuthUser)
    this.googleClassroomCallback();
  }
}
</script>

<style scoped>

</style>
