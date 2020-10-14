<template>

  <div class="flex flex-col w-screen h-screen px-5">
    <div class="w-3/4 mt-4">
      <icon-base width="190" height="100" icon-name="app-logo" view-box="0 0 249 18">
        <AppLogo/>
      </icon-base>
    </div>

    <div class="flex mb-4 items-center mt-6">
      <div class="flex flex-row w-3/12 sm:w-3/12 px-4 ">
        <img
            src="https://demos.creative-tim.com/tailwindcss-starter-project/_next/static/images/team-2-800x800-3e08ef145920c93bbe320add0d2ef58d.jpg"
            alt="..." class="shadow rounded-full max-w-full h-auto align-middle border-none"/>
      </div>
      <div class="flex flex-col w-full bg-yellow-500 text-left">
        <h1 class="">Welcome, {{ username }}</h1>

        <div class="flex flex-row">
          <span class="pr-2">15 Jun 2020</span>
          <span>08:00AM</span>
        </div>
      </div>

      <div class="rounded-full flex items-center justify-center h-12 w-12 bg-yellow-500">
        <icon-base width="50" height="50" icon-name="app-logo" view-box="-3 0 18 14">
          <PlusIcon/>
        </icon-base>
      </div>
    </div>

    <div>
      Role: {{userRole}}
    </div>

    <div class="flex flex-col text-left">
      <section-title>Your Classes</section-title>
    </div>

  </div>
</template>

<script>
import IconBase from "@/components/IconBase";
import AppLogo from "@/components/icons/AppLogo";
import PlusIcon from "@/components/icons/PlusIcon";
import SectionTitle from "@/components/SectionTitle";

export default {
  name: "Home",
  components: {
    SectionTitle,
    AppLogo,
    IconBase,
    PlusIcon
  },
  computed: {
    username() {
      return this.$store.getters.getAuthUsername
    },
    userRole () {
      return this.$store.getters.getAuthUserRole
    },
  },
}
</script>

<style scoped>

</style>
