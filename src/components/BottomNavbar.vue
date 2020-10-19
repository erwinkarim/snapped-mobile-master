<template>
  <section id="bottom-navigation" class="md:hidden block fixed inset-x-0 border-t-1/4 bottom-0 z-10 shadow bg-white h-20">

    <div id="tabs" class="flex h-full">

      <div class="w-1/5 pt-1 relative pl-8"  @click="pushTo('teacher.home')">
            <icon-base class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
              <HomeIcon/>
            </icon-base>
      </div>
      <div class="w-1/5 pt-1 relative pl-5" @click="pushTo('teacher.classes')">
<!--        <router-link to="{name: 'teacher.students'}">-->
          <icon-base class="absolute h-full w-3/4" icon-name="app-logo" view-box="-5 5 60 55">
            <ClassIcon/>
          </icon-base>
<!--        </router-link>-->
      </div>
      <div class="w-1/5 pt-1 relative pl-3">
          <icon-base class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
            <StudentIcon/>
          </icon-base>
      </div>
      <div class="w-1/5 pt-1 relative pl-3">
          <icon-base class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
          <AssignmentIcon/>
          </icon-base>
      </div>
      <div class="w-1/5 pt-1 relative pl-5">
          <icon-base class="absolute h-full w-3/4" icon-name="app-logo" view-box="0 5 60 55">
            <SettingIcon/>
          </icon-base>
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
import Router from "@/router";

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
  },
  methods: {
    pushTo (routeName) {
      this.$router.push({name: routeName});
    }
  }
}
</script>

<style scoped>

</style>
