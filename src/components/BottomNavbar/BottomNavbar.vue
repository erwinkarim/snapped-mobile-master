<template>
  <section id="bottom-navigation"
           class="md:hidden block fixed inset-x-0 border-t-1/4 bottom-0 z-10 shadow bg-white h-20">

    <div id="tabs" class="flex h-full">

      <router-link :to="{name: 'teacher.home'}" class="w-1/5 pt-1 relative pl-8" exact>
        <bottom-navbar-icon-base tab-name="home" class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
          <HomeIcon/>
        </bottom-navbar-icon-base>
      </router-link>
      <router-link :to="{name: 'teacher.classes'}" class="w-1/5 pt-1 relative pl-5" exact>
        <bottom-navbar-icon-base tab-name="classes" class="absolute h-full w-3/4" icon-name="app-logo" view-box="-5 5 60 55"
                                 stroke-color="#2DEDEA">
          <ClassIcon/>
        </bottom-navbar-icon-base>
      </router-link>
      <router-link :to="{name: 'teacher.students'}" class="w-1/5 pt-1 relative pl-3" exact>
        <bottom-navbar-icon-base tab-name="students" class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
          <StudentIcon/>
        </bottom-navbar-icon-base>
      </router-link>
      <router-link :to="{name: 'teacher.assignments'}" class="w-1/5 pt-1 relative pl-3" exact>
        <bottom-navbar-icon-base tab-name="assignments" class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
          <AssignmentIcon/>
        </bottom-navbar-icon-base>
      </router-link>
      <router-link :to="{name: 'teacher.settings'}" class="w-1/5 pt-1 relative pl-5" exact>
        <bottom-navbar-icon-base tab-name="settings" class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
          <SettingIcon/>
        </bottom-navbar-icon-base>
      </router-link>
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
import BottomNavbarIconBase from "@/components/BottomNavbar/BottomNavbarIconBase";

export default {
  name: "BottomNavbar",

  components: {
    BottomNavbarIconBase,
    SettingIcon,
    AssignmentIcon,
    StudentIcon,
    ClassIcon,
    HomeIcon,
    PlusIcon,
    IconBase
  },

  methods: {
    pushTo(routeName) {
      this.$router.push({name: routeName});
    },
  }
}
</script>

<style scoped>
</style>
