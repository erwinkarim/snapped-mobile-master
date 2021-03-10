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
import GoogleClassroomRepository from "@/repositories/GoogleClassroomRepository";

export default {
  name: "googleAuthCallback",
  data() {
    return {

      // State
      isAuthenticating: true,
      isAuthenticated: false,

      title: 'Authenticating...',
      message: "Please wait. Thank you.",
    }
  },
  methods: {
    googleClassroomCallback() {

      let payload = {
        code: this.$route.query.code,
        // token: this.$store.getters.getToken
      }

      GoogleClassroomRepository.integrationCallback(payload)
          .then(response => {

            if (response.data.success) {

              // Give time to update user details at backend
              setTimeout(() => {
                this.isAuthenticating = false;

                this.title = 'Success!'
                this.message = response.data.message

                // Send post message to parent. To get updated user details
                window.opener.postMessage({success: true})

                // Close the window
                setTimeout(() => {
                  window.close();
                }, 1500)
              }, 1500)


            } else {

              this.title = 'Oops!'
              this.message = response.data.message

              setTimeout(() => {
                window.close();
              }, 1500)
            }
          })
          .catch((error) => {

            console.log('Oops! It seems that there is an error with the Google Callback function')

            this.isAuthenticating = false;

            this.title = 'Oops!'
            this.message = error;
          });
    },
  },
  mounted() {
    window.addEventListener('message', this.handleMessage)
  },
  created() {
    this.googleClassroomCallback();
  }
}
</script>

<style scoped>

</style>
