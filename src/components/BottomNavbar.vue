<template>
  <section id="bottom-navigation" class="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
    <!--    <section id="bottom-navigation" class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">-->
    <div id="tabs" class="flex justify-between">
      <div class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <router-link to="/home">
          <icon-base width="190" height="100" icon-name="app-logo" view-box="0 0 249 18">
            <HomeIcon/>
          </icon-base>
        </router-link>
      </div>
      <div class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <router-link to="/classes">
          <icon-base width="190" height="100" icon-name="app-logo" view-box="0 0 249 18">
            <ClassIcon/>
          </icon-base>
        </router-link>
      </div>
      <div class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <router-link to="/students">
          <icon-base width="190" height="100" icon-name="app-logo" view-box="0 0 249 18">
            <StudentIcon/>
          </icon-base>
        </router-link>
      </div>
      <div class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <router-link to="/assignments">
          <AssignmentIcon/>
        </router-link>
      </div>
      <div class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
        <router-link to="/settings">
          <icon-base width="190" height="100" icon-name="app-logo" view-box="0 0 249 18">
            <SettingIcon/>
          </icon-base>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import SettingIcon from "@/components/icons/SettingIcon";
import AssignmentIcon from "@/components/icons/AssignmentIcon";
import StudentIcon from "@/components/icons/StudentIcon";
import ClassIcon from "@/components/icons/ClassIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import IconBase from "@/components/IconBase";

export default {
  name: "BottomNavbar",
  components: {
    SettingIcon,
    AssignmentIcon,
    StudentIcon,
    ClassIcon,
    HomeIcon,
    PlusIcon,
    IconBase
  }
}
</script>

<style scoped>

</style>
