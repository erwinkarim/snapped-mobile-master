<template>
  <dashboard-layout>

    <template v-slot:pageHeader>
      <page-title title="Class" />
    </template>

    <template v-slot:content>
      <div class="px-5">

        <!-- SECTION : CLASS Overview -->
        <div class="mt-8">
          <section-title class="text-left mb-3 mb-5" title="Your Classes"/>
          <div class="max-w-sm h-28 rounded rounded-xl justify-between overflow-hidden bg-gray-secondary flex flex-col px-6 py-3">
            <div class="flex flex-row items-center h-full justify-between">
              <div class="flex-col text-left text-purple-primary">
                <div class="font-bold text-3xl" >{{numOfClasses}}</div>
                <div class="text-sm">Current teaching class</div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION : CLASS Overview -->
        <div class="mt-8" >
          <section-title class="text-left mb-3 mb-5" title="Class List"/>
          <classes-swiper class="w-full" @numOfClasses="getNumOfClasses"/>
        </div>
      </div>
    </template>

  </dashboard-layout>
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
