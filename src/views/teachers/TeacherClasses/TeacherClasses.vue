<template>
  <div class="pt-5">
    <div class="px-5">
      <page-title class="w-3/4 pt-5">Class</page-title>

      <!-- SECTION : CLASS Overview -->
      <div class="mt-8">
        <section-title class="text-left mb-3 mb-5">Your Classes</section-title>
        <div class="max-w-sm h-28 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-6 py-3">
          <div class="flex flex-row items-center h-full justify-between">
            <div class="flex-col text-left text-purple-primary">
              <div class="font-bold text-3xl" >{{this.numOfClasses}}</div>
              <div class="text-sm">Current teaching class</div>
            </div>
            <div class="rounded-full flex items-center justify-center h-12 w-12 bg-yellow-primary">
              <icon-base width="50" height="50" icon-name="app-logo" view-box="-18 -18 50 50">
                <PlusIcon/>
              </icon-base>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION : CLASS Overview -->
      <div class="mt-8" >
        <section-title class="text-left mb-3 mb-5">Class List</section-title>
        <classes-swiper class="w-full" @numOfClasses="getNumOfClasses"/>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardLayout from "@/views/layout/DashboardLayout";
import PageTitle from "@/components/PageTitle";
import SectionTitle from "@/components/SectionTitle";
import IconBase from "@/components/IconBase";
import PlusIcon from "@/components/icons/PlusIcon";
import ClassesSwiper from "@/views/teachers/TeacherClasses/ClassesSwiper";

export default {
  name: "TeacherClasses",
  data() {
    return {
      numOfClasses: 0
    }
  },
  components: {
    ClassesSwiper,
    PlusIcon,
    IconBase,
    SectionTitle,
    PageTitle,
    DashboardLayout
  },
  methods: {
    getNumOfClasses(value){
      this.numOfClasses = value;
    }
  }
}
</script>

<style scoped>

</style>
