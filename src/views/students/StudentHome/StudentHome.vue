<template>
  <div class=" pt-5">
    <div class="px-5">
      <div class="w-3/4">
        <icon-base width="190" height="70" icon-name="app-logo" view-box="0 0 320 18">
          <app-logo/>
        </icon-base>
      </div>
      <user-profile/>
    </div>

    <div class="px-5">

      <!-- SECTION: CLASSES -->
      <div class="mt-5">
        <div class="text-left mb-3">
          <section-title class="mb-5" title="Active Assignments"/>
        </div>
        <active-assignment/>
      </div>
    </div>
  </div>
</template>

<script>
import IconBase from "@/components/IconBase";
import AppLogo from "@/components/icons/AppLogo";
import UserProfile from "@/components/UserProfile";
import SectionTitle from "@/components/SectionTitle";
import ActiveAssignment from "@/views/students/StudentHome/Components/ActiveAssignment";

export default {
  name: "StudentHome",
  components: {ActiveAssignment, SectionTitle, UserProfile, AppLogo, IconBase},
}
</script>

<style scoped>

</style>
