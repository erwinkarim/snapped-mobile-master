<template>
  <section id="bottom-navigation" class="md:hidden block fixed inset-x-0 border-t-1/4 bottom-0 z-10 shadow bg-white h-20">

    <div id="tabs" class="flex h-full">

      <div class="w-1/5 pt-1 relative pl-8">
        <router-link to="/home">
            <icon-base class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
              <HomeIcon/>
            </icon-base>
        </router-link>
      </div>
      <div class="w-1/5 pt-1 relative pl-5">
        <router-link to="/classes">
          <icon-base class="absolute h-full w-3/4" icon-name="app-logo" view-box="-5 5 60 55">
            <ClassIcon/>
          </icon-base>
        </router-link>
      </div>
      <div class="w-1/5 pt-1 relative pl-3">
        <router-link to="/students">
          <icon-base class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
            <StudentIcon/>
          </icon-base>
        </router-link>
      </div>
      <div class="w-1/5 pt-1 relative pl-3">
        <router-link to="/assignments">
          <icon-base class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
          <AssignmentIcon/>
          </icon-base>
        </router-link>
      </div>
      <div class="w-1/5 pt-1 relative pl-5">
        <router-link to="/settings">
          <icon-base class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
            <SettingIcon/>
          </icon-base>
        </router-link>
      </div>


      <!--      <div class="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">-->
      <!--      -->
      <!--      </div>-->

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
